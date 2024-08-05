import React, { useContext } from "react";
import { ThemeContext } from "../ThemeProvider"; // Update with your file path

export function ThemeSwitcher() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const handleClick = () => {
    toggleTheme();
  };

  return (
    <button onClick={handleClick}>
      Switch to {theme === "dark" ? "light" : "dark"} mode
    </button>
  );
}
