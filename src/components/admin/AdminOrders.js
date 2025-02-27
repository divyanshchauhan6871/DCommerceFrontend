import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import AdminMenu from "../layout/AdminMenu";
import axios from "axios";
import moment from "moment";
import { useAuth } from "../../context/authContext";
import { Select } from "antd";
import "./AdminOrder.css";
const { Option } = Select;

const AdminOrders = () => {
  const [status] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancel",
  ]);
  const [orders, setOrders] = useState([]);
  const { auth } = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        "https://dcommercebackned.onrender.com/api/v1/auth/all-orders"
      );
      console.log("data ", data.orders);
      console.log(data);
      console.log(data.orders);
      setOrders(data.orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setOrders([]);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    try {
      await axios.put(
        `https://dcommercebackned.onrender.com/api/v1/auth/order-status/${orderId}`,
        { status: value }
      );
      getOrders();
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  return (
    <Layout title={"All Orders Data"}>
      <div className="create-product-container">
        <div className="row">
          <div className="col-lg-3 col-md-4">
            <div className="sticky-sidebar">
              <AdminMenu />
            </div>
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Orders</h1>
            {console.log(orders)}
            {orders.map((o, i) => (
              <div className="border shadow" key={o?._id || i}>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Status</th>
                      <th scope="col">Buyer</th>
                      <th scope="col">Date</th>
                      <th scope="col">Payment</th>
                      <th scope="col">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{i + 1}</td>
                      <td>
                        <Select
                          bordered={false}
                          onChange={(value) => handleChange(o._id, value)}
                          defaultValue={o?.status}>
                          {status.map((s, i) => (
                            <Option key={i} value={s}>
                              {s}
                            </Option>
                          ))}
                        </Select>
                      </td>
                      <td>{o?.buyer?.name || "Unknown"}</td>
                      <td>
                        {o?.createAt ? moment(o.createAt).fromNow() : "N/A"}
                      </td>
                      <td>{o?.payment?.success ? "Success" : "Failed"}</td>
                      <td>{o?.products?.length || 0}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="container">
                  {Array.isArray(o?.products) &&
                    o.products.map((p) => (
                      <div className="row mb-2 p-3 card flex-row" key={p?._id}>
                        <div className="col-md-4">
                          <img
                            src={`https://dcommercebackned.onrender.com/api/v1/product/product-photo/${p._id}`}
                            className="card-img-top"
                            alt={p?.name || "Product Image"}
                            width="100px"
                            height="100px"
                          />
                        </div>
                        <div className="col-md-8">
                          <p>{p?.name || "Unknown Product"}</p>
                          <p>
                            {p?.description?.substring(0, 30) ||
                              "No Description"}
                          </p>
                          <p>Price: {p?.price || "N/A"}</p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;
