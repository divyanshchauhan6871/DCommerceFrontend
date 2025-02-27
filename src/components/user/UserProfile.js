import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import UserMenu from "../layout/UserMenu";
import { useAuth } from "../../context/authContext";
import toast from "react-hot-toast";
import axios from "axios";

const UpdateProfile = () => {
  //context
  const { auth, setAuth } = useAuth();
  //state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (auth?.user) {
      const { email, name, phone, address } = auth.user;
      setName(name || "");
      setPhone(phone || "");
      setEmail(email || "");
      setAddress(address || "");
    }
  }, [auth?.user]);

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        "https://dcommercebackned.onrender.com/api/v1/auth/profile",
        {
          name,
          email,
          password,
          phone,
          address,
        }
      );
      if (data?.error) {
        toast.error(data.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Updated Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  if (!auth?.user) {
    return (
      <Layout>
        <div className="update-profile-container p-5">
          <p>Loading...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="update-profile-container p-5">
        <div className="row">
          {/* Sidebar */}
          <div className="col-lg-3 col-md-4 mb-4">
            <UserMenu />
          </div>

          {/* Update Profile Form */}
          <div className="col-lg-9 col-md-8">
            <div className="card update-profile-card">
              <h5 className="card-header">Update Profile</h5>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <h4 className="title">USER PROFILE</h4>
                  <div className="mb-3">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="form-control"
                      placeholder="Enter Your Name"
                      autoFocus
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-control"
                      placeholder="Enter Your Email"
                      disabled
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="form-control"
                      placeholder="Enter Your Password"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="form-control"
                      placeholder="Enter Your Phone"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="form-control"
                      placeholder="Enter Your Address"
                    />
                  </div>

                  <button type="submit" className="btn btn-primary">
                    UPDATE
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProfile;
