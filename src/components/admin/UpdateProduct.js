import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import AdminMenu from "../layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
const { Option } = Select;

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [singlecategory, setSingleCategory] = useState("");
  const [category, setCategory] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [id, setId] = useState("");

  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `https://dcommercebackned.onrender.com/api/v1/product/get-product/${params.slug}`
      );
      console.log(data.product);
      console.log(data.product.category);
      setSingleCategory(data.product.category._id);
      setName(data.product.name);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setShipping(data.product.shipping);
      setId(data.product._id);
      //   se
    } catch (error) {
      toast.error(error);
    }
  };

  const updateProductHandler = async (e) => {
    try {
      const productdata = new FormData();
      productdata.append("name", name);
      productdata.append("description", description);
      productdata.append("price", price);
      productdata.append("category", singlecategory);
      productdata.append("quantity", quantity);
      productdata.append("shipping", shipping);
      photo && productdata.append("photo", photo);
      console.log(id);
      const { data } = await axios.put(
        `https://dcommercebackned.onrender.com/api/v1/product/update-product/${id}`,
        productdata
      );
      if (data?.success) {
        toast.success("Product updated");
        navigate("/dashboard/admin/products");
      } else {
        toast.error("Product not updated");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      toast.error(error || "Something went wrong");
      navigate("/dashboard/admin/products");
    }
  };

  const deleteProductHandler = async () => {
    try {
      let answer = prompt("Are you sure to delete the product");
      if (!answer) {
        return;
      }
      await axios.delete(
        `https://dcommercebackned.onrender.com/api/v1/product/delete-product/${id}`
      );
      navigate("/dashboard/admin/products");
    } catch (error) {
      toast.error(error || "Something went wrong");
      navigate("/dashboard/admin/products");
    }
  };

  const getAllCategory = async () => {
    try {
      let { data } = await axios.get(
        "https://dcommercebackned.onrender.com/api/v1/category/get-category"
      );
      if (data?.success) {
        data = data.category;
        console.log(data);
        setCategory(data);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getSingleProduct();
    getAllCategory();
  }, []);
  return (
    <Layout>
      <div className="container">
        <div className="row p-5">
          <div className="col-3 p-2" style={{ height: "inherit" }}>
            <div
              style={{
                position: "sticky",
                top: "10px",
              }}>
              <AdminMenu />
            </div>
          </div>

          <div className="col-9 p-2">
            create product
            <div className="p-4">
              <div className="m-1">
                <Select
                  bordered={false}
                  placeholder="Select a category"
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setSingleCategory(value);
                  }}
                  value={singlecategory}>
                  {category?.map((c) => (
                    <Option key={c._id} value={c._id}>
                      {c.name}
                    </Option>
                  ))}
                </Select>
                {/*  */}
                <div className="mb-3 text-center">
                  <input
                    type="text"
                    value={name}
                    className="form-control"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-3 text-center">
                  <input
                    type="text"
                    value={description}
                    placeholder="Enter the product description"
                    className="form-control"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>{" "}
                <div className="mb-3 text-center">
                  <input
                    type="number"
                    value={price}
                    placeholder="Enter the product price"
                    className="form-control"
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>{" "}
                <div className="mb-3 text-center">
                  <input
                    type="number"
                    value={quantity}
                    placeholder="Enter the product quantity"
                    className="form-control"
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
                <div className="mb-3 text-center">
                  <select
                    className="w-100 font-500 form-select"
                    onChange={(e) => setShipping(e.target.value)}
                    value={shipping ? "Yes" : "No"}>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
              </div>
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden></input>
                </label>
              </div>
              <div className="mb-3 text-center">
                {photo ? (
                  <>
                    (
                    <img src={URL.createObjectURL(photo)} height={"200px"} />)
                  </>
                ) : (
                  <>
                    <img
                      src={`https://dcommercebackned.onrender.com/api/v1/product/product-photo/${id}`}
                      height={"200px"}
                    />
                  </>
                )}
              </div>
              <div className="text-center mx-3">
                <button className="btn btn-dark" onClick={updateProductHandler}>
                  Update product
                </button>
                <button
                  className="btn btn-danger mx-3"
                  onClick={deleteProductHandler}>
                  Delete product
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
