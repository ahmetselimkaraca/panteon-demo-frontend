import React from "react";
import AppNavbar from "./AppNavbar";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <AppNavbar />
        <main className="p-4">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
