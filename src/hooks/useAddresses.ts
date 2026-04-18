import { useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import type { Address, AddressForm } from '@/types/user';

export const useAddresses = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getAddresses = useCallback(async (userId: string) => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: err } = await supabase
        .from('addresses')
        .select('*')
        .eq('userId', userId)
        .order('isDefault', { ascending: false })
        .order('createdAt', { ascending: false });
      if (err) throw err;
      setAddresses(data || []);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const addAddress = async (userId: string, data: AddressForm) => {
    setLoading(true);
    try {
      if (data.isDefault) {
        await supabase.from('addresses').update({ isDefault: false }).eq('userId', userId);
      }
      const { error: err } = await supabase.from('addresses').insert({ ...data, userId });
      if (err) throw err;
      await getAddresses(userId);
      return { error: null };
    } catch (e: any) {
      return { error: e.message };
    } finally {
      setLoading(false);
    }
  };

  const updateAddress = async (id: string, userId: string, data: AddressForm) => {
    setLoading(true);
    try {
      if (data.isDefault) {
        await supabase.from('addresses').update({ isDefault: false }).eq('userId', userId);
      }
      const { error: err } = await supabase.from('addresses').update(data).eq('id', id);
      if (err) throw err;
      await getAddresses(userId);
      return { error: null };
    } catch (e: any) {
      return { error: e.message };
    } finally {
      setLoading(false);
    }
  };

  const deleteAddress = async (id: string, userId: string) => {
    setLoading(true);
    try {
      const { error: err } = await supabase.from('addresses').delete().eq('id', id);
      if (err) throw err;
      await getAddresses(userId);
      return { error: null };
    } catch (e: any) {
      return { error: e.message };
    } finally {
      setLoading(false);
    }
  };

  const setDefaultAddress = async (id: string, userId: string) => {
    setLoading(true);
    try {
      await supabase.from('addresses').update({ isDefault: false }).eq('userId', userId);
      const { error: err } = await supabase.from('addresses').update({ isDefault: true }).eq('id', id);
      if (err) throw err;
      await getAddresses(userId);
      return { error: null };
    } catch (e: any) {
      return { error: e.message };
    } finally {
      setLoading(false);
    }
  };

  return { addresses, loading, error, getAddresses, addAddress, updateAddress, deleteAddress, setDefaultAddress };
};
