import { useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import type { Order } from '@/types/user';

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getOrders = useCallback(async (userId: string) => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: err } = await supabase
        .from('orders')
        .select('*')
        .eq('userId', userId)
        .order('createdAt', { ascending: false });
      if (err) throw err;
      setOrders(data || []);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { orders, loading, error, getOrders };
};
