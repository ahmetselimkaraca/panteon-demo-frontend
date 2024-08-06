// src/components/Sidebar.jsx
import React from "react";
// import { Link } from "@nextui-org/react";
import { Link } from "react-router-dom";

import HomeIcon from "../../icons/HomeIcon";
import DocumentationIcon from "../../icons/DocumentationIcon";
import UserManagementIcon from "../../icons/UserManagementIcon";
import GameSettingsIcon from "../../icons/GameSettingsIcon";
import ReportsIcon from "../../icons/ReportsIcon";
import FeedbackIcon from "../../icons/FeedbackIcon";
import SupportIcon from "../../icons/SupportIcon";
import ContactIcon from "../../icons/ContactIcon";

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
        <SidebarItem icon={<UserManagementIcon />} title="User Manager" />
        <SidebarItem icon={<GameSettingsIcon />} title="Game Settings" />
        <SidebarItem icon={<ReportsIcon />} title="Reports" href="/reports" />
        <SidebarItem icon={<FeedbackIcon />} title="Feedback" />
        <SidebarItem icon={<SupportIcon />} title="Support" />
        <SidebarItem icon={<ContactIcon />} title="Contact" />
      </nav>
    </aside>
  );
};

export default Sidebar;
