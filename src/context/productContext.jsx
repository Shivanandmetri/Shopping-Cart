import PropTypes from 'prop-types';
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from 'react';
import useDispatch from '../hooks/useDispatch';
import {
  initialproductsState,
  productsReducer,
} from '../reducers/productsReducer';
import axiosInstance from '../utils/axiosInstance';

export const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, dispatch] = useReducer(
    productsReducer,
    initialproductsState,
  );

  const { loadDispatch, succecssDispatch, errDispatch } =
    useDispatch(dispatch);

  const loadproducts = useCallback(async () => {
    const actionName = 'LOAD_PRODUCTS';
    try {
      loadDispatch({
        type: `${actionName}_REQUEST`,
        payload: { message: 'products are loading...' },
      });
      const res = await axiosInstance.get('products');
      succecssDispatch({
        type: `${actionName}_SUCCESS`,
        payload: res.data,
      });
    } catch (err) {
      errDispatch({
        type: `${actionName}_FAIL`,
        payload: { message: err.message },
      });
    }
  }, []);

  const value = useMemo(
    () => ({
      loadproducts,
      products,
    }),
    [products],
  );
  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
}

ProductProvider.protoTypes = {
  children: PropTypes.node.isRequired,
};

export const useProducts = () => useContext(ProductContext);
