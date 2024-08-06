import React from "react";
import { Link, useLocation } from "react-router-dom";

const SidebarItem = ({ icon, title, href }) => {
  const location = useLocation();
  const isActive = location.pathname === href;

  return (
    <Link
      to={href}
      className={`flex items-center gap-4 px-8 py-2 rounded-md text-foreground  transition duration-300 ${
        isActive ? " bg-primary-100" : "hover:bg-foreground-100"
      }`}
    >
      <span className={`text-xl ${isActive ? "" : "text-foreground-400"}`}>
        {icon}
      </span>
      <span className="text-base">{title}</span>
    </Link>
  );
};

export default SidebarItem;
