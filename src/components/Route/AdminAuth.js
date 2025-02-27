import { useState, useEffect } from "react";
import { useAuth } from "../../context/authContext";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

const AdminAuth = () => {
  const [ok, setOk] = useState(false);
  const { auth, setAuth } = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get(
        "https://dcommercebackned.onrender.com/api/v1/auth/admin-auth"
      );
      if (res.data) {
        setOk(true);
      } else {
        setAuth(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);
  return ok ? <Outlet /> : <Spinner />;
};

export default AdminAuth;
