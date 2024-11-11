import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, addToCart } from "../Redux/slices/cartSlice.js"; // Removed selectCartItemsMemoized

const Cart = () => {
  const { items = [], totalPrice = 0 } = useSelector((state) => state.cart) || {}; // Access the cart state directly
  const dispatch = useDispatch();

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleUpdateQuantity = (item, newQuantity) => {
    if (newQuantity > item.quantity) {
      dispatch(addToCart({ ...item, quantity: 1 }));
    } else if (newQuantity < item.quantity && item.quantity > 1) {
      dispatch(removeFromCart(item.id));
    }
  };

  return (
    <div>
      <h2>Your Cart</h2>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        items.map((item) => (
          <div key={item.id}>
            <img src={item.image} alt={item.title} width="50" />
            <h3>{item.title}</h3>
            <p>Price: ${item.price}</p>
            <p>Quantity: {item.quantity}</p>
            <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
            <input
              type="number"
              value={item.quantity}
              onChange={(e) => handleUpdateQuantity(item, parseInt(e.target.value))}
              min="1"
            />
          </div>
        ))
      )}
      <h3>Total: ${totalPrice.toFixed(2)}</h3>
    </div>
  );
};

export default Cart;
