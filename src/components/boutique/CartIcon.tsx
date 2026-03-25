import { useStore } from '@nanostores/react';
import { $cartCount, loadFromStorage } from '@/stores/cart';
import { useEffect, useState } from 'react';

export default function CartIcon() {
  const count = useStore($cartCount);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    loadFromStorage();
    setLoaded(true);
  }, []);

  return (
    <a
      href="/panier"
      className="relative p-2 text-neutral-700 hover:text-primary-600 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
      aria-label={`Panier${loaded && count > 0 ? ` (${count} article${count > 1 ? 's' : ''})` : ''}`}
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
      </svg>
      {loaded && count > 0 && (
        <span className="absolute -top-0.5 -right-0.5 bg-accent-500 text-secondary-900 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {count}
        </span>
      )}
    </a>
  );
}
