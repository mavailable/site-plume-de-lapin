interface Env {
  RESEND_API_KEY: string;
  VENDOR_EMAIL: string;
  VENDOR_NAME: string;
}

interface OrderItem {
  nom: string;
  prix: number;
  quantite: number;
}

interface OrderPayload {
  client: {
    nom: string;
    email: string;
    telephone: string;
    message?: string;
  };
  items: OrderItem[];
  total: number;
}

function validatePayload(data: unknown): data is OrderPayload {
  if (!data || typeof data !== 'object') return false;
  const d = data as Record<string, unknown>;
  if (!d.client || typeof d.client !== 'object') return false;
  const c = d.client as Record<string, unknown>;
  if (!c.nom || !c.email || !c.telephone) return false;
  if (typeof c.email !== 'string' || !c.email.includes('@')) return false;
  if (!Array.isArray(d.items) || d.items.length === 0) return false;
  return true;
}

function buildItemsTable(items: OrderItem[]): string {
  const rows = items.map(item => `
    <tr>
      <td style="padding: 8px; border-bottom: 1px solid #e5e5e0;">${item.nom}</td>
      <td style="padding: 8px; border-bottom: 1px solid #e5e5e0; text-align: center;">${item.quantite}</td>
      <td style="padding: 8px; border-bottom: 1px solid #e5e5e0; text-align: right;">${item.prix.toFixed(2)} €</td>
      <td style="padding: 8px; border-bottom: 1px solid #e5e5e0; text-align: right;">${(item.prix * item.quantite).toFixed(2)} €</td>
    </tr>`).join('');

  return `<table style="width: 100%; border-collapse: collapse;">
    <thead><tr style="background: #f0f7f1;">
      <th style="text-align: left; padding: 8px; border-bottom: 2px solid #bcdbbf;">Produit</th>
      <th style="text-align: center; padding: 8px; border-bottom: 2px solid #bcdbbf;">Qté</th>
      <th style="text-align: right; padding: 8px; border-bottom: 2px solid #bcdbbf;">Prix unit.</th>
      <th style="text-align: right; padding: 8px; border-bottom: 2px solid #bcdbbf;">Sous-total</th>
    </tr></thead>
    <tbody>${rows}</tbody>
  </table>`;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { env, request } = context;

  // CORS
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  };

  try {
    const data = await request.json();

    if (!validatePayload(data)) {
      return new Response(JSON.stringify({ error: 'Données invalides' }), { status: 400, headers });
    }

    const { client, items, total } = data;
    const table = buildItemsTable(items);

    // Email vendeur
    const vendorEmail = {
      from: 'Plume de Lapin <onboarding@resend.dev>',
      to: [env.VENDOR_EMAIL],
      reply_to: client.email,
      subject: `Nouvelle réservation de ${client.nom}`,
      html: `
        <div style="font-family: -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #2b2b27;">
          <h1 style="color: #1b3a20; font-size: 24px;">Nouvelle réservation</h1>
          <p><strong>Client :</strong> ${client.nom}</p>
          <p><strong>Email :</strong> ${client.email}</p>
          <p><strong>Téléphone :</strong> ${client.telephone}</p>
          ${client.message ? `<p><strong>Message :</strong> ${client.message}</p>` : ''}
          <h2 style="color: #25582d; font-size: 18px; margin-top: 24px;">Détail</h2>
          ${table}
          <p style="font-size: 18px; font-weight: bold; text-align: right; margin-top: 16px; color: #854d0e;">
            Total indicatif : ${total.toFixed(2)} €
          </p>
        </div>`,
    };

    // Email acheteur
    const customerEmail = {
      from: 'Plume de Lapin <onboarding@resend.dev>',
      to: [client.email],
      reply_to: env.VENDOR_EMAIL,
      subject: `Confirmation de votre réservation — ${env.VENDOR_NAME}`,
      html: `
        <div style="font-family: -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #2b2b27;">
          <h1 style="color: #1b3a20; font-size: 24px;">Merci pour votre réservation !</h1>
          <p>Bonjour ${client.nom},</p>
          <p>Nous avons bien reçu votre demande. Voici le récapitulatif :</p>
          ${table}
          <p style="font-size: 18px; font-weight: bold; text-align: right; margin-top: 16px; color: #854d0e;">
            Total indicatif : ${total.toFixed(2)} €
          </p>
          <p style="font-size: 14px; color: #73736b; text-align: right;">
            Prix indicatifs — ajustés au poids réel lors du retrait.
          </p>
          <hr style="border: none; border-top: 1px solid #e5e5e0; margin: 24px 0;" />
          <p>Nous préparons votre commande et vous recontacterons pour confirmer le retrait :</p>
          <p style="font-weight: bold;">6 rue du château, 54150 Lantefontaine</p>
          <p style="margin-top: 16px;">À très bientôt,<br><strong>Sandra et Gaylord — Plume de Lapin</strong></p>
          <hr style="border: none; border-top: 1px solid #e5e5e0; margin: 24px 0;" />
          <p style="font-size: 12px; color: #a3a39a;">
            Conformément au RGPD, vos données personnelles sont utilisées uniquement pour traiter votre commande.
            Elles ne sont jamais partagées avec des tiers. Pour exercer vos droits : contact@plumedelapin.fr
          </p>
        </div>`,
    };

    // Envoi via Resend
    const resendUrl = 'https://api.resend.com/emails';
    const resendHeaders = {
      'Authorization': `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    };

    // Envoi email vendeur (toujours)
    const vendorRes = await fetch(resendUrl, {
      method: 'POST', headers: resendHeaders, body: JSON.stringify(vendorEmail)
    });

    if (!vendorRes.ok) {
      const errText = await vendorRes.text();
      return new Response(JSON.stringify({ error: 'Erreur email vendeur', detail: errText }), { status: 500, headers });
    }

    // Envoi email acheteur (peut échouer en free tier — non bloquant)
    try {
      const customerRes = await fetch(resendUrl, {
        method: 'POST', headers: resendHeaders, body: JSON.stringify(customerEmail)
      });
      if (!customerRes.ok) {
        console.error('Email client non envoyé (free tier):', await customerRes.text());
      }
    } catch {
      console.error('Email client failed — free tier limitation');
    }

    return new Response(JSON.stringify({ success: true }), { status: 200, headers });

  } catch (err) {
    console.error('Order error:', err);
    return new Response(JSON.stringify({ error: 'Erreur serveur' }), { status: 500, headers });
  }
};
