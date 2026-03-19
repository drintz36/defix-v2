import { Check, Copy } from "lucide-react";
import { useState } from "react";

export function OutputPanel({ fixedCode, isGenerating }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!fixedCode) return;
    navigator.clipboard.writeText(fixedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full border border-green-400/60 dark:border-green-500/40 rounded-xl overflow-hidden bg-gray-50 dark:bg-[#050505] shadow-sm relative transition-colors duration-200">
      <div className="bg-green-50/30 dark:bg-green-500/[0.02] px-5 py-3 border-b border-green-400/40 dark:border-green-500/20 flex justify-between items-center">
        <span className="text-[13px] font-semibold text-gray-800 dark:text-gray-200 tracking-tight uppercase">
          Fixed Output
        </span>
        <button
          onClick={handleCopy}
          disabled={!fixedCode || isGenerating}
          className="flex items-center gap-1.5 px-2 py-1.5 text-[11px] font-semibold tracking-wide uppercase rounded-md text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-200 dark:hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {copied ? (
            <Check className="w-3.5 h-3.5 text-green-500" />
          ) : (
            <Copy className="w-3.5 h-3.5" />
          )}
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <div className="flex-1 overflow-auto p-4 md:p-6 relative">
        {isGenerating ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50/80 dark:bg-[var(--color-bg-dark)]/80 backdrop-blur-sm z-10 transition-all">
            <div className="w-5 h-5 border-2 border-[var(--color-primary-500)]/30 border-t-[var(--color-primary-500)] rounded-full animate-spin mb-4"></div>
            <p className="text-[13px] font-medium text-gray-500 dark:text-gray-400 tracking-tight">
              Generating fix...
            </p>
          </div>
        ) : null}

        {fixedCode ? (
          <pre className="font-mono text-[13px] leading-relaxed text-gray-800 dark:text-gray-300 whitespace-pre font-medium p-0 m-0">
            <code>{fixedCode}</code>
          </pre>
        ) : !isGenerating ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-400 dark:text-gray-600 opacity-60">
            <span className="font-mono text-[13px] tracking-tight">
              No output yet //
            </span>
          </div>
        ) : null}
      </div>
    </div>
  );
}
