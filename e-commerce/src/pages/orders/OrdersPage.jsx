import axios from 'axios';
import { useState, useEffect, Fragment } from 'react';
import { Header } from '../../components/Header';
import { OrdersHeader } from './OrdersHeader';
import { OrdersDetails } from './OrdersDetails';
import './OrdersPage.css';


export function OrdersPage({ cart }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('/api/orders?expand=products')
      .then((response) => {
        setOrders(response.data);
      });

  }, []);

  return (
    <>
      <title>Orders</title>

      <Header cart={cart} />
      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <div className="orders-grid">
          {orders.map((order) => {
            return (
              <div key={order.id} className="order-container">
                <OrdersHeader order={order} />
                <OrdersDetails order={order} Fragment={Fragment} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}