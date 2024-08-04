// src/components/Layout.js
import React from "react";
import AppNavbar from "./AppNavbar";

const Layout = ({ children }) => {
  return (
    <div>
      <AppNavbar />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
