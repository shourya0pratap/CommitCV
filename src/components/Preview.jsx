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
        <h2 className="text-[13px] font-bold uppercase tracking-widest mb-3 text-slate-400 border-b border-slate-200 pb-2">
          Technical Skills
        </h2>
        <div className="flex flex-wrap gap-2">
          {resumeData.skills.map((skill, index) => (
            <span
              key={index}
              className="px-2.5 py-1 bg-slate-50 text-slate-700 rounded-md text-[13px] font-semibold border border-slate-200"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    ),
    educations: (
      <div key="educations" className="mb-6">
        <h2 className="text-[13px] font-bold uppercase tracking-widest mb-3 text-slate-400 border-b border-slate-200 pb-2">
          Education
        </h2>
        <div className="space-y-4">
          {resumeData.educations.map((edu) => (
            <div key={edu.id} className="break-inside-avoid">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-[15px] text-slate-900">
                    {edu.degree}
                  </h3>
                  <p className="text-slate-600 text-[14px] mt-0.5 font-medium">
                    {edu.institution}
                  </p>
                </div>
                {edu.duration && (
                  <span className="font-bold text-slate-900 text-[13px] whitespace-nowrap ml-4 bg-slate-100 px-2 py-1 rounded">
                    {edu.duration}
                  </span>
                )}
              </div>
              {edu.details && (
                <p className="text-slate-700 mt-2 text-[14px] leading-relaxed whitespace-pre-wrap">
                  {edu.details}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    ),

    experiences:
      resumeData.experiences.length > 0 ? (
        <div key="experiences" className="mb-6">
          <h2 className="text-[13px] font-bold uppercase tracking-widest mb-3 text-slate-400 border-b border-slate-200 pb-2">
            Experience
          </h2>
          <div className="space-y-5">
            {resumeData.experiences.map((exp) => (
              <div key={exp.id} className="break-inside-avoid">
                <h3 className="font-bold text-[15px] text-slate-900">
                  {exp.role}{" "}
                  <span className="text-slate-500 font-medium">
                    at {exp.company}
                  </span>
                </h3>
                <p className="text-slate-700 mt-1.5 text-[14px] leading-relaxed whitespace-pre-wrap">
                  {exp.details}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : null,

    projects:
      resumeData.projects && resumeData.projects.length > 0 ? (
        <div key="projects" className="mb-6">
          <h2 className="text-[13px] font-bold uppercase tracking-widest mb-3 text-slate-400 border-b border-slate-200 pb-2">
            Projects
          </h2>
          <div className="space-y-5">
            {resumeData.projects.map((proj) => (
              <div key={proj.id} className="break-inside-avoid">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-[15px] text-slate-900">
                    {proj.name}
                  </h3>
                  {proj.tech && (
                    <span className="text-slate-600 text-[13px] font-medium ml-4 text-right">
                      {proj.tech}
                    </span>
                  )}
                </div>
                <p className="text-slate-700 mt-1.5 text-[14px] leading-relaxed whitespace-pre-wrap">
                  {proj.details}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : null,
  };

  return (
    <div className="flex flex-col items-center w-full">
      <button
        onClick={handleDownload}
        className="mb-6 px-8 py-3.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 print:hidden flex items-center gap-2"
      >
        <Printer size={20} /> Export to PDF
      </button>

      {/* The Preview canvas deliberately forces light mode colors so the PDF printout is correct */}
      <motion.div
        layout
        className="w-[210mm] min-w-[210mm] min-h-[297mm] shrink-0 box-border bg-white text-slate-900 p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 rounded-sm print:shadow-none print:border-none print:p-10 print:m-0 print:min-h-0 mx-auto"
      >
        <div className="pb-6 mb-8 text-center break-inside-avoid">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
            {resumeData.personal.name}
          </h1>
          <p className="text-lg text-slate-500 font-semibold mt-2">
            {resumeData.personal.role}
          </p>
          <p className="text-sm text-slate-400 mt-1">
            {resumeData.personal.email}
          </p>
        </div>
        {sectionOrder.map((sectionId) => sectionComponents[sectionId])}
      </motion.div>
    </div>
  );
});

export default Preview;
