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
      <div className="text-center py-16 bg-white rounded-xl border border-neutral-200">
        <svg className="w-16 h-16 mx-auto text-neutral-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="0.75">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
        </svg>
        <p className="mt-4 text-neutral-500 text-lg">Votre panier est vide</p>
        <p className="mt-1 text-neutral-400 text-sm">Ajoutez des produits depuis notre boutique</p>
        <a
          href="/boutique"
          className="mt-6 inline-block bg-primary-700 text-white font-semibold py-3 px-8 rounded-lg hover:bg-primary-800 transition-colors"
        >
          Voir nos produits
        </a>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
      {/* Header panier */}
      <div className="px-6 py-4 bg-neutral-50 border-b border-neutral-200 flex items-center justify-between">
        <h2 className="font-heading font-bold text-neutral-900">
          {count} article{count > 1 ? 's' : ''}
        </h2>
        <a href="/boutique" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
          + Ajouter des produits
        </a>
      </div>

      {/* Liste produits */}
      <div className="divide-y divide-neutral-100">
        {items.map((item) => (
          <div key={item.slug} className="flex gap-4 px-6 py-4">
            {/* Miniature */}
            <div className="w-20 h-20 bg-neutral-100 rounded-lg flex-shrink-0 flex items-center justify-center text-neutral-300">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="0.75">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-neutral-900">{item.nom}</h3>
                <button
                  onClick={() => removeFromCart(item.slug)}
                  className="text-neutral-300 hover:text-red-500 transition-colors cursor-pointer ml-2"
                  aria-label={`Retirer ${item.nom}`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
                </button>
              </div>

              <p className="text-sm text-accent-700 font-bold mt-0.5">{item.prix.toFixed(2)} € / unité</p>

              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => {
                      if (item.quantite === 1) removeFromCart(item.slug);
                      else updateQuantity(item.slug, item.quantite - 1);
                    }}
                    className="w-9 h-9 rounded-lg border border-neutral-200 flex items-center justify-center text-neutral-600 hover:bg-neutral-50 cursor-pointer"
                    aria-label="Diminuer"
                  >
                    −
                  </button>
                  <span className="w-10 text-center font-bold text-neutral-900">{item.quantite}</span>
                  <button
                    onClick={() => updateQuantity(item.slug, item.quantite + 1)}
                    className="w-9 h-9 rounded-lg border border-neutral-200 flex items-center justify-center text-neutral-600 hover:bg-neutral-50 cursor-pointer"
                    aria-label="Augmenter"
                  >
                    +
                  </button>
                </div>
                <p className="font-heading font-bold text-neutral-900">
                  {(item.prix * item.quantite).toFixed(2)} €
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="px-6 py-5 bg-neutral-50 border-t border-neutral-200">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-neutral-900 font-semibold">Total indicatif</span>
            <p className="text-xs text-neutral-400 mt-0.5">Ajusté au poids réel lors du retrait</p>
          </div>
          <span className="text-2xl font-heading font-bold text-primary-900">{total.toFixed(2)} €</span>
        </div>
      </div>
    </div>
  );
}
