import React, {
  createContext, useCallback, useMemo, useState,
} from 'react';
import axiosInstance from '../utils/axiosInstance';

export const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const loadproducts = useCallback(
    async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get('products');
        setProducts(res.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const value = useMemo(() => ({
    loadproducts, products, loadingError: error, productLoading: loading,
  }), [loadproducts, products, error, loading]);
  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
  // body
}
