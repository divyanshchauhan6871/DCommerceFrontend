import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import AdminMenu from "../layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../Form/CategoryForm";
import { Modal } from "antd";

const CreateCategory = () => {
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [category, setCategory] = useState([]);

  const getAllCategory = async () => {
    try {
      let { data } = await axios.get(
        "https://dcommercebackned.onrender.com/api/v1/category/get-category"
      );
      if (data?.success) {
        setCategory(data.category);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://dcommercebackned.onrender.com/api/v1/category/create-category",
        { name }
      );
      if (data?.success) {
        toast.success(`Category added: ${name}`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
      setName("");
    } catch (error) {
      toast.error("Error in creating category");
    }
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `https://dcommercebackned.onrender.com/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data.success) {
        toast.success("Successfully updated");
      } else {
        toast.error("Update unsuccessful");
      }
      setVisible(false);
      getAllCategory();
    } catch (error) {
      toast.error("Error in updating category");
    }
  };

  const handleDeleteCategory = async (c) => {
    try {
      const { data } = await axios.delete(
        `https://dcommercebackned.onrender.com/api/v1/category/delete-category/${c._id}`
      );
      if (data.success) {
        toast.success(`Category deleted: ${c.name}`);
      } else {
        toast.error("Error in deleting category");
      }
      getAllCategory();
    } catch (error) {
      toast.error("Error in deleting category");
    }
  };

  return (
    <Layout>
      <div className="create-category-container">
        <div className="row">
          {/* Sidebar */}
          <div className="col-lg-3 col-md-4">
            <div className="sticky-sidebar">
              <AdminMenu />
            </div>
          </div>

          {/* Main Content */}
          <div className="col-lg-9 col-md-8 p-4">
            <h3 className="section-title">Manage Categories</h3>
            <div className="category-form-container mb-4">
              <CategoryForm
                value={name}
                setValue={setName}
                handleSubmit={handleSubmit}
              />
            </div>
            <div className="category-list-container">
              <table className="table table-bordered">
                <thead className="table-light">
                  <tr className="text-center">
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {category.map((c) => (
                    <tr key={c._id} className="text-center">
                      <td>{c.name}</td>
                      <td>
                        <button
                          className="btn btn-primary btn-sm me-2"
                          onClick={() => {
                            setVisible(true);
                            setUpdatedName(c.name);
                            setSelected(c);
                          }}>
                          Edit
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDeleteCategory(c)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Modal for Update */}
          <Modal
            onCancel={() => setVisible(false)}
            footer={null}
            open={visible}>
            <CategoryForm
              value={updatedName}
              setValue={setUpdatedName}
              handleSubmit={handleUpdateProduct}
            />
          </Modal>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
