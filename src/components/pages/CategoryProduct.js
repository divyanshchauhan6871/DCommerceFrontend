// import React, { useEffect, useState } from "react";
// import Layout from "../layout/Layout";
// import axios from "axios";
// import { useNavigate, useParams } from "react-router-dom";
// import { useCart } from "../../context/CartContext";
// import toast from "react-hot-toast";

// const CategoryProduct = () => {
//   const [cart, setCart] = useCart();
//   const navigate = useNavigate();
//   const params = useParams();
//   const [products, setProducts] = useState([]);
//   const [category, setCategory] = useState({});

//   const getProductsbyCategory = async () => {
//     const { data } = await axios.get(
//       `https://dcommercebackned.onrender.com/api/v1/product/categroies-wise-product/${params.slug}`
//     );
//     setProducts(data?.products);
//     setCategory(data.category);
//     console.log(data);
//     try {
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getProductsbyCategory();
//   }, [params.slug]);

//   return (
//     <Layout>
//       <div className="container mt-3 category p-4">
//         <h4 className="text-center text-capitalize px-5">
//           Category - {category?.name}
//         </h4>
//         <div className="row p-3">
//           <div className="d-flex flex-wrap">
//             {products?.map((p) => (
//               <div className="col-4">
//                 <div className="card mx-4" key={p._id}>
//                   <img
//                     src={`https://dcommercebackned.onrender.com/api/v1/product/product-photo/${p._id}`}
//                     className="card-img-top"
//                     width={"250px"}
//                     alt={p.name}
//                   />
//                   <div className="card-body">
//                     <div className="card-name-price">
//                       <h3 className="card-title text-center text-capitalize">
//                         {p.name}
//                       </h3>
//                       <h6 className="card-title card-price d-inline">
//                         Price :
//                       </h6>
//                       Rs. {p.price}
//                     </div>
//                     <p className="card-text ">
//                       {p.description.substring(0, 60)}...
//                     </p>
//                     <div className="card-name-price">
//                       <button
//                         className="btn btn-info ms-1"
//                         onClick={() => navigate(`/product/${p.slug}`)}>
//                         More Details
//                       </button>

//                       <button
//                         className="btn btn-secondary m-2"
//                         onClick={() => {
//                           setCart([...cart, p]);
//                           toast.success("Item added to cart");
//                         }}>
//                         Add to Cart
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default CategoryProduct;

import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import toast from "react-hot-toast";

const CategoryProduct = () => {
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  const params = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState({});

  const getProductsbyCategory = async () => {
    try {
      const { data } = await axios.get(
        `https://dcommercebackned.onrender.com/api/v1/product/categroies-wise-product/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data.category);
    } catch (error) {
      console.error("Error fetching category products:", error);
    }
  };

  useEffect(() => {
    getProductsbyCategory();
  }, [params.slug]);

  return (
    <Layout>
      <div className="category-container">
        <h4 className="category-title">Category - {category?.name}</h4>
        <div className="card-container">
          {products?.map((p) => (
            <div className="product-card text-center" key={p._id}>
              <img
                src={`https://dcommercebackned.onrender.com/api/v1/product/product-photo/${p._id}`}
                alt={p.name}
                onError={(e) =>
                  (e.target.src = "/images/placeholder-image.png")
                }
              />
              <div className="card-body">
                <div className="card-name-price">
                  <h3>{p.name}</h3>
                  <h6>
                    <span className="card-price">Price:</span> Rs. {p.price}
                  </h6>
                </div>
                <p className="card-text">{p.description.substring(0, 60)}...</p>
                <div className="card-buttons">
                  <button
                    className="btn btn-info"
                    onClick={() => navigate(`/product/${p.slug}`)}>
                    More Details
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => {
                      setCart([...cart, p]);
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

export default CategoryProduct;
