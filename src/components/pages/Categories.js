import React from "react";
import Layout from "../layout/Layout";
import UseCategory from "../hooks/UseCategory";
import { Link } from "react-router-dom";

const Categories = () => {
  const categories = UseCategory();
  return (
    <Layout>
      <div className="categories-container container-fluid bg-gradient">
        <div className="container px-4">
          <h1 className="categories-title text-center">All Categories</h1>
          <div className="row">
            {categories.map((c) => (
              <div
                className="col-12 col-sm-6 col-md-4 col-lg-3 mt-4"
                key={c._id}>
                <div className="card category-card">
                  <Link to={`/category/${c.slug}`} className="btn cat-btn">
                    {c.name}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
