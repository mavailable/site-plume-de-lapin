import { useStore } from '@nanostores/react';
import { $cart, $cartTotal, $cartCount, updateQuantity, removeFromCart, loadFromStorage } from '@/stores/cart';
import { useEffect, useState } from 'react';

export default function CartSlider() {
  const cart = useStore($cart);
  const total = useStore($cartTotal);
  const count = useStore($cartCount);
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    loadFromStorage();
    setLoaded(true);
  }, []);

  // Ouvrir le slider quand un produit est ajouté
  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener('cart-updated', handler);
    return () => window.removeEventListener('cart-updated', handler);
  }, []);

  // Fermer avec Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    if (open) {
      document.addEventListener('keydown', handler);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!loaded) return null;

  const items = Object.values(cart);

  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Slider panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-out flex flex-col ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-label="Votre panier"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200">
          <h2 className="font-heading font-bold text-lg text-neutral-900">
            Panier <span className="text-neutral-400 font-normal text-sm">({count})</span>
          </h2>
          <button
            onClick={() => setOpen(false)}
            className="w-10 h-10 flex items-center justify-center text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer"
            aria-label="Fermer le panier"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <svg className="w-14 h-14 mx-auto text-neutral-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="0.75">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              <p className="mt-3 text-neutral-500">Votre panier est vide</p>
              <button
                onClick={() => setOpen(false)}
                className="mt-4 text-sm font-semibold text-primary-600 hover:text-primary-700 cursor-pointer"
              >
                Continuer mes achats
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.slug} className="flex gap-3 pb-4 border-b border-neutral-100 last:border-0">
                  {/* Miniature */}
                  <div className="w-16 h-16 bg-neutral-100 rounded-lg flex-shrink-0 flex items-center justify-center text-neutral-300">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="0.75">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-sm text-neutral-900 leading-tight pr-2">{item.nom}</h3>
                      <button
                        onClick={() => removeFromCart(item.slug)}
                        className="text-neutral-300 hover:text-red-500 transition-colors cursor-pointer flex-shrink-0"
                        aria-label={`Retirer ${item.nom}`}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => {
                            if (item.quantite === 1) removeFromCart(item.slug);
                            else updateQuantity(item.slug, item.quantite - 1);
                          }}
                          className="w-7 h-7 rounded border border-neutral-200 flex items-center justify-center text-neutral-500 hover:bg-neutral-50 cursor-pointer text-sm"
                        >
                          −
                        </button>
                        <span className="w-7 text-center text-sm font-medium">{item.quantite}</span>
                        <button
                          onClick={() => updateQuantity(item.slug, item.quantite + 1)}
                          className="w-7 h-7 rounded border border-neutral-200 flex items-center justify-center text-neutral-500 hover:bg-neutral-50 cursor-pointer text-sm"
                        >
                          +
                        </button>
                      </div>
                      <p className="text-sm font-bold text-neutral-900">
                        {(item.prix * item.quantite).toFixed(2)} €
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer — total + CTA */}
        {items.length > 0 && (
          <div className="border-t border-neutral-200 px-6 py-5 bg-neutral-50">
            <div className="flex justify-between items-center mb-1">
              <span className="text-neutral-600 text-sm">Total indicatif</span>
              <span className="text-xl font-heading font-bold text-primary-900">{total.toFixed(2)} €</span>
            </div>
            <p className="text-[11px] text-neutral-400 mb-4">Ajusté au poids réel lors du retrait</p>
            <a
              href="/panier"
              className="block w-full bg-primary-700 text-white text-center font-semibold py-3.5 rounded-lg hover:bg-primary-800 transition-colors"
            >
              Valider ma réservation
            </a>
            <button
              onClick={() => setOpen(false)}
              className="block w-full text-center text-sm text-neutral-500 hover:text-neutral-700 mt-3 cursor-pointer"
            >
              Continuer mes achats
            </button>
          </div>
        )}
      </div>
    </>
  );
}
