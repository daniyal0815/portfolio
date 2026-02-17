import { useEffect, useState } from "react";
import useTheme from "../hooks/useTheme";

const links = [
  { name: "Home", id: "home" },
  { name: "About", id: "about" },
  { name: "Projects", id: "projects" },
  { name: "Contact", id: "contact" },
];

const Navbar = () => {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // Smooth scroll
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  // Scroll spy
  useEffect(() => {
    const handleScroll = () => {
      links.forEach((link) => {
        const section = document.getElementById(link.id);
        if (!section) return;

        const rect = section.getBoundingClientRect();

        if (rect.top <= 150 && rect.bottom >= 150) {
          setActive(link.id);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-4 left-0 w-full z-50 px-4">
      <div className="mx-auto max-w-6xl flex items-center justify-between">

        {/* Desktop Nav */}
        <nav className="hidden md:flex mx-auto bg-white/80 dark:bg-black/70 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-full px-2 py-1">
          {links.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollToSection(link.id)}
              className={`px-4 py-2 rounded-full text-sm transition ${
                active === link.id
                  ? "bg-gray-100 dark:bg-gray-800 text-black dark:text-white"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              {link.name}
            </button>
          ))}
        </nav>

        {/* Desktop Controls */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-black/70 flex items-center justify-center"
          >
            {theme === "dark" ? "🌙" : "☀️"}
          </button>
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden ml-auto w-10 h-10 rounded-full border bg-white dark:bg-black flex items-center justify-center"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden mt-3 mx-4 bg-white dark:bg-black rounded-2xl border dark:border-gray-700 shadow-lg overflow-hidden">
          {links.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollToSection(link.id)}
              className={`block w-full text-left px-5 py-4 ${
                active === link.id
                  ? "bg-gray-100 dark:bg-gray-800 text-black dark:text-white"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
              }`}
            >
              {link.name}
            </button>
          ))}

          <div className="flex justify-end px-5 py-4 border-t dark:border-gray-700">
            <button
              onClick={toggleTheme}
              className="w-10 h-10 rounded-full border dark:border-gray-700"
            >
              {theme === "dark" ? "🌙" : "☀️"}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
