import { createContext, useContext, useState, ReactNode } from "react";

export interface CartItem {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  qty?: number;
  selectedDate?: string;
  selectedTime?: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  totalCount: number;
  totalPrice: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  selectedIds: Set<number>;
  toggleSelect: (id: number) => void;
  toggleSelectAll: () => void;
  checkoutItems: CartItem[];
  checkoutSelected: () => void;
  checkoutSingle: (item: CartItem) => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [checkoutItems, setCheckoutItems] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
  setItems((prev) =>
    prev.some((i) => i.id === item.id) ? prev : [...prev, { ...item, qty: item.qty ?? 1 }]
  );
};

  const removeFromCart = (id: number) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  const clearCart = () => {
    setItems([]);
    setSelectedIds(new Set());
    setCheckoutItems([]);
  };

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === items.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(items.map((i) => i.id)));
    }
  };

  const checkoutSelected = (): CartItem[] => {
    const selected = items.filter((i) => selectedIds.has(i.id));
    setCheckoutItems(selected);
    return selected;
  };

  const checkoutSingle = (item: CartItem) => {
    const items = [{ ...item, qty: item.qty ?? 1 }];
    setCheckoutItems(items);
    return items;
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const totalCount = items.length;
  const totalPrice = items.reduce((sum, i) => sum + i.price, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        clearCart,
        totalCount,
        totalPrice,
        isCartOpen,
        openCart,
        closeCart,
        selectedIds,
        toggleSelect,
        toggleSelectAll,
        checkoutItems,
        checkoutSelected,
        checkoutSingle,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}