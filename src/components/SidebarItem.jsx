// src/components/SidebarItem.jsx
import React from "react";
import { Link } from "@nextui-org/react";

const SidebarItem = ({ icon, title, href }) => {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 px-4 py-2 rounded-md text-foreground hover:bg-foreground-100 transition duration-300"
    >
      <span className="text-xl">{icon}</span>
      <span className="text-base">{title}</span>
    </Link>
  );
};

export default SidebarItem;
