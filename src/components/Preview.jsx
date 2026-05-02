import React, { useContext } from "react";
import { ResumeContext } from "../context/ResumeContext";
import { motion } from "framer-motion";
import { Printer } from "lucide-react";

const Preview = React.memo(() => {
  const { resumeData, sectionOrder } = useContext(ResumeContext);

  const handleDownload = () => window.print();

  const sectionComponents = {
    skills: (
      <div key="skills" className="mb-6 break-inside-avoid">
        <h2 className="text-lg font-bold uppercase tracking-wider mb-2 text-gray-800 border-b border-gray-200 pb-1">
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
    ),
    education: (
      <div key="education" className="mb-6 break-inside-avoid">
        <h2 className="text-lg font-bold uppercase tracking-wider mb-2 text-gray-800 border-b border-gray-200 pb-1">
          Education
        </h2>
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg text-gray-900">
              {resumeData.education.degree}
            </h3>
            <p className="text-gray-600">{resumeData.education.institution}</p>
          </div>
          <span className="font-bold text-emerald-600 whitespace-nowrap ml-4">
            {resumeData.education.score}
          </span>
        </div>
      </div>
    ),
    experiences: (
      <div key="experiences" className="mb-6">
        <h2 className="text-lg font-bold uppercase tracking-wider mb-3 text-gray-800 border-b border-gray-200 pb-1">
          Experience
        </h2>
        <div className="space-y-4">
          {resumeData.experiences.map((exp) => (
            <div key={exp.id} className="break-inside-avoid">
              <h3 className="font-semibold text-lg text-gray-900">
                {exp.role}{" "}
                <span className="text-gray-500 font-normal">
                  at {exp.company}
                </span>
              </h3>
              <p className="text-gray-700 mt-1 text-sm leading-relaxed whitespace-pre-wrap">
                {exp.details}
              </p>
            </div>
          ))}
        </div>
      </div>
    ),
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={handleDownload}
        className="mb-6 px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-full shadow-lg hover:shadow-emerald-500/25 transition-all transform hover:-translate-y-1 print:hidden flex items-center gap-2"
      >
        <Printer size={20} /> Export to PDF
      </button>
      {/* 
        CRITICAL FIXES: 
        1. Added min-w-[210mm] and shrink-0 to prevent flexbox from squishing it.
        2. Added box-border so padding doesn't increase total width.
      */}
      <motion.div
        layout
        className="w-[210mm] min-w-[210mm] min-h-[297mm] shrink-0 box-border bg-white text-black p-10 shadow-2xl rounded-sm print:shadow-none print:p-10 print:m-0 print:min-h-0 mx-auto"
      >
        {/* Header */}
        <div className="pb-4 mb-6 text-center break-inside-avoid">
          <h1 className="text-4xl font-extrabold uppercase tracking-tight text-gray-900">
            {resumeData.personal.name}
          </h1>
          <p className="text-xl text-emerald-600 font-medium mt-1">
            {resumeData.personal.role}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            {resumeData.personal.email}
          </p>
        </div>

        {/* Dynamically Ordered Sections */}
        {sectionOrder.map((sectionId) => sectionComponents[sectionId])}
      </motion.div>
    </div>
  );
});

export default Preview;
