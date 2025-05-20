// components/DarkModeToggle.js
import { useEffect, useState } from "react";

export default function DarkModeToggle() {
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    if (enabled) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [enabled]);

  return (
    <button
      onClick={() => setEnabled(!enabled)}
      className="fixed top-4 right-4 z-50 bg-gray-300 dark:bg-gray-700 text-black dark:text-white px-3 py-1 rounded text-sm"
    >
      {enabled ? "☀ Light Mode" : "🌙 Dark Mode"}
    </button>
  );
}
