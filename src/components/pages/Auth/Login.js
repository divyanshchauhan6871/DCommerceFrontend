// Login.jsx
import React, { useState } from "react";
import Layout from "../../layout/Layout";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../../context/authContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `https://dcommercebackned.onrender.com/api/v1/auth/login`,
        {
          email,
          password,
        }
      );
      if (res.data.success === true) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/home");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
    setEmail("");
    setPassword("");
  };

  return (
    <Layout>
      <div className="login-container bg-gradient">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-md-6 form-container">
            <h1 className="text-center mb-4">Login Now</h1>
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
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  type="password"
                  required
                />
              </div>
              <div className="mb-3 text-center">
                <button className="btn btn-primary" type="submit">
                  Login
                </button>
              </div>
              <div className="mb-3 text-center">
                <Link to={"/forgot-password"}>
                  <button className="btn btn-link">Forgot password?</button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
