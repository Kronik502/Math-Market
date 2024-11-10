// context/cartContext.js
import React, { createContext, useState, useContext } from 'react';

// Create Cart Context
const CartContext = createContext();

// Custom hook to use cart
export const useCart = () => {
  return useContext(CartContext);
};

// Cart Provider
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Add item to the cart
  const addToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  // Remove item from cart
  const removeFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter(item => item.id !== itemId));
  };

  // Check if item is already in cart
  const isItemInCart = (itemId) => {
    return cart.some(item => item.id === itemId);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, isItemInCart }}>
      {children}
    </CartContext.Provider>
  );
};
