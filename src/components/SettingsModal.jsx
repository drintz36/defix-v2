import { X, Key, ExternalLink } from "lucide-react";
import { useState } from "react";

export function SettingsModal({ isOpen, onClose, currentKey, onSaveKey }) {
  const [inputValue, setInputValue] = useState(currentKey || "");

  if (!isOpen) return null;

  const handleSave = () => {
    onSaveKey(inputValue);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Box */}
      <div className="relative w-full max-w-md bg-white dark:bg-[#0a0a0a] rounded-2xl shadow-2xl border border-gray-200 dark:border-[var(--color-border-dark)] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 dark:border-[var(--color-border-dark)] flex items-center justify-between bg-gray-50/50 dark:bg-white/[0.02]">
          <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
            <Key className="w-5 h-5 text-[var(--color-primary-500)]" />
            API Settings
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          <div className="space-y-3">
            <label
              htmlFor="apiKey"
              className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
            >
              Google Gemini API Key
            </label>
            <input
              id="apiKey"
              type="password"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#121212] text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)] focus:border-transparent transition-all font-mono text-sm"
              autoComplete="off"
              spellCheck="false"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Your key is stored securely in your browser's local storage and is
              never sent anywhere except directly to Google's API to analyze
              your code.
            </p>
          </div>

          <a
            href="https://aistudio.google.com/app/apikey"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-[var(--color-primary-600)] dark:text-[var(--color-primary-400)] hover:underline font-medium"
          >
            Get a free API key here
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 dark:bg-black/20 border-t border-gray-100 dark:border-[var(--color-border-dark)] flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 text-sm font-semibold text-white bg-[var(--color-primary-600)] hover:bg-[var(--color-primary-500)] rounded-lg transition-colors shadow-sm"
          >
            Save Key
          </button>
        </div>
      </div>
    </div>
  );
}
