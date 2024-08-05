// src/components/UserDropdown.jsx
import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
} from "@nextui-org/react";

const UserDropdown = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Avatar
          isBordered
          src="https://sc-images-prod.s3.eu-central-1.amazonaws.com/logos/2c0505ba-9e55-4c5d-a11b-fc3f80fe8e0a_logo.png"
          className="cursor-pointer"
          size="sm"
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="User Actions">
        <DropdownItem
          key="logout"
          className="text-danger"
          color="danger"
          onClick={handleLogout}
        >
          Logout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default UserDropdown;
