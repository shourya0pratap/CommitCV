import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ResumeProvider } from "./context/ResumeContext";
import Builder from "./builder/Builder";

function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 text-center px-4">
      <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500 mb-4">
        CommitCV
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl mb-8">
        The fully accessible, free-forever resume builder. No ads. No paywalls.
        Just clean code and perfect PDFs.
      </p>
      <Link
        to="/builder"
        className="px-8 py-3 bg-white dark:bg-gray-800 text-emerald-500 font-bold rounded-full shadow-lg border border-emerald-500/30 hover:shadow-emerald-500/20 transition-all"
      >
        Start Building →
      </Link>
    </div>
  );
}

export default function App() {
  return (
    <ResumeProvider>
      {/* Wrapper for Dark Mode control via Tailwind */}
      <div className="dark min-h-screen bg-gray-100 dark:bg-gray-950 font-sans text-gray-900 dark:text-gray-100 transition-colors duration-300">
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
