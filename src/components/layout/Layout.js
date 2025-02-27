import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Children } from "react";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";
function Layout({ children, title }) {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
      </Helmet>
      <Navbar></Navbar>
      <Toaster />
      <main>{children}</main>
      <Footer></Footer>
    </>
  );
}

export default Layout;
