import React from "react";
import { useSearch } from "../../context/SearchContext.js";
import Layout from "../layout/Layout";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Search = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  return (
    <Layout title={"Search Results"}>
      <div className="container py-4">
        {/* Header */}
        <h2 className="text-center mb-4">
          {values?.results.length < 1
            ? "No products found"
            : `Found ${values.results.results.length} product(s)`}
        </h2>

        {/* Product Grid */}
        <div className="row">
          {values.results.results.map((p) => (
            <div className="col-md-3 col-sm-6 mb-4 d-flex" key={p._id}>
              {/* Product Card */}
              <div className="card shadow-sm w-100">
                {/* Product Image */}
                <img
                  className="card-img-top"
                  src={`https://dcommercebackned.onrender.com/api/v1/product/product-photo/${p._id}`}
                  alt={p.name}
                  style={{ height: "200px", objectFit: "cover" }}
                />

                {/* Product Details */}
                <div className="card-body d-flex flex-column justify-content-between">
                  <h5 className="card-title text-capitalize">{p.name}</h5>
                  <p className="card-text text-muted">
                    {p.description.substring(0, 30)}...
                  </p>
                  <p className="card-text text-success">
                    <strong>Price:</strong> Rs. {p.price}
                  </p>
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
    </Layout>
  );
};

export default Search;
