import React from "react";
import { Link } from "react-router-dom";
import Layout from "../layout/Layout";

const PageNotFOund = () => {
  return (
    <Layout>
      <div className="pageNotFoundCOntainer text-white">
        <div className="innerPageNotFound text-center">
          <h1 className="pgnotfoundhead">404 !</h1>
          <p>Page not found</p>
          <p>
            Something went wrong in the URL / the page is under construction
          </p>
          <p>
            <button className="btn btn-warning">
              <Link
                style={{
                  textDecoration: "none",
                  color: "black",
                  fontWeight: "500",
                }}
                to="/home">
                Go back home
              </Link>
            </button>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default PageNotFOund;
