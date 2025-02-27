// CreateProduct.jsx
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import AdminMenu from "../layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
const { Option } = Select;

const CreateProduct = () => {
  const navigate = useNavigate();
  const [singlecategory, setSingleCategory] = useState("");
  const [category, setCategory] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");

  const handleCreateProduct = async () => {
    try {
      const productdata = new FormData();
      productdata.append("name", name);
      productdata.append("description", description);
      productdata.append("price", price);
      productdata.append("category", singlecategory);
      productdata.append("quantity", quantity);
      productdata.append("shipping", shipping);
      productdata.append("photo", photo);
      const { data } = await axios.post(
        "https://dcommercebackned.onrender.com/api/v1/product/create-product",
        productdata
      );
      if (data?.success) {
        toast.success("Product created successfully!");
        navigate("/dashboard/admin/products");
      } else {
        toast.error("Product creation failed.");
      }
    } catch (error) {
      toast.error("Error creating product.");
    }
  };

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "https://dcommercebackned.onrender.com/api/v1/category/get-category"
      );
      if (data?.success) {
        setCategory(data.category);
      }
    } catch (error) {
      toast.error("Error fetching categories.");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  return (
    <Layout>
      <div className="create-product-container">
        <div className="row">
          {/* Sidebar */}
          <div className="col-lg-3 col-md-4">
            <div className="sticky-sidebar">
              <AdminMenu />
            </div>
          </div>

          {/* Main Content */}
          <div className="col-lg-9 col-md-8 p-4">
            <h3 className="section-title">Create New Product</h3>
            <div className="product-form-container">
              <Select
                bordered={false}
                placeholder="Select a Category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => setSingleCategory(value)}>
                {category?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="Product Name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={description}
                  placeholder="Product Description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  placeholder="Product Price"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={quantity}
                  placeholder="Product Quantity"
                  className="form-control"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <select
                  className="form-select"
                  onChange={(e) => setShipping(e.target.value)}>
                  <option value="null" disabled selected>
                    Select Shipping
                  </option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="btn btn-outline-secondary w-100">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              {photo && (
                <div className="mb-3 text-center">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="Product Preview"
                    className="img-preview"
                  />
                </div>
              )}
              <div className="text-center">
                <button
                  className="btn btn-primary"
                  onClick={handleCreateProduct}>
                  Create Product
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
