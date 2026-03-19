import { useState, useRef, useEffect } from "react";

const LANGUAGES = [
  "JavaScript",
  "TypeScript",
  "Python",
  "Java",
  "C++",
  "C#",
  "Go",
  "Rust",
  "PHP",
  "Ruby",
  "Swift",
  "Kotlin",
  "Dart",
  "HTML",
  "CSS",
  "SQL",
  "Bash",
  "Lua",
  "R",
  "Scala",
];

export function LanguageSelector({ selected = "", onChange = () => {} }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function selectLanguage(lang) {
    onChange(selected === lang ? "" : lang);
    setIsOpen(false);
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] font-semibold tracking-wide uppercase rounded-md text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-200 dark:hover:bg-white/10 transition-colors cursor-pointer border border-gray-200 dark:border-white/10"
      >
        <span>{selected || "Language"}</span>
        <svg
          className={`w-3 h-3 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m19 9-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-white/10 rounded-lg shadow-xl z-50 overflow-hidden">
          <div className="max-h-[280px] overflow-y-auto p-1.5">
            {LANGUAGES.map((lang) => {
              const isSelected = selected === lang;
              return (
                <button
                  type="button"
                  key={lang}
                  onClick={() => selectLanguage(lang)}
                  className={`w-full text-left px-3 py-2 rounded-md text-[13px] font-medium transition-colors flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5"
                  }`}
                >
                  <span>{lang}</span>
                  {isSelected && (
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
