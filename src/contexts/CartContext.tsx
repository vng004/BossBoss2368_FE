import React, { createContext, ReactNode, useEffect, useReducer } from 'react';
import { instance } from '../api';
import { Accessory } from '../interface/accessory';
import { Order } from '../interface/order';
import { Product } from '../interface/products';
import CartReducers, { CartAction, CartItem } from '../reducers/cartReducers';

export type CartContextType = {
  state: {
    products: CartItem[];
    totalPrice: number;
    cartId: string;
  };
  dispatch: React.Dispatch<CartAction>;
  addToCart: (product: Product | Accessory, quantity: number, size: string, color: string, isAccessory: boolean) => void;
  getCart: () => void;
  removeFromCart: (productId: string, size: string, color: string, isAccessory: boolean) => void;
  updateQuantity: (productId: string, size: string, color: string, quantity: number, isAccessory: boolean) => void;
  checkout: (order: Order, cartId: string) => void;
  totalQuantity: number;
};

const initialState = {
  products: [] as CartItem[],
  totalPrice: 0,
  cartId: '',
};

export const CartContext = createContext<CartContextType>({} as CartContextType);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(CartReducers, initialState);

  const getCart = async () => {
    try {
      const res = await instance.get('/cart');
      const cart = res.data.cart || { products: [], totalPrice: 0 };

      dispatch({
        type: "GET_CART",
        payload: {
          products: cart.products || [],
          totalPrice: cart.totalPrice || 0,
          cartId: cart._id || ''
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCart();
  }, []);



  const addToCart = async (product: Product | Accessory, quantity: number, size: string | null, color: string | null, isAccessory: boolean) => {
    try {
      const res = await instance.post('/cart', { productId: product._id, quantity, size, color, isAccessory });
      dispatch({
        type: 'ADD_TO_CART',
        payload: {
          product: res.data.product,
          quantity: res.data.quantity,
          size: res.data.size,
          color: res.data.color,
          isAccessory,
        },
      });
      getCart()
    } catch (error) {
      console.log(error);
    }
  };

  const updateQuantity = async (productId: string, size: string, color: string, newQuantity: number, isAccessory: boolean) => {
    try {
      await instance.patch(`/cart/${productId}`, { productId, size, color, newQuantity, isAccessory });
      dispatch({
        type: "UPDATE_QUANTITY",
        payload: {
          productId,
          size,
          color,
          quantity: newQuantity,
          isAccessory,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const removeFromCart = async (productId: string, size: string, color: string, isAccessory: boolean) => {
    try {
      await instance.delete(`/cart/${productId}`);
      dispatch({
        type: "REMOVE_FROM_CART",
        payload: {
          productId,
          size,
          color,
          isAccessory,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const checkout = async (order: Order, cartId: string) => {
    try {
      const res = await instance.post(`/cart/checkout/${cartId}`, order);
      localStorage.setItem("orderData", JSON.stringify(res.data));
      dispatch({ type: "CHECKOUT" });
    } catch (error) {
      console.error(error);
    }
  };


  const calculateTotalQuantity = (products: CartItem[]): number => {
    return products.reduce((total, item) => {
      const quantity = typeof item.quantity === 'number' ? item.quantity : 0;
      return total + quantity;
    }, 0);
  };


  const totalQuantity = calculateTotalQuantity(state.products);

  return (
    <CartContext.Provider value={{ state, dispatch, addToCart, updateQuantity, getCart, removeFromCart, checkout, totalQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
