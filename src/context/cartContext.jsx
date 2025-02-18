import PropTypes from 'prop-types';
import React, {
  createContext,
  useCallback,
  useMemo,
  useReducer,
} from 'react';
import useDispatch from '../hooks/useDispatch';
import {
  cartReducer,
  initialCartState,
} from '../reducers/cartReducer';
import axiosInstance from '../utils/axiosInstance';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(
    cartReducer,
    initialCartState,
  );

  const { loadDispatch, succecssDispatch, errDispatch } =
    useDispatch(dispatch);

  const loadCart = useCallback(async () => {
    const actionName = 'LOAD_CART';
    try {
      loadDispatch({
        type: `${actionName}_REQUEST`,
        payload: { message: 'Cart are loading...' },
      });
      const res = await axiosInstance.get('cart');
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

  const addToCart = useCallback(async (data) => {
    // console.log(data);
    const actionName = 'ADD_CART';
    try {
      loadDispatch({
        type: `${actionName}_REQUEST`,
        payload: {
          message: 'Cart item is adding...',
        },
        loadingId: data.productId,
      });
      const res = await axiosInstance.post('cart', data);
      succecssDispatch({
        type: `${actionName}_SUCCESS`,
        payload: { ...res.data, loadingId: data.productId },
        loadingId: data.productId,

      });
    } catch (err) {
      errDispatch({
        type: `${actionName}_FAIL`,
        payload: { message: err.message, loadingId: data.productId },
        loadingId: data.productId,

      });
    }
  }, []);

  const updateCartItem = useCallback(async (data) => {
    const actionName = 'UPDATE_CART';
    try {
      loadDispatch({
        type: `${actionName}_REQUEST`,
        payload: { message: 'Cart items is Updating...' },
      });
      const res = await axiosInstance.put(
        `cart/${data.id}`,
        data,
      );
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

  const deleteCartItem = useCallback(async (data) => {
    const actionName = 'DELETE_CART';
    try {
      loadDispatch({
        type: `${actionName}_REQUEST`,
        payload: { message: 'Cart items is Deleting...' },
      });
      await axiosInstance.delete(`cart/${data.id}`);
      succecssDispatch({
        type: `${actionName}_SUCCESS`,
        payload: data,
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
      cart,
      loadCart,
      addToCart,
      updateCartItem,
      deleteCartItem,
    }),
    [
      cart,
      loadCart,
      addToCart,
      updateCartItem,
      deleteCartItem,
    ],
  );
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}
CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
