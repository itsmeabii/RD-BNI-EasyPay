import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { GetUser } from "@/lib/auth/GetUser";
import {
  loadCartFromDB,
  upsertCartItem,
  deleteCartItem,
  clearCartFromDB,
} from "@/lib/utils/Cart/CartUtils";

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
  isLoading: boolean;
  items: CartItem[];
  addToCart: (item: CartItem, itemType?: "training" | "membership") => void;
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
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [checkoutItems, setCheckoutItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const user = await GetUser();
      if (!user?.id) {
        setIsLoading(false); 
        return;
      }
      setUserId(user.id);
      const cartData = await loadCartFromDB(user.id);
      setItems(cartData);
      setIsLoading(false); 
    };
    init();
  }, []);

  const addToCart = async (item: CartItem, itemType: "training" | "membership" = "training") => {
    if (items.some((i) => i.id === item.id)) return;
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
  const totalPrice = items.reduce((sum, i) => sum + i.price, 0);

  return (
    <CartContext.Provider
      value={{
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