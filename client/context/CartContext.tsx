import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  loadCartFromDB,
  upsertCartItem,
  deleteCartItem,
  clearCartFromDB,
} from "@/lib/utils/Cart/CartUtils";

export interface CartItem {
  id: number;
  itemType?: "training" | "membership" | "merchandise";
  title: string;
  price: number;
  thumbnail: string;
  qty?: number;
  selectedDate?: string;
  selectedTime?: string;
  color?: string;
}

interface CartContextType {
  isLoading: boolean;
  items: CartItem[];
  addToCart: (item: CartItem, itemType?: "training" | "membership" | "merchandise") => void;
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
  checkoutSelected: () => CartItem[];
  checkoutSingle: (item: CartItem) => CartItem[];
  updateQty: (id: number, qty: number) => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const userId = user?.id ?? null;

  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [checkoutItems, setCheckoutItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // React to auth changes — load DB cart or guest cart
  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      if (userId) {
        sessionStorage.removeItem("guest_cart");
        const cartData = await loadCartFromDB(userId);
        setItems(cartData);
      } else {
        const stored = sessionStorage.getItem("guest_cart");
        setItems(stored ? JSON.parse(stored) : []);
      }
      setIsLoading(false);
    };
    load();
  }, [userId]);

  // Sync guest cart to sessionStorage
  useEffect(() => {
    if (!userId) {
      sessionStorage.setItem("guest_cart", JSON.stringify(items));
    }
  }, [items, userId]);

  const updateQty = async (id: number, qty: number) => {
    if (qty < 1) return;
    setItems((prev) => {
      const updated = prev.map((i) => i.id === id ? { ...i, qty } : i);
      const updatedItem = updated.find((i) => i.id === id);
      if (userId && updatedItem) {
        upsertCartItem(userId, updatedItem, "merchandise");
      }
      return updated;
    });
  };

  const addToCart = async (item: CartItem, itemType: "training" | "membership" | "merchandise" = "training") => {
    const existing = items.find((i) => i.id === item.id);
    if (existing) {
      await updateQty(item.id, (existing.qty ?? 1) + 1);
      return;
    }
    const newItem = { ...item, qty: item.qty ?? 1 };
    setItems((prev) => [...prev, newItem]);
    if (userId) await upsertCartItem(userId, newItem, itemType);
  };

  const removeFromCart = async (id: number) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
    if (userId) await deleteCartItem(userId, id);
  };

  const clearCart = async () => {
    setItems([]);
    setSelectedIds(new Set());
    setCheckoutItems([]);
    if (userId) await clearCartFromDB(userId);
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

  const checkoutSingle = (item: CartItem): CartItem[] => {
    const single = [{ ...item, qty: item.qty ?? 1 }];
    setCheckoutItems(single);
    return single;
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const totalCount = items.length;
  const totalPrice = items.reduce((sum, i) => sum + i.price * (i.qty ?? 1), 0);

  return (
    <CartContext.Provider
      value={{
        updateQty,
        isLoading,
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