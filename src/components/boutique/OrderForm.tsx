import { useStore } from '@nanostores/react';
import { $cart, $cartTotal, clearCart } from '@/stores/cart';
import { useState } from 'react';

export default function OrderForm() {
  const cart = useStore($cart);
  const total = useStore($cartTotal);
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
    <form onSubmit={handleSubmit} className="space-y-5 mt-8">
      <h2 className="font-heading font-bold text-xl text-neutral-900">Vos coordonnées</h2>

      <div>
        <label htmlFor="nom" className="block text-sm font-medium text-neutral-700 mb-1">
          Nom complet <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="nom"
          name="nom"
          required
          className="w-full px-4 py-3 border border-neutral-300 rounded focus:ring-2 focus:ring-accent-500 focus:border-accent-500 outline-none transition-colors"
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
          className="w-full px-4 py-3 border border-neutral-300 rounded focus:ring-2 focus:ring-accent-500 focus:border-accent-500 outline-none transition-colors"
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
          className="w-full px-4 py-3 border border-neutral-300 rounded focus:ring-2 focus:ring-accent-500 focus:border-accent-500 outline-none transition-colors"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-1">
          Message (optionnel)
        </label>
        <textarea
          id="message"
          name="message"
          rows={3}
          placeholder="Précisez vos préférences ou un créneau de retrait souhaité"
          className="w-full px-4 py-3 border border-neutral-300 rounded focus:ring-2 focus:ring-accent-500 focus:border-accent-500 outline-none transition-colors resize-y"
        />
      </div>

      {status === 'error' && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-sm" role="alert">
          Une erreur est survenue. Veuillez réessayer ou nous contacter directement.
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full bg-accent-500 text-secondary-900 font-semibold py-4 px-6 rounded hover:bg-accent-600 transition-colors min-h-[52px] text-lg disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        {status === 'sending' ? 'Envoi en cours...' : 'Envoyer ma réservation'}
      </button>

      <p className="text-xs text-neutral-500 text-center">
        En soumettant ce formulaire, vous acceptez que vos données soient traitées conformément à notre{' '}
        <a href="/politique-confidentialite" className="underline hover:text-primary-600">
          politique de confidentialité
        </a>
        .
      </p>
    </form>
  );
}
