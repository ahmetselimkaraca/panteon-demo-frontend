// src/components/Sidebar.jsx
import React from "react";
import { Link } from "@nextui-org/react";
import HomeIcon from "./icons/HomeIcon";

import SidebarItem from "./SidebarItem";

const Sidebar = () => {
  return (
    <aside className="sticky top-0 h-screen w-64 flex flex-col p-4 border-r dark:border-r-foreground-100">
      <h2 className="text-2xl font-bold mb-8">Navigation</h2>
      <nav className="flex flex-col gap-4">
        <SidebarItem icon={<HomeIcon />} title="Home" href="/" />
        <SidebarItem icon={<HomeIcon />} title="About" />
        <SidebarItem icon={<HomeIcon />} title="Contact" />
      </nav>
    </aside>
  );
};

export default Sidebar;
