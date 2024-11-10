import React, { useState } from 'react';
import { useCart } from '../context/CartContext.js';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const stripePromise = loadStripe('your_publishable_key_here'); // Replace with your Stripe publishable key

const Cart = () => {
  const { cart, removeFromCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState('');
  const stripe = useStripe();
  const elements = useElements();

  // Calculate the total price of the items in the cart
  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  const handlePayment = async (event) => {
    event.preventDefault();
    setIsProcessing(true);

    try {
      // Step 1: Create a payment intent on the backend
      const { data } = await axios.post('http://localhost:5000/api/create-payment-intent', {
        amount: Math.round(totalPrice * 100), // Convert to smallest currency unit (cents)
      });
      const { clientSecret } = data;

      // Step 2: Confirm the payment with Stripe
      const cardElement = elements.getElement(CardElement);
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: 'Customer Name', // Replace with actual user info if available
          },
        },
      });

      if (error) {
        setMessage(error.message);
      } else if (paymentIntent.status === 'succeeded') {
        setMessage('Payment succeeded!');
        // Optionally, clear the cart or perform other post-payment actions
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
      console.error(error);
    }

    setIsProcessing(false);
  };

  if (cart.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  return (
    <Elements stripe={stripePromise}>
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
        <h3>Total: ${totalPrice.toFixed(2)}</h3>

        <form onSubmit={handlePayment}>
          <CardElement style={{ base: { fontSize: '18px' } }} />
          <button
            type="submit"
            disabled={!stripe || isProcessing}
            style={{
              marginTop: '20px',
              backgroundColor: '#4caf50',
              color: '#fff',
              padding: '10px 20px',
              borderRadius: '5px',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            {isProcessing ? 'Processing…' : `Pay $${totalPrice.toFixed(2)}`}
          </button>
        </form>
        
        {message && <p>{message}</p>}
      </div>
    </Elements>
  );
};

export default Cart;
