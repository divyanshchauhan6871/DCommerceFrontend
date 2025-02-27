// Dashboard.jsx
import React from "react";
import Layout from "../layout/Layout";
import UserMenu from "../layout/UserMenu";
import { useAuth } from "../../context/authContext";

const Dashboard = () => {
  const { auth } = useAuth();
  return (
    <Layout>
      <div className="dashboard-container p-5">
        <div className="row">
          {/* Sidebar */}
          <div className="col-lg-3 col-md-4 mb-4">
            <UserMenu />
          </div>

          {/* User Details */}
          <div className="col-lg-9 col-md-8">
            <div className="card user-card">
              <h5 className="card-header">User Panel</h5>
              <div className="card-body">
                <h5 className="card-title">Welcome, {auth?.user?.name}</h5>
                <div className="card-text">
                  <p>
                    <span>Email:</span> {auth?.user?.email}
                  </p>
                  <p>
                    <span>Mobile Number:</span> {auth?.user?.phone}
                  </p>
                  <p>
                    <span>Address:</span> {auth?.user?.address}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
