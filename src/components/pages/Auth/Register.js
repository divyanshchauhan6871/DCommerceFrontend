// Register.jsx
import React, { useState } from "react";
import Layout from "../../layout/Layout";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `https://dcommercebackned.onrender.com/api/v1/auth/register`,
        {
          name,
          email,
          password,
          address,
          phone,
          answer,
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
    setName("");
    setEmail("");
    setAddress("");
    setPassword("");
    setPhone("");
    setAnswer("");
  };

  return (
    <Layout>
      <div className="register-container bg-gradient">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-md-6 form-container">
            <h1 className="text-center mb-4">Register Now</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  type="text"
                  required
                />
              </div>
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
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  type="password"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  className="form-control"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter your address"
                  type="text"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  className="form-control"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter your phone number"
                  type="number"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  className="form-control"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Enter your nickname"
                  type="text"
                  required
                />
              </div>
              <div className="mb-3 text-center">
                <button type="submit" className="btn btn-primary">
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
