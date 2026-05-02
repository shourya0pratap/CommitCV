import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ResumeProvider } from "./context/ResumeContext";
import Builder from "./builder/Builder";
import { motion } from "framer-motion";
import { FileText, Layout, Download, MoveRight } from "lucide-react";

function Home() {
  const features = [
    {
      icon: <Layout className="text-slate-900" size={24} />,
      title: "Live Preview",
      desc: "See your resume update in real-time.",
      span: "col-span-1 md:col-span-2",
    },
    {
      icon: <MoveRight className="text-slate-900" size={24} />,
      title: "Drag & Drop",
      desc: "Fluid reordering.",
      span: "col-span-1",
    },
    {
      icon: <Download className="text-slate-900" size={24} />,
      title: "Perfect PDF",
      desc: "Export to a flawless, single-page A4 format instantly.",
      span: "col-span-1 md:col-span-3",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F7F7F9] px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center z-10 max-w-3xl mb-16"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 text-sm font-semibold text-slate-600 mb-6 shadow-sm">
          <FileText size={16} /> CommitCV
        </div>
        <h1 className="text-6xl md:text-7xl font-bold text-slate-900 tracking-tight mb-6">
          Write less. <br />{" "}
          <span className="text-slate-400">Interview more.</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-2xl mx-auto font-medium">
          Build and download a professional resume in 2 minutes — no login, no
          paywall. Free. Forever.
        </p>
        <Link
          to="/builder"
          className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-colors shadow-lg hover:shadow-xl"
        >
          Start Building
        </Link>
      </motion.div>

      {/* Bento Box Feature Grid */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl"
      >
        {features.map((feat, i) => (
          <div
            key={i}
            className={`p-8 bg-white border border-gray-200 rounded-3xl shadow-sm hover:shadow-md transition-shadow ${feat.span}`}
          >
            <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center mb-6">
              {feat.icon}
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              {feat.title}
            </h3>
            <p className="text-slate-500 font-medium">{feat.desc}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function App() {
  return (
    <ResumeProvider>
      <div className="min-h-screen bg-[#F7F7F9] print:bg-white font-sans text-slate-900">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/builder" element={<Builder />} />
          </Routes>
        </Router>
      </div>
    </ResumeProvider>
  );
}
