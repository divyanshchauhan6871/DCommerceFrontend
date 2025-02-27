import React from "react";
import { NavLink } from "react-router-dom";

const UserMenu = () => {
  return (
    <>
      <div className="text-center">
        <div className="list-group">
          <h3>User Pannel</h3>
          <NavLink
            to="/dashboard/user/profile"
            className="list-group-item list-group-item-action">
            User
          </NavLink>
          <NavLink
            to="/dashboard/user/profile-edit"
            className="list-group-item list-group-item-action">
            Profile
          </NavLink>
          <NavLink
            to="/dashboard/user/orders"
            className="list-group-item list-group-item-action">
            All orders
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default UserMenu;
