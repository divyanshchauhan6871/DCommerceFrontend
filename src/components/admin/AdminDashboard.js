// AdminDashboard.jsx
import React from "react";
import Layout from "../layout/Layout";
import AdminMenu from "../layout/AdminMenu";
import { useAuth } from "../../context/authContext";

const AdminDashboard = () => {
  const { auth } = useAuth();
  return (
    <Layout>
      <div className="admin-dashboard-container">
        <div className="row">
          {/* Sidebar */}
          <div className="col-lg-3 col-md-4 mb-4">
            <div className="sticky-sidebar">
              <AdminMenu />
            </div>
          </div>

          {/* Admin Details Panel */}
          <div className="col-lg-9 col-md-8 p-5">
            <div className="card admin-dashboard-card">
              <h5 className="card-header">Admin Panel</h5>
              <div className="card-body">
                <h5 className="card-title">Welcome, {auth?.user?.name}</h5>
                <div className="card-text">
                  <p>
                    <strong>Email:</strong> {auth?.user?.email}
                  </p>
                  <p>
                    <strong>Mobile Number:</strong> {auth?.user?.phone}
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

export default AdminDashboard;
