// src/components/Sidebar.jsx
import React from "react";
// import { Link } from "@nextui-org/react";
import { Link } from "react-router-dom";

import HomeIcon from "../../icons/HomeIcon";
import DocumentationIcon from "../../icons/DocumentationIcon";

import SidebarItem from "./SidebarItem";

import Logo from "../../../assets/logo-outlined.svg";

const Sidebar = () => {
  return (
    <aside className="sticky top-0 h-screen w-64 flex flex-col p-4 border-r dark:border-r-foreground-100">
      <Link to="/">
        <div className="flex items-center justify-center gap-4 mb-8">
          <img src={Logo} alt="Logo" className="h-10" />
          <h2 className="text-xl font-bold text-foreground">Admin</h2>
        </div>
      </Link>
      <nav className="flex flex-col gap-4">
        <SidebarItem icon={<HomeIcon />} title="Home" href="/" />
        <SidebarItem
          icon={<DocumentationIcon />}
          title="Documentation"
          href="/documentation"
        />
        <SidebarItem icon={<HomeIcon />} title="Contact" />
      </nav>
    </aside>
  );
};

export default Sidebar;
