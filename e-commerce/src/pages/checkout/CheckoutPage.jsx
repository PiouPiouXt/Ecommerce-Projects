import axios from 'axios';
import { useState, useEffect } from 'react'
import { CheckoutHeader } from '../../components/CheckoutHeader';
import { OrderSummary } from './OrderSummary';
import { PaymentSummary } from './PaymentSummary';
import './CheckoutHeader.css';
import './CheckoutPage.css';

window.axios = axios; //default value according to the backend

export function CheckoutPage({ cart = [], loadCart }) {
  const [checkoutData, setCheckoutData] = useState({
    deliveryOptions: [],
    paymentSummary: null,
  });

  useEffect(() => {
    const fetchCheckoutData = async () => {
      const [deliveryResponse, paymentResponse] = await Promise.all([
        axios.get('/api/delivery-options?expand=estimatedDeliveryTime'),
        axios.get('/api/payment-summary'),
      ]);

      // defer to avoid synchronous setState inside effect
      setTimeout(() => {
        setCheckoutData({
          deliveryOptions: deliveryResponse.data,
          paymentSummary: paymentResponse.data,
        });
      }, 0);
    };

    fetchCheckoutData();
  }, [cart]);


  return (
    <>
      <title>Checkout</title>
      <CheckoutHeader />

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary cart={cart} deliveryOptions={checkoutData.deliveryOptions} loadCart={loadCart} />
          <PaymentSummary paymentSummary={checkoutData.paymentSummary} loadCart={loadCart} />
        </div>
      </div>
    </>
  );
}