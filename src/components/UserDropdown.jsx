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
          src="https://img.freepik.com/free-psd/3d-rendering-avatar_23-2150833560.jpg?w=740&t=st=1722840952~exp=1722841552~hmac=b442c0e3c47212fecf821a9653e27925624f043d8ef038c15774057e0faa9233"
          className="cursor-pointer"
          size="md"
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
