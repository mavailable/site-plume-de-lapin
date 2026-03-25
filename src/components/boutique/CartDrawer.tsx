import { useStore } from '@nanostores/react';
import { $cart, $cartTotal, $cartCount, updateQuantity, removeFromCart, loadFromStorage } from '@/stores/cart';
import { useEffect, useState } from 'react';

export default function CartDrawer() {
  const cart = useStore($cart);
  const total = useStore($cartTotal);
  const count = useStore($cartCount);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    loadFromStorage();
    setLoaded(true);
  }, []);

  if (!loaded) return null;

  const items = Object.values(cart);

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <svg className="w-16 h-16 mx-auto text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
        </svg>
        <p className="mt-4 text-neutral-600 text-lg">Votre panier est vide</p>
        <a
          href="/boutique"
          className="mt-6 inline-block bg-accent-500 text-secondary-900 font-semibold py-3 px-6 rounded hover:bg-accent-600 transition-colors"
        >
          Voir nos produits
        </a>
      </div>
    );
  }

  return (
    <div>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.slug} className="flex gap-4 bg-neutral-50 rounded-lg p-4 border border-neutral-200">
            {/* Photo placeholder */}
            <div className="w-16 h-16 bg-neutral-200 rounded flex-shrink-0 flex items-center justify-center text-neutral-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm text-neutral-900 truncate">{item.nom}</h3>
              <p className="text-sm text-accent-800 font-bold mt-1">{item.prix.toFixed(2)} €</p>

              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={() => updateQuantity(item.slug, item.quantite - 1)}
                  className="w-8 h-8 rounded border border-neutral-300 flex items-center justify-center text-neutral-600 hover:bg-neutral-100 cursor-pointer"
                  aria-label="Diminuer la quantité"
                >
                  −
                </button>
                <span className="w-8 text-center text-sm font-medium">{item.quantite}</span>
                <button
                  onClick={() => updateQuantity(item.slug, item.quantite + 1)}
                  className="w-8 h-8 rounded border border-neutral-300 flex items-center justify-center text-neutral-600 hover:bg-neutral-100 cursor-pointer"
                  aria-label="Augmenter la quantité"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={() => removeFromCart(item.slug)}
              className="self-start text-neutral-400 hover:text-red-500 transition-colors p-1 cursor-pointer"
              aria-label={`Retirer ${item.nom} du panier`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="mt-6 pt-6 border-t border-neutral-200">
        <div className="flex justify-between items-center">
          <span className="text-neutral-600">Total indicatif</span>
          <span className="text-2xl font-heading font-bold text-accent-800">{total.toFixed(2)} €</span>
        </div>
        <p className="text-xs text-neutral-500 mt-1">
          Prix indicatifs — le montant final sera ajusté au poids réel lors du retrait.
        </p>
      </div>
    </div>
  );
}
