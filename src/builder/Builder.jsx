import { useContext } from "react";
import Editor from "../components/Editor";
import Preview from "../components/Preview";
import { Link } from "react-router-dom";
import { ResumeContext } from "../context/ResumeContext";
import { FileText, CheckCircle2, Moon, Sun } from "lucide-react";

export default function Builder() {
  const { theme, toggleTheme } = useContext(ResumeContext);

  return (
    <div className="min-h-screen p-4 md:p-8 bg-[#F7F7F9] dark:bg-[#0A0A0A] print:bg-white transition-colors duration-300">
      <nav className="flex justify-between items-center mb-8 print:hidden max-w-[1600px] mx-auto">
        <Link
          to="/"
          className="text-2xl font-extrabold tracking-tighter text-slate-900 dark:text-white flex items-center gap-2"
        >
          <div className="bg-slate-900 dark:bg-white p-1.5 rounded-lg text-white dark:text-slate-900">
            <FileText size={20} />
          </div>
          CommitCV.
        </Link>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#141414] border border-gray-200 dark:border-slate-800 rounded-full shadow-sm text-sm font-semibold text-slate-600 dark:text-slate-400">
            <CheckCircle2 size={16} className="text-emerald-500" /> Auto-saving
          </div>
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-full bg-white dark:bg-[#141414] text-slate-600 dark:text-slate-300 shadow-sm border border-gray-200 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-[#1A1A1A] transition-colors"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </nav>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start max-w-[1600px] mx-auto">
        <section className="print:hidden w-full">
          <Editor />
        </section>
        <section className="flex justify-center w-full overflow-x-auto print:block print:overflow-visible pb-10">
          <Preview />
        </section>
      </div>
    </div>
  );
}
