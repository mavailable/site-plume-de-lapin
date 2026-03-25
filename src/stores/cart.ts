import { map, computed } from 'nanostores';

export type CartItem = {
  slug: string;
  nom: string;
  prix: number;
  photo: string;
  quantite: number;
};

export const $cart = map<Record<string, CartItem>>({});

export const $cartCount = computed($cart, (cart) =>
  Object.values(cart).reduce((sum, item) => sum + item.quantite, 0)
);

export const $cartTotal = computed($cart, (cart) =>
  Object.values(cart).reduce((sum, item) => sum + item.prix * item.quantite, 0)
);

export function addToCart(product: Omit<CartItem, 'quantite'>) {
  const current = $cart.get()[product.slug];
  $cart.setKey(product.slug, {
    ...product,
    quantite: current ? current.quantite + 1 : 1,
  });
  saveToStorage();
}

export function removeFromCart(slug: string) {
  const next = { ...$cart.get() };
  delete next[slug];
  $cart.set(next);
  saveToStorage();
}

export function updateQuantity(slug: string, quantite: number) {
  if (quantite <= 0) return removeFromCart(slug);
  const item = $cart.get()[slug];
  if (item) {
    $cart.setKey(slug, { ...item, quantite });
    saveToStorage();
  }
}

export function clearCart() {
  $cart.set({});
  localStorage.removeItem('cart');
}

function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify($cart.get()));
}

export function loadFromStorage() {
  try {
    const saved = localStorage.getItem('cart');
    if (saved) $cart.set(JSON.parse(saved));
  } catch {
    /* ignore */
  }
}
