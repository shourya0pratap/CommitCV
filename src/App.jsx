import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ResumeProvider, ResumeContext } from "./context/ResumeContext";
import Builder from "./builder/Builder";
import { useContext } from "react";
import { motion } from "framer-motion";
import { FileText, Layout, Download, Zap } from "lucide-react";

function Home() {
  const features = [
    {
      icon: <Layout className="text-emerald-500" size={24} />,
      title: "Live Preview",
      desc: "See your resume update in real-time as you type.",
    },
    {
      icon: <Zap className="text-emerald-500" size={24} />,
      title: "Drag & Drop",
      desc: "Easily reorder your skills with fluid animations.",
    },
    {
      icon: <Download className="text-emerald-500" size={24} />,
      title: "Perfect PDF",
      desc: "Export to a flawless, single-page A4 format instantly.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-950 px-4 relative overflow-hidden transition-colors">
      {/* Background decoration */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-emerald-500/10 dark:bg-emerald-500/5 blur-3xl rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-cyan-500/10 dark:bg-cyan-500/5 blur-3xl rounded-full" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center z-10 max-w-3xl"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <FileText className="text-emerald-500" size={48} />
          <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500 tracking-tight">
            CommitCV
          </h1>
        </div>

        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
          The fully accessible, open-source resume builder. No ads. No paywalls.
          Just clean code and perfect PDFs.
        </p>

        <Link
          to="/builder"
          className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold rounded-full shadow-xl hover:scale-105 transition-transform"
        >
          Start Building <Zap size={18} />
        </Link>
      </motion.div>

      {/* Feature Cards Grid */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 z-10 max-w-5xl w-full"
      >
        {features.map((feat, i) => (
          <div
            key={i}
            className="p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-500/10 rounded-xl flex items-center justify-center mb-4">
              {feat.icon}
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {feat.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">{feat.desc}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function ThemedApp() {
  const { theme } = useContext(ResumeContext);
  return (
    <div
      className={`${theme} min-h-screen bg-gray-100 dark:bg-gray-950 print:bg-white font-sans text-gray-900 dark:text-gray-100 transition-colors duration-300`}
    >
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/builder" element={<Builder />} />
        </Routes>
      </Router>
    </div>
  );
}

export default function App() {
  return (
    <ResumeProvider>
      <ThemedApp />
    </ResumeProvider>
  );
}
