// components/cart.js
import React from 'react';
import { useCart } from '../context/CartContext.js';

const Cart = () => {
  const { cart, removeFromCart } = useCart();

  if (cart.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  return (
    <div>
      <h2>Your Cart</h2>
      <ul>
        {cart.map((item) => (
          <li key={item.id} style={{ marginBottom: "20px", padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}>
            <h3>{item.title}</h3>
            <p><strong>Price:</strong> ${item.price.toFixed(2)}</p>
            <button
              onClick={() => removeFromCart(item.id)}
              style={{ backgroundColor: '#e74c3c', color: '#fff', padding: '5px 10px', borderRadius: '5px', border: 'none', cursor: 'pointer' }}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;

