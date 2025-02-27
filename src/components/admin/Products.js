// Products.jsx
import React, { useEffect, useState } from "react";
import AdminMenu from "../layout/AdminMenu";
import Layout from "../layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `https://dcommercebackned.onrender.com/api/v1/product/get-product`
      );
      setProducts(data.products);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout>
      <div className="products-container">
        <div className="row">
          {/* Sidebar */}
          <div className="col-lg-3 col-md-4">
            <div className="sticky-sidebar">
              <AdminMenu />
            </div>
          </div>

          {/* Main Content */}
          <div className="col-lg-9 col-md-8 p-4">
            <h3 className="section-title">All Products</h3>
            <div className="products-grid">
              {products.map((product) => (
                <Link
                  className="product-card text-decoration-none"
                  key={product._id}
                  to={`/dashboard/admin/product/${product.slug}`}>
                  <div className="card">
                    <img
                      className="card-img-top"
                      src={`https://dcommercebackned.onrender.com/api/v1/product/product-photo/${product._id}`}
                      alt={`${product.name}`}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{product.name}</h5>
                      <p className="card-text">
                        {product.description.substring(0, 60)}...
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
