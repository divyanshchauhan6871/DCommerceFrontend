import React, { useState } from "react";
import Layout from "../../layout/Layout";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `https://dcommercebackned.onrender.com/api/v1/auth/forgot-password`,
        {
          email,
          answer,
          newpassword,
        }
      );
      if (res.data.success === true) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <div className="login-container bg-gradient">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-md-6 form-container">
            <h1 className="text-center mb-4">Reset Your Password</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  className="form-control"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Enter your Email ID"
                  type="text"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  className="form-control"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Enter your nick name"
                  type="text"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  className="form-control"
                  value={newpassword}
                  onChange={(event) => setNewPassword(event.target.value)}
                  placeholder="Enter your new password"
                  type="password"
                  required
                />
              </div>
              <div className="mb-3 text-center">
                <button className="btn btn-primary" type="submit">
                  Reset Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
