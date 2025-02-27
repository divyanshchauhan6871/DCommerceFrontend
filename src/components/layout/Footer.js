import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="footercontainer">
        <h2>All rights reserved &copy; DivyanshTech</h2>
        <div className="text-center d-flex justify-content-around">
          <div>
            <Link className="footerlinks" to="/home">
              -- Home --
            </Link>
          </div>
          <div>
            <Link className="footerlinks" to="/about">
              -- About --
            </Link>
          </div>
          <div>
            <Link className="footerlinks" to="/policy">
              -- Policy --
            </Link>
          </div>
          <div>
            <Link className="footerlinks" to="/contact">
              -- Contact --
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
