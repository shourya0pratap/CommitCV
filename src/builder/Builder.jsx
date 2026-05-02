import { useContext } from "react";
import Editor from "../components/Editor";
import Preview from "../components/Preview";
import { Link } from "react-router-dom";
import { ResumeContext } from "../context/ResumeContext";
import { FileText, Sun, Moon, CloudLightning } from "lucide-react";

export default function Builder() {
  const { theme, toggleTheme } = useContext(ResumeContext);

  return (
    <div className="min-h-screen p-4 md:p-8">
      <nav className="flex justify-between items-center mb-8 print:hidden max-w-[1600px] mx-auto">
        <Link
          to="/"
          className="text-2xl font-bold tracking-tighter text-emerald-500 flex items-center gap-2"
        >
          <FileText size={28} /> CommitCV.
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-sm bg-gray-200 dark:bg-gray-800 px-3 py-1.5 rounded-full text-gray-600 dark:text-gray-400 hidden sm:flex items-center gap-2 font-medium">
            <CloudLightning size={16} className="text-emerald-500" />{" "}
            Auto-saving
          </span>
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-full bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow-sm border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start max-w-[1600px] mx-auto">
        <section className="print:hidden">
          <Editor />
        </section>
        <section className="flex justify-center overflow-x-auto print:block print:overflow-visible">
          <Preview />
        </section>
      </div>
    </div>
  );
}
