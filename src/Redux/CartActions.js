// src/redux/actions/cartActions.js

export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const UPDATE_ITEM_QUANTITY = 'UPDATE_ITEM_QUANTITY'; // Optional: Update quantity
export const CLEAR_CART = 'CLEAR_CART'; // Optional: Clear all items in the cart

// Action to add an item to the cart
export const addToCart = (item) => {
  if (!item || !item.id) {
    console.error('Invalid item object');
    return;
  }
  return {
    type: ADD_TO_CART,
    payload: item,
  };
};

// Action to remove an item from the cart
export const removeFromCart = (itemId) => {
  if (!itemId) {
    console.error('Invalid item ID');
    return;
  }
  return {
    type: REMOVE_FROM_CART,
    payload: itemId,
  };
};

// Optional: Action to update the quantity of an item in the cart
export const updateItemQuantity = (itemId, quantity) => {
  if (!itemId || quantity < 1) {
    console.error('Invalid item ID or quantity');
    return;
  }
  return {
    type: UPDATE_ITEM_QUANTITY,
    payload: { itemId, quantity },
  };
};

// Optional: Action to clear the entire cart
export const clearCart = () => ({
  type: CLEAR_CART,
});
