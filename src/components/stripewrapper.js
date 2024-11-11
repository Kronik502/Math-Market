// PaymentPage.js (frontend)

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

// Load Stripe with your public key
const stripePromise = loadStripe("your-stripe-public-key");

const PaymentPage = () => {
  const cart = useSelector((state) => state.cart.items); // Get cart items
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  // Calculate total price
  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  useEffect(() => {
    // Request to create the payment intent on the backend
    const createPaymentIntent = async () => {
      const response = await axios.post("http://localhost:5000/api/checkout", {
        items: cart,
        shipping: { /* shipping info */ },
        currency: "usd",
      });
      setClientSecret(response.data.clientSecret);
    };

    createPaymentIntent();
  }, [cart]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
      },
    });

    if (error) {
      console.error("Error processing payment:", error);
      alert(error.message);
    } else if (paymentIntent.status === "succeeded") {
      console.log("Payment successful!");
      // Redirect to a success page or clear the cart
      window.location.href = "/payment-success";
    }
  };

  return (
    <div>
      <h2>Payment Page</h2>
      <p>Total: ${totalAmount}</p>
      <form onSubmit={handleSubmit}>
        <CardElement />
        <button type="submit" disabled={!stripe}>Pay</button>
      </form>
    </div>
  );
};

const PaymentPageWrapper = () => (
  <Elements stripe={stripePromise}>
    <PaymentPage />
  </Elements>
);

export default PaymentPageWrapper;
