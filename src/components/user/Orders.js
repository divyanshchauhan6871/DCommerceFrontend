import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import UserMenu from "../layout/UserMenu";
import axios from "axios";
import { useAuth } from "../../context/authContext";
import moment from "moment";

const Orders = () => {
  const { auth, setAuth } = useAuth();
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `https://dcommercebackned.onrender.com/api/v1/auth/orders`
      );
      setOrders(data.orders);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrders();
  }, [auth?.token]);

  return (
    <Layout>
      <div className="orders-container p-5">
        <div className="row">
          {/* Sidebar */}
          <div className="col-lg-3 col-md-4 mb-4">
            <UserMenu />
          </div>

          {/* Orders List */}
          <div className="col-lg-9 col-md-8">
            <div className="card orders-card">
              <h5 className="card-header">All Orders</h5>
              <div className="card-body">
                {orders?.map((o, i) => (
                  <div className="order-item card mb-4" key={o._id}>
                    <div className="card-header d-flex justify-content-between text-black">
                      <span>Order {i + 1}</span>
                      <span>Status: {o.status}</span>
                    </div>
                    <div className="card-body">
                      <p>
                        <strong>Buyer:</strong> {o.buyer?.name}
                      </p>
                      <p>
                        <strong>Date:</strong> {moment(o.createAt).fromNow()}
                      </p>
                      <p>
                        <strong>Payment:</strong>{" "}
                        {o.payment.success ? "Success" : "Failed"}
                      </p>
                      <p>
                        <strong>Quantity:</strong> {o.products?.length}
                      </p>
                    </div>
                    <div className="order-products">
                      {o.products?.map((p, idx) => (
                        <div
                          className="product-item d-flex align-items-center mb-3 p-2"
                          key={p._id}>
                          <img
                            src={`https://dcommercebackned.onrender.com/api/v1/product/product-photo/${p._id}`}
                            alt={p.name}
                            className="product-img me-3"
                          />
                          <div>
                            <p className="mb-1">
                              <strong>{p.name}</strong>
                            </p>
                            <p className="mb-1">
                              {p.description.substring(0, 30)}...
                            </p>
                            <p className="mb-0">Price: ${p.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
