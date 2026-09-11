import React, { useContext } from "react";
import { ResumeContext } from "../context/ResumeContext";
import { motion } from "framer-motion";
import { Printer } from "lucide-react";

const Preview = React.memo(() => {
  const { resumeData, sectionOrder } = useContext(ResumeContext);

  const handleDownload = () => window.print();

  const SectionHeader = ({ title }) => (
    <h2 className="text-[13px] font-bold uppercase tracking-[0.2em] mb-4 text-slate-800 border-b-2 border-slate-900 pb-1.5">
      {title}
    </h2>
  );

  const sectionComponents = {
    skills:
      resumeData.skills?.length > 0 ? (
        <div key="skills" className="mb-7 break-inside-avoid">
          <SectionHeader title="Technical Skills" />
          <div className="flex flex-wrap gap-2">
            {resumeData.skills.map((skill, index) => (
              <span
                key={index}
                className="px-2.5 py-1 text-slate-700 text-[13px] font-medium border border-slate-300 rounded-md"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      ) : null,

    educations:
      resumeData.educations?.length > 0 ? (
        <div key="educations" className="mb-7">
          <SectionHeader title="Education" />
          <div className="space-y-4">
            {resumeData.educations.map((edu) => (
              <div key={edu.id} className="break-inside-avoid">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-[15px] text-slate-900">
                    {edu.degree}
                  </h3>
                  {edu.duration && (
                    <span className="font-medium text-slate-600 text-[13px] whitespace-nowrap ml-4">
                      {edu.duration}
                    </span>
                  )}
                </div>
                <p className="text-slate-700 text-[14px] font-medium mt-0.5">
                  {edu.institution}
                </p>
                {edu.details && (
                  <p className="text-slate-600 mt-1.5 text-[14px] leading-relaxed whitespace-pre-wrap">
                    {edu.details}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : null,

    experiences:
      resumeData.experiences?.length > 0 ? (
        <div key="experiences" className="mb-7">
          <SectionHeader title="Experience" />
          <div className="space-y-6">
            {resumeData.experiences.map((exp) => (
              <div key={exp.id} className="break-inside-avoid">
                <div className="flex justify-between items-baseline mb-0.5">
                  <h3 className="font-bold text-[15px] text-slate-900">
                    {exp.role}
                  </h3>
                  {exp.duration && (
                    <span className="font-medium text-slate-600 text-[13px] whitespace-nowrap ml-4">
                      {exp.duration}
                    </span>
                  )}
                </div>
                <p className="text-slate-700 font-medium text-[14px]">
                  {exp.company}
                </p>
                <p className="text-slate-600 mt-2 text-[14px] leading-relaxed whitespace-pre-wrap">
                  {exp.details}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : null,

    projects:
      resumeData.projects?.length > 0 ? (
        <div key="projects" className="mb-7">
          <SectionHeader title="Projects" />
          <div className="space-y-6">
            {resumeData.projects.map((proj) => (
              <div key={proj.id} className="break-inside-avoid">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-[15px] text-slate-900">
                    {proj.name}
                  </h3>
                  {proj.tech && (
                    <span className="text-slate-500 text-[13px] font-medium ml-4 italic">
                      {proj.tech}
                    </span>
                  )}
                </div>
                <p className="text-slate-600 mt-1.5 text-[14px] leading-relaxed whitespace-pre-wrap">
                  {proj.details}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : null,

    achievements:
      resumeData.achievements?.length > 0 ? (
        <div key="achievements" className="mb-7">
          <SectionHeader title="Achievements" />
          <div className="space-y-4">
            {resumeData.achievements.map((achievement) => (
              <div key={achievement.id} className="break-inside-avoid">
                <h3 className="font-bold text-[15px] text-slate-900">
                  {achievement.title}
                </h3>
                {achievement.details && (
                  <p className="text-slate-600 mt-1 text-[14px] leading-relaxed whitespace-pre-wrap">
                    {achievement.details}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : null,
  };

  // Helper to clean up URLs for display and format hrefs
  const formatContact = (value, type) => {
    if (!value) return null;

    let href = value;
    let display = value;

    if (type === "email") {
      href = `mailto:${value}`;
    } else if (type === "phone") {
      href = `tel:${value.replace(/\s+/g, "")}`;
    } else {
      // Ensure social links have https:// for the actual hyperlink
      if (!href.startsWith("http")) {
        href = `https://${value}`;
      }
      // Clean up the display text (removes https://, www., and trailing slashes)
      display = value.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
    }

    return { href, display };
  };
  const contactLinks = [
    formatContact(resumeData.personal?.email, "email"),
    formatContact(resumeData.personal?.phone, "phone"),
    formatContact(resumeData.personal?.linkedin, "link"),
    formatContact(resumeData.personal?.github, "link"),
  ].filter(Boolean);

  return (
    <div className="flex flex-col items-center w-full">
      <button
        onClick={handleDownload}
        className="mb-6 px-6 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 print:hidden flex items-center gap-2"
      >
        <Printer size={18} /> Export PDF
      </button>

      <motion.div
        layout
        className="w-[210mm] min-w-[210mm] min-h-[297mm] shrink-0 box-border bg-white text-slate-900 p-12 sm:p-[20mm] shadow-xl ring-1 ring-slate-900/5 print:shadow-none print:ring-0 print:p-[20mm] print:m-0 print:min-h-0 mx-auto"
      >
        <header className="pb-6 mb-6 text-center break-inside-avoid">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-1">
            {resumeData.personal?.name}
          </h1>
          {resumeData.personal?.role && (
            <p className="text-[16px] text-slate-700 font-medium mb-3">
              {resumeData.personal.role}
            </p>
          )}

          {contactLinks.length > 0 && (
            <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-1 text-[13px] text-slate-600">
              {contactLinks.map((link, index) => (
                <React.Fragment key={index}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-slate-900 transition-colors decoration-slate-300 hover:decoration-slate-900 underline-offset-2"
                  >
                    {link.display}
                  </a>
                  {index < contactLinks.length - 1 && (
                    <span className="text-slate-300">•</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          )}
        </header>

        {sectionOrder.map((sectionId) => sectionComponents[sectionId])}
      </motion.div>
    </div>
  );
});

export default Preview;
