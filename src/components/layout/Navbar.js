import React from "react";
import { Link, NavLink } from "react-router-dom";
import { FaShoppingBag } from "react-icons/fa";
import { useAuth } from "../../context/authContext";
import SearchInput from "../Form/SearchInput";
import UseCategory from "../hooks/UseCategory";
import { useCart } from "../../context/CartContext";

function Navbar() {
  const [cart] = useCart();
  const categories = UseCategory();
  const { auth, setAuth } = useAuth();

  const handleLogOut = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <NavLink to={"/home"} className="navbar-brand">
          D commerce
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item search-input">
              <SearchInput />
            </li>
            <li className="nav-item">
              <NavLink to={"/home"} className="nav-link" aria-current="page">
                Home
              </NavLink>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to={"/categories"}
                data-bs-toggle="dropdown">
                Categories
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to={"/categories"}>
                    All Categories
                  </Link>
                </li>
                {categories?.map((c) => (
                  <li key={c.slug}>
                    <Link className="dropdown-item" to={`/category/${c.slug}`}>
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            {!auth.user ? (
              <>
                <li className="nav-item">
                  <NavLink to={"/signup"} className="nav-link">
                    Signup
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={"/login"} className="nav-link">
                    Login
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to={`/dashboard/${
                      auth?.user?.role === 1 ? "admin" : "user/profile"
                    }`}>
                    Dashboard
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    onClick={handleLogOut}
                    to={"/login"}
                    className="nav-link">
                    Logout
                  </NavLink>
                </li>
              </>
            )}
            <li className="nav-item">
              <NavLink to={"/cart"} className="nav-link">
                <FaShoppingBag />
                My cart ({cart.length})
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
