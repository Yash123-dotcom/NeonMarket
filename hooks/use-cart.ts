import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { toast } from 'sonner';

export type CartItem = {
  id: string;
  name: string;
  price: number;
  imagePath: string;
  description: string;
  filePath: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  isInCart: (id: string) => boolean;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((i) => i.id === item.id);

        if (existingItem) {
          toast.info('This item is already in your cart');
          return;
        }

        const newItem: CartItem = { ...item, quantity: 1 };
        set({ items: [...get().items, newItem] });
        toast.success(`${item.name} added to cart`);
      },

      removeItem: (id) => {
        const item = get().items.find((item) => item.id === id);
        set({ items: get().items.filter((item) => item.id !== id) });
        if (item) {
          toast.success(`${item.name} removed from cart`);
        }
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }

        set({
          items: get().items.map((item) => (item.id === id ? { ...item, quantity } : item)),
        });
      },

      clearCart: () => {
        set({ items: [] });
        toast.success('Cart cleared');
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
      },

      isInCart: (id) => {
        return get().items.some((item) => item.id === id);
      },
    }),
    {
      name: 'cart-storage', // Unique name for local storage
      storage: createJSONStorage(() => localStorage),
    }
  )
);
