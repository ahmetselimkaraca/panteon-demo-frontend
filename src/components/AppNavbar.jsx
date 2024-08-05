import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Input,
  Link,
  User,
} from "@nextui-org/react";

import SearchIcon from "./icons/SearchIcon";
import GithubIcon from "./icons/GithubIcon";

import UserDropdown from "./UserDropdown";
import { ThemeSwitcher } from "./ThemeSwitcher";

const AppNavbar = () => {
  return (
    <Navbar isBordered className="" maxWidth="full">
      <NavbarContent justify="start">
        <NavbarItem>
          <Input
            startContent={<SearchIcon />}
            clearable
            placeholder="Search..."
            className="hidden sm:flex"
          />
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Link className="text-foreground" href="https://github.com">
            <GithubIcon />
          </Link>
        </NavbarItem>
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
        <NavbarItem>
          <UserDropdown />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default AppNavbar;
