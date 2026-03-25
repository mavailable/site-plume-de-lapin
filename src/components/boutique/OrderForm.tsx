import { useStore } from '@nanostores/react';
import { $cart, $cartTotal, $cartCount, clearCart } from '@/stores/cart';
import { useState } from 'react';

export default function OrderForm() {
  const cart = useStore($cart);
  const total = useStore($cartTotal);
  const count = useStore($cartCount);
  const [status, setStatus] = useState<'idle' | 'sending' | 'error'>('idle');

  const items = Object.values(cart);

  if (items.length === 0) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      client: {
        nom: formData.get('nom') as string,
        email: formData.get('email') as string,
        telephone: formData.get('telephone') as string,
        message: formData.get('message') as string,
      },
      items: items.map(item => ({
        nom: item.nom,
        prix: item.prix,
        quantite: item.quantite,
      })),
      total,
    };

    try {
      const response = await fetch('/api/commande', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        clearCart();
        window.location.href = '/merci';
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
      <div className="px-5 py-4 bg-neutral-50 border-b border-neutral-200">
        <h2 className="font-heading font-bold text-neutral-900">Vos coordonnées</h2>
        <p className="text-xs text-neutral-500 mt-0.5">Pour confirmer votre réservation</p>
      </div>

      <form onSubmit={handleSubmit} className="p-5 space-y-4">
        <div>
          <label htmlFor="nom" className="block text-sm font-medium text-neutral-700 mb-1">
            Nom complet <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="nom"
            name="nom"
            required
            className="w-full px-3.5 py-2.5 border border-neutral-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-3.5 py-2.5 border border-neutral-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors"
          />
        </div>

        <div>
          <label htmlFor="telephone" className="block text-sm font-medium text-neutral-700 mb-1">
            Téléphone <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="telephone"
            name="telephone"
            required
            className="w-full px-3.5 py-2.5 border border-neutral-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-1">
            Message <span className="text-neutral-400">(optionnel)</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={2}
            placeholder="Créneau de retrait souhaité, préférences..."
            className="w-full px-3.5 py-2.5 border border-neutral-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors resize-y"
          />
        </div>

        {status === 'error' && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm" role="alert">
            Une erreur est survenue. Réessayez ou contactez-nous directement.
          </div>
        )}

        <button
          type="submit"
          disabled={status === 'sending'}
          className="w-full bg-accent-500 text-secondary-900 font-bold py-3.5 rounded-lg hover:bg-accent-400 transition-colors text-base disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {status === 'sending' ? 'Envoi en cours...' : `Réserver (${total.toFixed(2)} €)`}
        </button>

        <p className="text-[11px] text-neutral-400 text-center leading-relaxed">
          En validant, vous acceptez notre{' '}
          <a href="/politique-confidentialite" className="underline hover:text-primary-600">
            politique de confidentialité
          </a>
          . Paiement au retrait uniquement.
        </p>
      </form>
    </div>
  );
}
