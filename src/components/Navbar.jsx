import { Settings } from "lucide-react";

export function Navbar({ onOpenSettings }) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md transition-colors duration-200">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        <div className="flex items-center">
          <img src="/logo.png" alt="DeFix Logo" className="w-[60px] h-[60px] object-contain" />
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={onOpenSettings}
            className="p-1.5 rounded-md hover:bg-gray-100 transition-colors cursor-pointer text-gray-500"
            title="API Settings"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
