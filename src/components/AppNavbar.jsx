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
import BellIcon from "./icons/BellIcon";
import GithubIcon from "./icons/GithubIcon";

import UserDropdown from "./UserDropdown";
import { ThemeSwitcher } from "./ThemeSwitcher";

const AppNavbar = () => {
  return (
    <Navbar isBordered maxWidth="full" height={"75px"}>
      <NavbarContent justify="start">
        <div className="w-full">
          <NavbarItem>
            <Input
              startContent={<SearchIcon />}
              clearable
              placeholder="Search..."
              className="hidden sm:flex"
            />
          </NavbarItem>
        </div>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <BellIcon />
        </NavbarItem>
        <NavbarItem className="mt-[0.438rem]">
          <Link href="https://github.com" className="text-foreground">
            <GithubIcon />
          </Link>
        </NavbarItem>
        <NavbarItem className="mt-[0.2rem]">
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
