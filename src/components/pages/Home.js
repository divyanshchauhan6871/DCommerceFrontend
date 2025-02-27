import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { useNavigate } from "react-router-dom";
import { Prices } from "../Prices";
import { useCart } from "../../context/CartContext";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const navigate = useNavigate();
  const [cart, setCart] = useCart();

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        "https://dcommercebackned.onrender.com/api/v1/product/get-product"
      );
      if (data?.products) {
        setProducts(data.products);
      }
    } catch (error) {
      toast.error("An error occurred while fetching products.");
    }
  };

  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        "https://dcommercebackned.onrender.com/api/v1/category/get-category"
      );
      if (data?.success) {
        setCategories(data.category);
      }
    } catch (error) {
      toast.error("An error occurred while fetching categories.");
    }
  };

  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  const filterProducts = async () => {
    try {
      const { data } = await axios.post(
        "https://dcommercebackned.onrender.com/api/v1/product/product-filter",
        { checked, radio }
      );
      if (data?.products) {
        setProducts(data.products);
      } else {
        toast.error("No products found for selected filters.");
      }
    } catch (error) {
      toast.error("An error occurred while filtering products.");
    }
  };

  useEffect(() => {
    getAllCategories();
    getAllProducts();
  }, []);

  return (
    <Layout title="D-commerce - Shop Now">
      <div className="container-fluid bg-gradient">
        <div className="row p-4">
          {/* Sticky Filter Section */}
          <div className="col-md-3 filter-section">
            <h4 className="mb-4">Filter by Category</h4>
            <div className="d-flex flex-column">
              {categories.map((c) => (
                <Checkbox
                  key={c._id}
                  onClick={(e) => handleFilter(e.target.checked, c._id)}>
                  {c.name}
                </Checkbox>
              ))}
            </div>
            <h4 className="mt-4">Filter by Price</h4>
            <div className="d-flex flex-column">
              <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                {Prices.map((p) => (
                  <Radio key={p._id} value={p.array}>
                    {p.name}
                  </Radio>
                ))}
              </Radio.Group>
            </div>
            <div className="d-flex flex-column mt-4">
              <button className="btn btn-success mb-2" onClick={filterProducts}>
                Apply Filters
              </button>
              <button
                className="btn btn-danger"
                onClick={() => window.location.reload()}>
                Clear Filters
              </button>
            </div>
          </div>

          {/* Product Section */}
          <div className="col-md-9">
            <h2 className="text-center mb-4">All Products</h2>
            <div className="row">
              {products.map((p) => (
                <div key={p._id} className="col-sm-6 col-md-4 col-lg-3 mb-4">
                  <div className="card product-card h-100">
                    <img
                      className="card-img-top"
                      src={`https://dcommercebackned.onrender.com/api/v1/product/product-photo/${p._id}`}
                      alt={p.name}
                      onError={(e) =>
                        (e.target.src = "/images/placeholder-image.png")
                      }
                      height="200"
                    />
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title text-truncate">{p.name}</h5>
                      <p className="card-text text-muted">
                        {p.description.substring(0, 50)}...
                      </p>
                      <p className="card-text fw-bold">Price: {p.price} Rs</p>
                    </div>
                    <div className="card-footer bg-white border-0 d-flex justify-content-around">
                      <button
                        className="btn btn-primary"
                        onClick={() => navigate(`/product/${p.slug}`)}>
                        Know More
                      </button>
                      <button
                        className="btn btn-secondary"
                        onClick={() => {
                          setCart([...cart, p]);
                          localStorage.setItem(
                            "cart",
                            JSON.stringify([...cart, p])
                          );
                          toast.success("Item added to cart");
                        }}>
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
