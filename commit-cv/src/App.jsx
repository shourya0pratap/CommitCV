import React from "react";
import { ResumeProvider } from "./context/ResumeContext";
import Editor from "./components/Editor";
import Preview from "./components/Preview";
import { LayoutPanelLeft, FileText, Download } from "lucide-react";
import { motion } from "framer-motion";

function App() {
  return (
    <ResumeProvider>
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col">
        {/* Header Section */}
        <header className="h-16 border-b border-zinc-200 flex items-center justify-between px-6 bg-white">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-600 rounded-lg text-white">
              <FileText size={20} />
            </div>
            <h1 className="text-xl font-bold tracking-tight">CommitCV</h1>
          </div>
          <button className="flex items-center gap-2 bg-zinc-900 text-white px-4 py-2 rounded-md hover:bg-zinc-800 transition">
            <Download size={18} /> Export PDF
          </button>
        </header>

        {/* Main Content: Split View */}
        <main className="flex-1 flex overflow-hidden">
          <motion.aside
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="w-1/2 border-r border-zinc-200 overflow-y-auto p-8"
          >
            <Editor />
          </motion.aside>

          <section className="w-1/2 bg-zinc-100 overflow-y-auto p-12">
            <Preview />
          </section>
        </main>
      </div>
    </ResumeProvider>
  );
}

export default App;
