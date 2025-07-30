import { useTheme } from "./theme-context";
import { SunIcon, MoonIcon } from "@radix-ui/react-icons";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`flex items-center justify-center w-6 h-6 rounded-full transition-colors shadow-md focus:outline-none focus:ring-2
        ${
          theme === "dark"
            ? "bg-blue-500 text-white hover:bg-blue-600"
            : "bg-yellow-300 text-yellow-800 hover:bg-yellow-400"
        }`}
      aria-label="Toggle theme"
    >
      {theme === "light" && <SunIcon />}
      {theme === "dark" && <MoonIcon />}
    </button>
  );
}
