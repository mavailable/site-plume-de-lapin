import { useStore } from '@nanostores/react';
import { $cart, addToCart, updateQuantity, removeFromCart } from '@/stores/cart';
import { useState } from 'react';

interface Props {
  slug: string;
  nom: string;
  prix: number;
  photo: string;
}

export default function AddToCartButton({ slug, nom, prix, photo }: Props) {
  const cart = useStore($cart);
  const [justAdded, setJustAdded] = useState(false);
  const item = cart[slug];
  const qty = item?.quantite || 0;

  const handleAdd = () => {
    addToCart({ slug, nom, prix, photo });
    setJustAdded(true);
    // Dispatch event pour ouvrir le mini-panier
    window.dispatchEvent(new CustomEvent('cart-updated'));
    setTimeout(() => setJustAdded(false), 1500);
  };

  if (qty > 0) {
    return (
      <div className="flex items-center gap-1">
        <button
          onClick={() => {
            if (qty === 1) removeFromCart(slug);
            else updateQuantity(slug, qty - 1);
          }}
          className="w-9 h-9 rounded-lg border border-neutral-300 flex items-center justify-center text-neutral-600 hover:bg-neutral-100 transition-colors cursor-pointer text-lg"
          aria-label="Diminuer la quantité"
        >
          −
        </button>
        <span className="w-9 text-center text-sm font-bold text-neutral-900">{qty}</span>
        <button
          onClick={() => {
            updateQuantity(slug, qty + 1);
            window.dispatchEvent(new CustomEvent('cart-updated'));
          }}
          className="w-9 h-9 rounded-lg border border-neutral-300 flex items-center justify-center text-neutral-600 hover:bg-neutral-100 transition-colors cursor-pointer text-lg"
          aria-label="Augmenter la quantité"
        >
          +
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleAdd}
      className={`font-semibold text-sm py-2.5 px-5 rounded-lg transition-all min-h-[44px] cursor-pointer ${
        justAdded
          ? 'bg-primary-700 text-white'
          : 'bg-accent-500 text-secondary-900 hover:bg-accent-400'
      }`}
      aria-label={`Ajouter ${nom} au panier`}
    >
      {justAdded ? '✓ Ajouté' : '+ Ajouter'}
    </button>
  );
}
