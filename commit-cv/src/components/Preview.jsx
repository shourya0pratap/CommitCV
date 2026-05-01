import { useContext } from "react";
import { ResumeContext } from "./ResumeContext";
import { motion } from "framer-motion";

export default function Preview() {
  const { resumeData } = useContext(ResumeContext);

  const handleDownload = () => {
    window.print(); // Triggers the browser's native PDF export
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={handleDownload}
        className="mb-4 px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-lg shadow-lg transition-transform transform hover:scale-105 print:hidden"
      >
        Export to PDF 📄
      </button>

      {/* Framer Motion for smooth entrance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[210mm] min-h-[297mm] bg-white text-black p-10 shadow-2xl rounded-sm print:shadow-none print:p-0 print:m-0 print:w-full"
      >
        {/* Header */}
        <div className="border-b-2 border-gray-300 pb-4 mb-6">
          <h1 className="text-4xl font-extrabold uppercase tracking-tight">
            {resumeData.personal.name}
          </h1>
          <p className="text-xl text-emerald-600 font-medium mt-1">
            {resumeData.personal.role}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            {resumeData.personal.email}
          </p>
        </div>

        {/* Skills */}
        <div className="mb-6">
          <h2 className="text-lg font-bold uppercase tracking-wider mb-2 text-gray-800">
            Technical Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {resumeData.skills.map((skill, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm font-medium border border-gray-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="mb-6">
          <h2 className="text-lg font-bold uppercase tracking-wider mb-2 text-gray-800">
            Education
          </h2>
          <div className="flex justify-between items-end">
            <div>
              <h3 className="font-semibold text-lg">
                {resumeData.education.degree}
              </h3>
              <p className="text-gray-600">
                {resumeData.education.institution}
              </p>
            </div>
            <span className="font-bold text-emerald-600">
              {resumeData.education.score}
            </span>
          </div>
        </div>

        {/* Experience */}
        <div className="mb-6">
          <h2 className="text-lg font-bold uppercase tracking-wider mb-2 text-gray-800">
            Experience
          </h2>
          <h3 className="font-semibold text-lg">
            {resumeData.experience.role}{" "}
            <span className="text-gray-500 font-normal">
              at {resumeData.experience.company}
            </span>
          </h3>
          <p className="text-gray-700 mt-2 text-sm leading-relaxed">
            {resumeData.experience.details}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
