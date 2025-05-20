// components/DarkModeToggle.js
import { useEffect, useState } from "react";

export default function DarkModeToggle() {
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", enabled);
  }, [enabled]);

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <button
        onClick={() => setEnabled(!enabled)}
        className="relative w-20 h-10 bg-gray-300 dark:bg-gray-700 rounded-full shadow-inner flex items-center px-1 transition-all duration-300"
      >
        <div
          className={`w-8 h-8 rounded-full transition-all duration-300 ${
            enabled ? "bg-white translate-x-10" : "bg-black translate-x-0"
          }`}
        />
        <span className="absolute right-2 text-orange-500 text-lg">☀️</span>
      </button>
    </div>
  );
}
