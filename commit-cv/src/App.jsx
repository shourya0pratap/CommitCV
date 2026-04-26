import React from "react";
import { ResumeProvider } from "./context/ResumeContext";
import Editor from "./components/Editor";
import Preview from "./components/Preview";
import { FileText, Download } from "lucide-react";
import { motion } from "framer-motion";

function App() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <ResumeProvider>
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col print:bg-white">
        <header className="h-16 border-b border-zinc-200 flex items-center justify-between px-6 bg-white print:hidden">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-600 rounded-lg text-white">
              <FileText size={20} />
            </div>
            <h1 className="text-xl font-bold tracking-tight">CommitCV</h1>
          </div>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 bg-zinc-900 text-white px-4 py-2 rounded-md hover:bg-zinc-800 transition"
          >
            <Download size={18} /> Export PDF
          </button>
        </header>

        <main className="flex-1 flex overflow-hidden print:block print:overflow-visible">
          <motion.aside
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="w-1/2 border-r border-zinc-200 overflow-y-auto p-8 print:hidden"
          >
            <Editor />
          </motion.aside>

          <section className="w-1/2 bg-zinc-100 overflow-y-auto p-12 print:w-full print:p-0 print:bg-white print:overflow-visible">
            <Preview />
          </section>
        </main>
      </div>
    </ResumeProvider>
  );
}

export default App;
