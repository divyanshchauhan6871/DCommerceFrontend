import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Contact from "./components/pages/Contact";
import Policy from "./components/pages/Policy";
import PageNotFOund from "./components/pages/PageNotFOund";
import Register from "./components/pages/Auth/Register";
import Login from "./components/pages/Auth/Login";
import Dashboard from "./components/user/Dashboard";
import PrivateRoute from "./components/Route/Private";
import ForgotPassword from "./components/pages/Auth/ForgotPassword";
import AdminAuth from "./components/Route/AdminAuth";
import AdminDashboard from "./components/admin/AdminDashboard";
import CreateProduct from "./components/admin/CreateProduct";
import CreateCategory from "./components/admin/CreateCategory";
import UserProfile from "./components/user/UserProfile";
import Orders from "./components/user/Orders";
import Products from "./components/admin/Products";
import UpdateProduct from "./components/admin/UpdateProduct";
import Search from "./components/pages/Search";
import ProductDetails from "./components/pages/ProductDetails";
import Categories from "./components/pages/Categories";
import CategoryProduct from "./components/pages/CategoryProduct";
import CartPage from "./components/pages/CartPage";
import AdminOrders from "./components/admin/AdminOrders";

function App() {
  return (
    <>
      <Routes>
        <Route path="/about" element={<About />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/" element={<Home />}></Route>
        <Route path="/product/:slug" element={<ProductDetails />}></Route>
        <Route path="/categories" element={<Categories />}></Route>
        <Route path="/category/:slug" element={<CategoryProduct />}></Route>
        <Route path="/cart" element={<CartPage />}></Route>

        <Route path="/dashboard/user" element={<PrivateRoute />}>
          <Route path="profile" element={<Dashboard />} />
          <Route path="profile-edit" element={<UserProfile />} />
          <Route path="orders" element={<Orders />} />
        </Route>

        <Route path="/dashboard/admin" element={<AdminAuth />}>
          <Route index element={<AdminDashboard />} />
          <Route path="create-category" element={<CreateCategory />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="products" element={<Products />} />
          <Route path="create-product" element={<CreateProduct />} />
          <Route path="product/:slug" element={<UpdateProduct />} />
        </Route>

        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        <Route path="/search" element={<Search />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/policy" element={<Policy />}></Route>
        <Route path="/signup" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="*" element={<PageNotFOund />}></Route>
      </Routes>
    </>
  );
}

export default App;
