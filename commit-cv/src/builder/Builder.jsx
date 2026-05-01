import Editor from "./Editor";
import Preview from "./Preview";
import { Link } from "react-router-dom";

export default function Builder() {
  return (
    <div className="min-h-screen p-4 md:p-8">
      <nav className="flex justify-between items-center mb-8 print:hidden">
        <Link
          to="/"
          className="text-2xl font-bold tracking-tighter text-emerald-500"
        >
          CommitCV.
        </Link>
        <span className="text-sm bg-gray-200 dark:bg-gray-800 px-3 py-1 rounded-full text-gray-600 dark:text-gray-400">
          Auto-saving to local storage ⚡
        </span>
      </nav>

      {/* Grid Layout: Editor on left, Preview on right */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
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
