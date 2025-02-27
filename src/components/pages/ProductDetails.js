// import React, { useEffect, useState } from "react";
// import Layout from "../layout/Layout";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { useNavigate, useParams } from "react-router-dom";

// const ProductDetails = () => {
//   const navigate = useNavigate();
//   const params = useParams();
//   const [similarproduct, setSimilarProduct] = useState([]);
//   const [product, setProducts] = useState({});
//   const [loading, setLoading] = useState(true);

//   const getSingleProduct = async () => {
//     try {
//       if (params?.slug) {
//         const { data } = await axios.get(
//           `https://dcommercebackned.onrender.com/api/v1/product/get-product/${params.slug}`
//         );
//         setProducts(data?.product || {});
//         getSimilarProduct(data?.product._id, data?.product.category._id);
//       }
//     } catch (error) {
//       toast.error("Error fetching product details");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getSimilarProduct = async (pid, cid) => {
//     try {
//       const { data } = await axios.get(
//         `https://dcommercebackned.onrender.com/api/v1/product/similar-product/${pid}/${cid}`
//       );
//       setSimilarProduct(data?.products);
//       console.log(data?.products);
//     } catch (error) {
//       toast.error("Error fetching product details");
//     }
//   };

//   useEffect(() => {
//     getSingleProduct();
//   }, [params.slug]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <Layout>
//       <div className="container">
//         <div className="row">
//           <div className="col-6" style={{}}>
//             <div className="d-flex align-items-center justify-content-center side-content-container">
//               <div className="aboutphoto text-center">
//                 <img
//                   width="40%"
//                   src={`https://dcommercebackned.onrender.com/api/v1/product/product-photo/${product._id}`}
//                   alt={product?.name || "Product"}
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="col-6 p-5">
//             <h1 className="text-center text-capitalize">{product?.name}</h1>
//             <h4 className="d-inline">Description : </h4>
//             {product?.description || "No description available"}
//             <br />
//             <h4 className="d-inline">Price : </h4>
//             {product?.price}
//             <br />
//             <h4 className="d-inline">Category : </h4>
//             {product?.category?.name || "N/A"}
//             <br />
//             <h4 className="d-inline">Shipping : </h4>
//             {product?.shipping ? "Yes" : "No"}
//             <br />
//           </div>
//         </div>
//         <div className="container px-5">
//           <div className="row px-5">
//             {similarproduct.map((p) => (
//               <div key={p._id} className="card col-4">
//                 <img
//                   className="card-img-top"
//                   width="40%"
//                   src={`https://dcommercebackned.onrender.com/api/v1/product/product-photo/${p._id}`}
//                   alt={p.name}
//                   onError={(e) =>
//                     (e.target.src = "/images/placeholder-image.png")
//                   }
//                   height="200px"
//                 />
//                 <div className="card-body">
//                   <h5 className="card-title">{p.name}</h5>
//                   <p className="card-text">{p.description.substring(0, 50)}</p>
//                   <p className="card-text">Price: {p.price} Rs</p>
//                 </div>
//                 <button
//                   className="btn btn-primary m-2"
//                   onClick={() => {
//                     navigate(`/product/${p.slug}`);
//                   }}>
//                   Know More
//                 </button>
//                 <button className="btn btn-secondary m-2">Add to Cart</button>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default ProductDetails;

import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const ProductDetails = () => {
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  const params = useParams();
  const [similarproduct, setSimilarProduct] = useState([]);
  const [product, setProducts] = useState({});
  const [loading, setLoading] = useState(true);

  const getSingleProduct = async () => {
    try {
      if (params?.slug) {
        const { data } = await axios.get(
          `https://dcommercebackned.onrender.com/api/v1/product/get-product/${params.slug}`
        );
        setProducts(data?.product || {});
        getSimilarProduct(data?.product._id, data?.product.category._id);
      }
    } catch (error) {
      toast.error("Error fetching product details");
    } finally {
      setLoading(false);
    }
  };

  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `https://dcommercebackned.onrender.com/api/v1/product/similar-product/${pid}/${cid}`
      );
      setSimilarProduct(data?.products);
    } catch (error) {
      toast.error("Error fetching similar products");
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, [params.slug]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <div className="product-details-container bg-gradient">
        <div className="row product-details">
          {/* Product Image Section */}
          <div className="col-md-6 product-image-section">
            <img
              className="product-main-image"
              src={`https://dcommercebackned.onrender.com/api/v1/product/product-photo/${product._id}`}
              alt={product?.name || "Product"}
            />
          </div>

          {/* Product Info Section */}
          <div className="col-md-6 product-info-section">
            <h1 className="product-title">{product?.name}</h1>
            <p className="product-description">
              <strong>Description:</strong> {product?.description || "N/A"}
            </p>
            <p className="product-price">
              <strong>Price:</strong> ₹{product?.price}
            </p>
            <p className="product-category">
              <strong>Category:</strong> {product?.category?.name || "N/A"}
            </p>
            <p className="product-shipping">
              <strong>Shipping:</strong> {product?.shipping ? "Yes" : "No"}
            </p>
            <div className="card-footer bg-white border-0 d-flex justify-content-around">
              <button
                className="btn btn-primary d-inline"
                onClick={() => navigate(`/product/${product.slug}`)}>
                Know More
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => {
                  setCart([...cart, product]);
                  localStorage.setItem(
                    "cart",
                    JSON.stringify([...cart, product])
                  );
                  toast.success("Item added to cart");
                }}>
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        {/* Similar Products Section */}
        <div className="similar-products-section">
          <h2 className="section-title">Similar Products</h2>
          <div className="row g-3">
            {similarproduct.map((p) => (
              <div key={p._id} className="col-md-4">
                <div className="card similar-product-card">
                  <img
                    className="card-img-top"
                    src={`https://dcommercebackned.onrender.com/api/v1/product/product-photo/${p._id}`}
                    alt={p.name}
                    onError={(e) =>
                      (e.target.src = "/images/placeholder-image.png")
                    }
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">
                      {p.description.substring(0, 50)}...
                    </p>
                    <p className="card-price">₹{p.price}</p>

                    <div className="card-footer bg-white border-0 d-flex justify-content-around">
                      <button
                        className="btn btn-primary d-inline"
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
