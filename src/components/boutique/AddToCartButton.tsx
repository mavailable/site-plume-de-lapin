import { addToCart } from '@/stores/cart';

interface Props {
  slug: string;
  nom: string;
  prix: number;
  photo: string;
}

export default function AddToCartButton({ slug, nom, prix, photo }: Props) {
  const handleClick = () => {
    addToCart({ slug, nom, prix, photo });
  };

  return (
    <button
      onClick={handleClick}
      className="bg-accent-500 text-secondary-900 font-semibold text-sm py-2 px-4 rounded hover:bg-accent-600 transition-colors min-h-[44px] cursor-pointer"
      aria-label={`Ajouter ${nom} au panier`}
    >
      + Ajouter
    </button>
  );
}
