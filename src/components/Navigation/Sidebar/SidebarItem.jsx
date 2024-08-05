// src/components/SidebarItem.jsx
import React from "react";

// import { Link } from "@nextui-org/react";
import { Link } from "react-router-dom";

const SidebarItem = ({ icon, title, href }) => {
  return (
    <Link
      to={href}
      className="flex items-center gap-4 px-8 py-2 rounded-md text-foreground hover:bg-foreground-100 transition duration-300"
    >
      <span className="text-xl text-foreground-400">{icon}</span>
      <span className="text-base">{title}</span>
    </Link>
  );
};

export default SidebarItem;
