import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import toast from "react-hot-toast";
import axios from "axios";

const CartPage = () => {
  const [loading, setLoading] = useState(false);
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const { auth } = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  const total = () => {
    return cart?.reduce((total, item) => total + item.price, 0);
  };

  const removeCartItem = (pid) => {
    const updatedCart = cart.filter((item) => item._id !== pid);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.success("Item removed from cart");
  };

  const getToken = async () => {
    try {
      const { data } = await axios.get(
        "https://dcommercebackned.onrender.com/api/v1/product/braintree/token"
      );
      setClientToken(data?.clientToken);
    } catch (error) {
      console.error("Error fetching payment token:", error);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  //handle payments
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(
        "https://dcommercebackned.onrender.com/api/v1/product/braintree/payment",
        {
          nonce,
          cart,
        }
      );
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully");
    } catch (error) {
      console.error("Payment error:", error);
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="cart-container container">
        <div className="cart-header text-center">
          <h1>{`Hello ${auth?.user?.name || "Guest"}`}</h1>
          <h4>
            {cart?.length > 0
              ? `You have ${cart.length} products in your cart.`
              : "Your cart is empty."}
          </h4>
        </div>
        <div className="row">
          {/* Product List Section */}
          <div className="col-md-8">
            <div className="d-flex flex-wrap gap-3 cart-products justify-content-around">
              {cart?.map((product) => (
                <div
                  className="product-card d-flex flex-column align-items-center"
                  key={product._id}>
                  <img
                    className="product-image"
                    src={`https://dcommercebackned.onrender.com/api/v1/product/product-photo/${product._id}`}
                    alt={product.name}
                    onError={(e) =>
                      (e.target.src = "/images/placeholder-image.png")
                    }
                  />
                  <div className="product-details text-center">
                    <p className="product-name">{product.name}</p>
                    <p className="product-description">
                      {product.description
                        ? product.description.substring(0, 50) + "..."
                        : "No description available"}
                    </p>
                    <p className="product-price">₹{product.price}</p>
                  </div>
                  <button
                    className="remove-btn"
                    onClick={() => removeCartItem(product._id)}>
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
          {/* Summary Section */}
          <div className="col-md-4">
            <div className="cart-summary sticky-top">
              <h2 className="summary-title">Cart Summary</h2>
              <p className="summary-total">Total Amount: ₹{total()}</p>
              <div className="col-12">
                <b>USE</b> 4242 4242 4242 4242 as dummy A/C number
              </div>
              {auth?.user ? (
                <>
                  <p>
                    <strong>Delivery Address:</strong> {auth.user.address}
                  </p>
                  <button
                    className="checkout-btn"
                    onClick={() => navigate("/checkout")}>
                    Proceed to Checkout
                  </button>
                </>
              ) : (
                <>
                  <p>Please login to proceed to checkout.</p>
                  <button
                    className="login-btn"
                    onClick={() => navigate("/login", { state: "/cart" })}>
                    Login Now
                  </button>
                </>
              )}
              <div className="mt-4 text-center border-2">
                {!clientToken || !cart?.length ? (
                  ""
                ) : (
                  <>
                    <DropIn
                      options={{
                        authorization: clientToken,
                        paypal: {
                          flow: "vault",
                        },
                      }}
                      onInstance={(instance) => {
                        setInstance(instance);
                      }}></DropIn>
                  </>
                )}
                <button
                  className="btn btn-primary"
                  onClick={handlePayment}
                  disabled={!clientToken || !instance || loading}>
                  {loading ? "Processing..." : "Make Payment"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
