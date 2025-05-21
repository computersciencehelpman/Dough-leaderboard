// components/DarkModeToggle.js
import { useEffect, useState } from "react";

export default function DarkModeToggle() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
      setEnabled(true);
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      setEnabled(false);
    }
  }, []);

  const handleToggle = (e) => {
    const isChecked = e.target.checked;
    const theme = isChecked ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    setEnabled(isChecked);
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <label className="relative inline-block w-20 h-10">
        <input
          type="checkbox"
          checked={enabled}
          onChange={handleToggle}
          className="sr-only"
        />
        <span className="slider block bg-gray-300 dark:bg-gray-700 absolute inset-0 rounded-full cursor-pointer transition-colors duration-300" />
        <span
          className={`dot absolute left-1 top-1 w-8 h-8 rounded-full transition-transform duration-300 ${
            enabled ? "translate-x-10 bg-yellow-400" : "translate-x-0 bg-black"
          }`}
        />
        <span className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 text-black dark:text-white">
          <svg width="18" height="18" fill="currentColor">
            <path d="M21 12.79A9 9 0 0111.21 3a7 7 0 100 14 9 9 0 009.79-4.21z" />
          </svg>
        </span>
        <span className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 text-orange-400">
          <svg width="18" height="18" fill="currentColor">
            <path d="M12 18a6 6 0 100-12 6 6 0 000 12zm0 2a8 8 0 118-8 8 8 0 01-8 8zm0-20v2m0 16v2m10-10h2M2 12H0m16.24-7.76l1.42 1.42M4.34 19.66l1.42-1.42M4.34 4.34l1.42 1.42M19.66 19.66l-1.42-1.42" />
          </svg>
        </span>
      </label>
    </div>
  );
}

