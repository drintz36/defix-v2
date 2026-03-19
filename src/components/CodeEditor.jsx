import { useMemo } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { cpp } from "@codemirror/lang-cpp";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { sql } from "@codemirror/lang-sql";
import { go } from "@codemirror/lang-go";
import { rust } from "@codemirror/lang-rust";
import { php } from "@codemirror/lang-php";
import { LanguageSelector } from "./LanguageSelector";

const LANGUAGE_MAP = {
  JavaScript: () => javascript({ jsx: true }),
  TypeScript: () => javascript({ typescript: true, jsx: true }),
  Python: () => python(),
  Java: () => java(),
  "C++": () => cpp(),
  "C#": () => cpp(),
  Go: () => go(),
  Rust: () => rust(),
  PHP: () => php(),
  HTML: () => html(),
  CSS: () => css(),
  SQL: () => sql(),
  Dart: () => javascript(),
  Swift: () => javascript(),
  Kotlin: () => java(),
  Ruby: () => python(),
  Bash: () => javascript(),
  Lua: () => javascript(),
  R: () => python(),
  Scala: () => java(),
};

// Custom dark theme matching the app's aesthetic
const darkTheme = {
  "&": {
    backgroundColor: "#2f2f2f",
    color: "#e4e4e7",
    fontSize: "13px",
    fontFamily: "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, monospace",
  },
  ".cm-gutters": {
    backgroundColor: "#2f2f2f",
    color: "rgba(180, 180, 180, 0.45)",
    borderRight: "1px solid rgba(255,255,255,0.06)",
    paddingRight: "8px",
  },
  ".cm-activeLineGutter": {
    backgroundColor: "transparent",
    color: "rgba(200, 210, 225, 0.7)",
  },
  ".cm-activeLine": {
    backgroundColor: "rgba(110, 168, 254, 0.06)",
  },
  ".cm-cursor": {
    borderLeftColor: "#58a6ff",
    borderLeftWidth: "2px",
  },
  ".cm-selectionBackground": {
    backgroundColor: "rgba(56,139,253,0.25) !important",
  },
  "&.cm-focused .cm-selectionBackground": {
    backgroundColor: "rgba(56,139,253,0.35) !important",
  },
  ".cm-matchingBracket": {
    backgroundColor: "rgba(56,139,253,0.2)",
    outline: "1px solid rgba(56,139,253,0.4)",
  },
};

const lightTheme = {
  "&": {
    backgroundColor: "#f4f4f4",
    color: "#1e293b",
    fontSize: "13px",
    fontFamily: "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, monospace",
  },
  ".cm-gutters": {
    backgroundColor: "#f4f4f4",
    color: "rgba(100, 116, 139, 0.4)",
    borderRight: "1px solid rgba(0,0,0,0.06)",
    paddingRight: "8px",
  },
  ".cm-activeLineGutter": {
    backgroundColor: "transparent",
    color: "rgba(100, 116, 139, 0.7)",
  },
  ".cm-activeLine": {
    backgroundColor: "rgba(0,0,0,0.02)",
  },
  ".cm-cursor": {
    borderLeftColor: "#3b82f6",
    borderLeftWidth: "2px",
  },
  ".cm-selectionBackground": {
    backgroundColor: "rgba(59,130,246,0.15) !important",
  },
  "&.cm-focused .cm-selectionBackground": {
    backgroundColor: "rgba(59,130,246,0.2) !important",
  },
  ".cm-matchingBracket": {
    backgroundColor: "rgba(59,130,246,0.15)",
    outline: "1px solid rgba(59,130,246,0.3)",
  },
};

import { EditorView } from "@codemirror/view";
import { createTheme } from "@uiw/codemirror-themes";
import { tags as t } from "@lezer/highlight";

const appDarkTheme = createTheme({
  theme: "dark",
  settings: darkTheme,
  styles: [
    { tag: t.keyword, color: "#c084fc" },
    { tag: t.string, color: "#86efac" },
    { tag: t.number, color: "#fbbf24" },
    { tag: t.comment, color: "#6b7280", fontStyle: "italic" },
    { tag: t.function(t.variableName), color: "#60a5fa" },
    { tag: t.variableName, color: "#e4e4e7" },
    { tag: t.typeName, color: "#67e8f9" },
    { tag: t.tagName, color: "#f87171" },
    { tag: t.attributeName, color: "#fbbf24" },
    { tag: t.operator, color: "#94a3b8" },
    { tag: t.punctuation, color: "#94a3b8" },
    { tag: t.propertyName, color: "#60a5fa" },
    { tag: t.bool, color: "#fbbf24" },
    { tag: t.null, color: "#f87171" },
    { tag: t.className, color: "#67e8f9" },
    { tag: t.definition(t.variableName), color: "#93c5fd" },
  ],
});

const appLightTheme = createTheme({
  theme: "light",
  settings: lightTheme,
  styles: [
    { tag: t.keyword, color: "#7c3aed" },
    { tag: t.string, color: "#16a34a" },
    { tag: t.number, color: "#d97706" },
    { tag: t.comment, color: "#9ca3af", fontStyle: "italic" },
    { tag: t.function(t.variableName), color: "#2563eb" },
    { tag: t.variableName, color: "#1e293b" },
    { tag: t.typeName, color: "#0891b2" },
    { tag: t.tagName, color: "#dc2626" },
    { tag: t.attributeName, color: "#d97706" },
    { tag: t.operator, color: "#64748b" },
    { tag: t.punctuation, color: "#64748b" },
    { tag: t.propertyName, color: "#2563eb" },
    { tag: t.bool, color: "#d97706" },
    { tag: t.null, color: "#dc2626" },
    { tag: t.className, color: "#0891b2" },
    { tag: t.definition(t.variableName), color: "#3b82f6" },
  ],
});

export function CodeEditor({
  value,
  onChange,
  selectedLanguage = "",
  onLanguageChange = () => { },
  placeholder = "// Paste your buggy code here...",
}) {
  const isDark =
    typeof document !== "undefined" &&
    document.documentElement.classList.contains("dark");

  const extensions = useMemo(() => {
    const exts = [EditorView.lineWrapping];
    const langFn = LANGUAGE_MAP[selectedLanguage];
    if (langFn) {
      exts.push(langFn());
    } else {
      exts.push(javascript({ jsx: true }));
    }
    return exts;
  }, [selectedLanguage]);

  return (
    <div className="flex flex-col h-full border border-gray-200 dark:border-white/15 rounded-xl overflow-hidden bg-[#f4f4f4] dark:bg-[#2f2f2f] shadow-sm transition-all duration-200 relative">
      <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--color-primary-500)]/50 to-transparent opacity-70"></div>
      <div className="bg-blue-50/50 dark:bg-[var(--color-primary-900)]/10 px-5 py-3 border-b border-[var(--color-primary-500)]/20 dark:border-[var(--color-primary-500)]/20 flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[var(--color-primary-500)] animate-pulse"></div>
          <span className="text-[13px] font-bold text-[var(--color-primary-700)] dark:text-[var(--color-primary-400)] tracking-tight uppercase">
            Input Source Code Here
          </span>
        </div>
        <div className="flex items-center gap-2">
          <LanguageSelector
            selected={selectedLanguage}
            onChange={onLanguageChange}
          />
          <div className="flex gap-1.5 opacity-40">
            <div className="w-2 h-2 rounded-full bg-red-400"></div>
            <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
            <div className="w-2 h-2 rounded-full bg-green-400"></div>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-hidden [&_.cm-editor]:h-full [&_.cm-scroller]:overflow-auto [&_.cm-editor.cm-focused]:outline-none">
        <CodeMirror
          value={value}
          onChange={onChange}
          theme={isDark ? appDarkTheme : appLightTheme}
          extensions={extensions}
          placeholder={placeholder}
          basicSetup={{
            lineNumbers: true,
            highlightActiveLineGutter: true,
            highlightActiveLine: true,
            foldGutter: false,
            dropCursor: true,
            indentOnInput: true,
            bracketMatching: true,
            closeBrackets: true,
            autocompletion: false,
            highlightSelectionMatches: true,
            tabSize: 2,
          }}
          style={{ height: "100%" }}
        />
      </div>
    </div>
  );
}
