import { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { CodeEditor } from "./components/CodeEditor";
import { OutputPanel } from "./components/OutputPanel";
import { SettingsModal } from "./components/SettingsModal";
import { debugCode } from "./services/ai";
import { Bot, AlertCircle, Play, Bug, Zap, Code2, Shield, ClipboardCopy, Cpu, CheckCircle2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { ParticleBackground } from "./components/ParticleBackground";
import AOS from "aos";
import "aos/dist/aos.css";

function App() {
  const [inputCode, setInputCode] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState({ fixedCode: "", explanation: "" });
  const [error, setError] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [apiKey, setApiKey] = useState(() => {
    return localStorage.getItem("dysorint_api_key") || "";
  });

  useEffect(() => {
    if (apiKey) {
      localStorage.setItem("dysorint_api_key", apiKey);
    } else {
      localStorage.removeItem("dysorint_api_key");
    }
  }, [apiKey]);

  // Force light mode
  useEffect(() => {
    document.documentElement.classList.remove("dark");
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out-cubic',
    });
  }, []);

  const handleDebug = async () => {
    if (!inputCode.trim()) return;
    setIsGenerating(true);
    setError("");
    try {
      const data = await debugCode(inputCode, apiKey, selectedLanguage);
      setResult({
        fixedCode: data.fixedCode || "",
        explanation: data.explanation || "",
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-150 ease-in-out relative">
      <ParticleBackground />
      <Navbar
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        currentKey={apiKey}
        onSaveKey={setApiKey}
      />

      <main className="flex-1 flex flex-col max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 gap-5 relative z-10">

        {/* Above the Fold Combined Viewport */}
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] w-full space-y-12 lg:space-y-16 relative z-10 pb-8 pt-4">

          {/* Hero Section */}
          <div className="text-center space-y-4 px-4 w-full">
            <div className="flex justify-center mb-4" data-aos="fade-down" data-aos-delay="100">
              <div className="inline-flex items-center gap-2.5 px-2.5 py-1.5 rounded-full bg-white dark:bg-[#111] border border-gray-200/80 dark:border-white/10 shadow-sm hover:shadow transition-shadow">
                <span className="bg-black dark:bg-white text-white dark:text-black p-1.5 rounded-lg shadow-sm">
                  <Bot className="w-4 h-4" />
                </span>
                <span className="text-sm font-bold tracking-tight text-gray-800 dark:text-gray-200 pr-2">
                  Introducing <span className="text-[var(--color-primary-500)]">DeFix</span>
                </span>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter text-gray-900 dark:text-white leading-[1.15]" data-aos="fade-up" data-aos-delay="200">
              The Ultimate AI <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-[var(--color-primary-500)] to-[var(--color-primary-400)] bg-clip-text text-transparent relative">
                Code Debugger
                <div className="absolute -bottom-2 left-0 right-0 h-3 bg-[var(--color-primary-500)]/10 dark:bg-[var(--color-primary-500)]/20 blur-md -z-10"></div>
              </span>
            </h1>

            <p className="text-[16px] md:text-[18px] text-gray-500 dark:text-gray-400 font-medium tracking-tight max-w-2xl mx-auto leading-relaxed mt-2" data-aos="fade-up" data-aos-delay="300">
              <strong className="text-gray-800 dark:text-gray-200 block mb-1.5">
                DeFix instantly tracks down and resolves stubborn coding errors.
              </strong>
              Powered by Google Gemini AI — paste your broken code, pick a language, and get a flawless fix along with a clear, step-by-step explanation.
            </p>
            {/* Feature badges */}
            <div className="flex items-center justify-center gap-2 flex-wrap pt-1" data-aos="fade-up" data-aos-delay="400">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-wide bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-200/50 dark:border-blue-500/20">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
                Gemini AI
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-wide bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 border border-green-200/50 dark:border-green-500/20">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                10+ Languages
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-wide bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-200/50 dark:border-purple-500/20">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                Instant Fix
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4 pb-2" data-aos="fade-up" data-aos-delay="500">
              <button
                onClick={() => {
                  document.getElementById('code-editor-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-[var(--color-primary-500)] hover:bg-[var(--color-primary-600)] text-white px-7 py-3 rounded-[10px] flex items-center gap-2.5 text-[15px] font-semibold transition-all active:scale-95 shadow-[0_4px_24px_rgba(59,130,246,0.35)] cursor-pointer"
              >
                Start Debugging
                <svg className="w-4 h-4 ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </button>
              <button
                className="bg-[#151515] hover:bg-black text-white px-7 py-3 rounded-[10px] flex items-center gap-2 text-[15px] font-medium transition-all active:scale-95 border border-white/5 shadow-sm cursor-pointer"
              >
                See How It Works
              </button>
            </div>
          </div>

          {/* Features Section */}
          <div className="px-4 w-full flex flex-col items-center" data-aos="fade-up" data-aos-delay="600">
            <div className="text-center mb-6 space-y-1.5 lg:mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                Powerful Features
              </h2>
              <p className="text-[15px] md:text-[16px] text-gray-500 dark:text-gray-400 font-medium">
                Everything you need to debug smarter and learn faster
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 max-w-[1200px] mx-auto">
              {/* Card 1 */}
              <div className="bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 rounded-[16px] p-6 flex flex-col gap-4 hover:border-[var(--color-primary-500)]/40 dark:hover:border-[var(--color-primary-500)]/40 hover:shadow-xl hover:shadow-[var(--color-primary-500)]/5 transition-all duration-300 group">
                <div className="bg-gray-100 dark:bg-white/5 w-10 h-10 rounded-lg flex items-center justify-center group-hover:bg-[var(--color-primary-500)]/10 transition-colors duration-300">
                  <Bug className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-[var(--color-primary-500)] transition-colors duration-300" />
                </div>
                <div>
                  <h3 className="text-gray-900 dark:text-white font-semibold text-[15px] mb-1.5">Error Identification</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-[13px] leading-relaxed">Pinpoints exact lines with issues in your code</p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 rounded-[16px] p-6 flex flex-col gap-4 hover:border-[var(--color-primary-500)]/40 dark:hover:border-[var(--color-primary-500)]/40 hover:shadow-xl hover:shadow-[var(--color-primary-500)]/5 transition-all duration-300 group" data-aos="fade-up" data-aos-delay="100">
                <div className="bg-gray-100 dark:bg-white/5 w-10 h-10 rounded-lg flex items-center justify-center group-hover:bg-[var(--color-primary-500)]/10 transition-colors duration-300">
                  <Zap className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-[var(--color-primary-500)] transition-colors duration-300" />
                </div>
                <div>
                  <h3 className="text-gray-900 dark:text-white font-semibold text-[15px] mb-1.5">Clear Explanations</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-[13px] leading-relaxed">Breaks down errors in simple, understandable language</p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 rounded-[16px] p-6 flex flex-col gap-4 hover:border-[var(--color-primary-500)]/40 dark:hover:border-[var(--color-primary-500)]/40 hover:shadow-xl hover:shadow-[var(--color-primary-500)]/5 transition-all duration-300 group" data-aos="fade-up" data-aos-delay="200">
                <div className="bg-gray-100 dark:bg-white/5 w-10 h-10 rounded-lg flex items-center justify-center group-hover:bg-[var(--color-primary-500)]/10 transition-colors duration-300">
                  <Code2 className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-[var(--color-primary-500)] transition-colors duration-300" />
                </div>
                <div>
                  <h3 className="text-gray-900 dark:text-white font-semibold text-[15px] mb-1.5">Multi-Language</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-[13px] leading-relaxed">Supports JavaScript, Python, Java, C++ and more</p>
                </div>
              </div>

              {/* Card 4 */}
              <div className="bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 rounded-[16px] p-6 flex flex-col gap-4 hover:border-[var(--color-primary-500)]/40 dark:hover:border-[var(--color-primary-500)]/40 hover:shadow-xl hover:shadow-[var(--color-primary-500)]/5 transition-all duration-300 group" data-aos="fade-up" data-aos-delay="300">
                <div className="bg-gray-100 dark:bg-white/5 w-10 h-10 rounded-lg flex items-center justify-center group-hover:bg-[var(--color-primary-500)]/10 transition-colors duration-300">
                  <Shield className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-[var(--color-primary-500)] transition-colors duration-300" />
                </div>
                <div>
                  <h3 className="text-gray-900 dark:text-white font-semibold text-[15px] mb-1.5">Learn & Prevent</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-[13px] leading-relaxed">Teaches you patterns to avoid future mistakes</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-start gap-3 text-red-700 dark:text-red-400">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-sm">Failed to debug code</h3>
              <p className="text-sm opacity-90">{error}</p>
            </div>
          </div>
        )}

        {/* INPUT CODE — Full width on top, with Debug button inside */}
        <div id="code-editor-section" className="h-[300px] lg:h-[340px] relative scroll-mt-20" data-aos="fade-up" data-aos-delay="600">
          <CodeEditor
            value={inputCode}
            onChange={setInputCode}
            selectedLanguage={selectedLanguage}
            onLanguageChange={setSelectedLanguage}
            placeholder={"// Paste your buggy code here...\nfunction calculateTotal(items) {\n  return items.map(i => i.price).reduce((a,b) => a+b)\n}"}
          />
          <button
            onClick={handleDebug}
            disabled={isGenerating || !inputCode.trim()}
            className="absolute bottom-4 right-4 z-10 bg-[var(--color-primary-500)] hover:bg-[var(--color-primary-600)] text-white px-5 py-2 rounded-lg flex items-center gap-2 text-sm font-semibold transition-all active:scale-95 disabled:opacity-40 disabled:active:scale-100 disabled:cursor-not-allowed shadow-lg shadow-[var(--color-primary-500)]/25 cursor-pointer"
          >
            {isGenerating ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Debugging...
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                Debug Code
              </>
            )}
          </button>
        </div>

        {/* RESULTS — Fixed code + Explanation side by side */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5 min-h-[350px] pb-6" data-aos="fade-up" data-aos-delay="700">
          {/* Fixed Code Output */}
          <div className="min-h-[280px] flex flex-col">
            <OutputPanel
              fixedCode={result.fixedCode}
              isGenerating={isGenerating}
            />
          </div>

          {/* Analysis Report */}
          <div className="min-h-[280px] flex flex-col border border-gray-200 dark:border-white/10 rounded-xl overflow-hidden bg-white dark:bg-[#050505] shadow-sm transition-colors duration-200">
            <div className="bg-gray-50/50 dark:bg-white/[0.02] px-5 py-3 border-b border-gray-200 dark:border-white/10 flex justify-between items-center">
              <span className="text-[13px] font-semibold text-gray-800 dark:text-gray-200 tracking-tight flex items-center gap-2 uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary-500)] animate-pulse"></span>
                Analysis Report
              </span>
            </div>
            <div className="flex-1 overflow-auto p-5 md:p-6 relative">
              {isGenerating ? (
                <div className="h-full flex flex-col gap-4 animate-pulse">
                  <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded-md w-3/4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded-md w-full mt-4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded-md w-5/6"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded-md w-11/12"></div>
                  <div className="h-16 bg-gray-200 dark:bg-gray-800 rounded-xl w-full mt-6"></div>
                </div>
              ) : result.explanation ? (
                <div className="prose prose-blue prose-sm dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 leading-relaxed prose-headings:font-bold prose-h1:text-xl prose-h2:text-lg prose-h3:text-base prose-pre:bg-gray-100 dark:prose-pre:bg-white/5 prose-pre:border prose-pre:border-gray-200 dark:prose-pre:border-white/10 prose-code:text-[var(--color-primary-600)] dark:prose-code:text-[var(--color-primary-400)] prose-code:bg-blue-50 dark:prose-code:bg-[var(--color-primary-900)]/20 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none prose-a:text-[var(--color-primary-500)]">
                  <ReactMarkdown>{result.explanation}</ReactMarkdown>
                </div>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                  <div className="w-14 h-14 rounded-full bg-blue-50 dark:bg-white/5 flex items-center justify-center mb-4">
                    <Bot className="w-7 h-7 text-[var(--color-primary-400)] dark:text-[var(--color-primary-500)] opacity-80" />
                  </div>
                  <h4 className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-1">
                    Awaiting Code
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 max-w-[240px]">
                    Submit your code to see the step-by-step analysis.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="py-16 md:py-20 px-4 mt-8 relative z-10" data-aos="fade-up">
          <div className="text-center mb-16 space-y-3">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
              How It Works
            </h2>
            <p className="text-[15px] md:text-[16px] text-gray-500 dark:text-gray-400 font-medium max-w-lg mx-auto">
              Three simple steps from broken code to working solution
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 max-w-[1000px] mx-auto relative pt-4">
            {/* Connecting faint line for desktop */}
            <div className="hidden md:block absolute top-[28%] left-[16%] right-[16%] h-[1px] bg-gradient-to-r from-transparent via-gray-300 dark:via-white/10 to-transparent -z-10"></div>

            {/* Step 1 */}
            <div className="bg-white dark:bg-[#0c0d10] border border-gray-200 dark:border-white/10 rounded-[16px] p-8 md:p-10 flex flex-col items-center text-center relative group hover:border-[var(--color-primary-400)] dark:hover:border-[var(--color-primary-500)]/30 transition-all duration-300 shadow-sm" data-aos="fade-up" data-aos-delay="100">
              <div className="absolute -top-[13px] left-6 bg-white dark:bg-[#0c0d10] px-3 py-0.5 rounded-full border border-gray-200 dark:border-white/10 text-[11px] font-mono font-bold text-[var(--color-primary-500)] group-hover:border-[var(--color-primary-400)] dark:group-hover:border-[var(--color-primary-500)]/30 transition-colors duration-300">
                Step 01
              </div>
              <div className="bg-gray-100 dark:bg-white/5 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[var(--color-primary-500)]/10 group-hover:scale-110 transition-all duration-300">
                <ClipboardCopy className="w-6 h-6 text-gray-500 dark:text-gray-400 group-hover:text-[var(--color-primary-500)] transition-colors duration-300" />
              </div>
              <h3 className="text-gray-900 dark:text-white font-bold text-[17px] mb-3">Paste Your Code</h3>
              <p className="text-gray-500 dark:text-gray-400 text-[14px] leading-relaxed">
                Drop in any code snippet — JavaScript, Python, Java, C++, or any of 15+ supported languages.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white dark:bg-[#0c0d10] border border-gray-200 dark:border-white/10 rounded-[16px] p-8 md:p-10 flex flex-col items-center text-center relative group hover:border-[var(--color-primary-400)] dark:hover:border-[var(--color-primary-500)]/30 transition-all duration-300 shadow-sm" data-aos="fade-up" data-aos-delay="200">
              <div className="absolute -top-[13px] left-6 bg-white dark:bg-[#0c0d10] px-3 py-0.5 rounded-full border border-gray-200 dark:border-white/10 text-[11px] font-mono font-bold text-[var(--color-primary-500)] group-hover:border-[var(--color-primary-400)] dark:group-hover:border-[var(--color-primary-500)]/30 transition-colors duration-300">
                Step 02
              </div>
              <div className="bg-gray-100 dark:bg-white/5 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[var(--color-primary-500)]/10 group-hover:scale-110 transition-all duration-300">
                <Cpu className="w-6 h-6 text-gray-500 dark:text-gray-400 group-hover:text-[var(--color-primary-500)] transition-colors duration-300" />
              </div>
              <h3 className="text-gray-900 dark:text-white font-bold text-[17px] mb-3">AI Scans & Analyzes</h3>
              <p className="text-gray-500 dark:text-gray-400 text-[14px] leading-relaxed">
                Our AI engine scans every line, identifies bugs, syntax errors, and logic issues in seconds.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white dark:bg-[#0c0d10] border border-gray-200 dark:border-white/10 rounded-[16px] p-8 md:p-10 flex flex-col items-center text-center relative group hover:border-[var(--color-primary-400)] dark:hover:border-[var(--color-primary-500)]/30 transition-all duration-300 shadow-sm" data-aos="fade-up" data-aos-delay="300">
              <div className="absolute -top-[13px] left-6 bg-white dark:bg-[#0c0d10] px-3 py-0.5 rounded-full border border-gray-200 dark:border-white/10 text-[11px] font-mono font-bold text-[var(--color-primary-500)] group-hover:border-[var(--color-primary-400)] dark:group-hover:border-[var(--color-primary-500)]/30 transition-colors duration-300">
                Step 03
              </div>
              <div className="bg-[var(--color-primary-500)]/10 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[var(--color-primary-500)]/15 group-hover:scale-110 transition-all duration-300">
                <CheckCircle2 className="w-6 h-6 text-[var(--color-primary-500)]" />
              </div>
              <h3 className="text-gray-900 dark:text-white font-bold text-[17px] mb-3">Get Fixes & Learn</h3>
              <p className="text-gray-500 dark:text-gray-400 text-[14px] leading-relaxed">
                Receive corrected code, clear explanations, and learning tips to avoid the same mistakes.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Section */}
      <footer className="w-full relative z-10 mt-20 overflow-hidden" data-aos="fade-in">
        {/* Gradient accent line at top */}
        <div className="h-[1px] bg-gradient-to-r from-transparent via-[var(--color-primary-500)] to-transparent"></div>

        {/* Giant Typography & Bottom Bar Unified Container */}
        <div className="bg-white/10 backdrop-blur-sm">
          {/* Giant Typography */}
          <div className="relative py-12 md:py-16">
            <div className="w-full flex justify-center overflow-hidden select-none pointer-events-none px-4">
              <h1 className="text-[25vw] md:text-[20vw] leading-[0.85] font-black tracking-[-0.05em] text-[#2255aa]">
                DeFix
              </h1>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="px-4 sm:px-6 lg:px-8 py-5">
            <div className="max-w-[1600px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-[13px] text-gray-400">
                © 2026 DeFix. All rights reserved.
              </span>
              <span className="text-[13px] text-gray-400">
                Built with <span className="text-red-400">♡</span> by <strong className="text-gray-700 font-semibold">DeFix Dev</strong>
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
