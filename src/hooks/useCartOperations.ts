import { useState, useCallback } from 'react';
import { useCartStore } from '@/store/cartStore';
import { updateCartLines, removeCartLines, getCart } from '@/api/services/cart.service';

export function useCartOperations() {
  const { cartId, setCart } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshCart = useCallback(async () => {
    if (!cartId) return;
    setRefreshing(true);
    setError(null);
    try {
      const latestCart = await getCart(cartId);
      if (latestCart) {
        setCart(latestCart);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to refresh cart');
    } finally {
      setRefreshing(false);
    }
  }, [cartId, setCart]);

  const updateQuantity = useCallback(
    async (lineId: string, quantity: number) => {
      if (!cartId) return;
      setLoading(true);
      setError(null);
      try {
        const updatedCart = await updateCartLines(cartId, [{ id: lineId, quantity }]);
        setCart(updatedCart);
      } catch (err: any) {
        setError(err.message || 'Failed to update quantity');
      } finally {
        setLoading(false);
      }
    },
    [cartId, setCart]
  );

  const removeItem = useCallback(
    async (lineId: string) => {
      if (!cartId) return;
      setLoading(true);
      setError(null);
      try {
        const updatedCart = await removeCartLines(cartId, [lineId]);
        setCart(updatedCart);
      } catch (err: any) {
        setError(err.message || 'Failed to remove item');
      } finally {
        setLoading(false);
      }
    },
    [cartId, setCart]
  );

  return {
    loading,
    refreshing,
    error,
    refreshCart,
    updateQuantity,
    removeItem,
  };
}
