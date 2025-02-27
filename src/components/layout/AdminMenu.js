// AdminMenu.jsx
import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <div className="admin-menu-container text-center">
      <div className="list-group admin-menu-list">
        <NavLink
          to="/dashboard/admin"
          className="list-group-item admin-menu-header text-black bg-warning">
          <h2>Admin Panel</h2>
        </NavLink>
        <NavLink
          to="/dashboard/admin/create-category"
          className="list-group-item admin-menu-item">
          Create Category
        </NavLink>
        <NavLink
          to="/dashboard/admin/create-product"
          className="list-group-item admin-menu-item">
          Create Product
        </NavLink>
        <NavLink
          to="/dashboard/admin/products"
          className="list-group-item admin-menu-item">
          All Products
        </NavLink>
        <NavLink
          to="/dashboard/admin/orders"
          className="list-group-item admin-menu-item">
          Orders
        </NavLink>
      </div>
    </div>
  );
};

export default AdminMenu;
