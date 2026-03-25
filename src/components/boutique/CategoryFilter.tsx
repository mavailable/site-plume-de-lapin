import { useState, useEffect } from 'react';

interface Category {
  label: string;
  value: string;
}

interface Props {
  categories: Category[];
}

export default function CategoryFilter({ categories }: Props) {
  const [active, setActive] = useState('all');

  useEffect(() => {
    const grid = document.getElementById('product-grid');
    if (!grid) return;

    const items = grid.querySelectorAll<HTMLElement>('[data-category]');
    items.forEach((item) => {
      if (active === 'all' || item.dataset.category === active) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    });
  }, [active]);

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => (
        <button
          key={cat.value}
          onClick={() => setActive(cat.value)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors min-h-[44px] cursor-pointer ${
            active === cat.value
              ? 'bg-primary-700 text-white'
              : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
          }`}
          aria-pressed={active === cat.value}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
