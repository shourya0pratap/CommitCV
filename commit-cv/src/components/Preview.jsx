import React, { useContext } from "react";
import { ResumeContext } from "../context/ResumeContext";

const Preview = () => {
  const { resumeData } = useContext(ResumeContext);

  return (
    <div className="bg-white shadow-2xl min-h-[11in] w-[8.5in] mx-auto p-12 origin-top scale-90 print:scale-100 print:shadow-none print:w-full print:m-0 print:p-0">
      <header className="border-b-4 border-indigo-600 pb-6 mb-8">
        <h1 className="text-4xl font-black text-zinc-900 uppercase tracking-tighter">
          {resumeData.personal.name || "Your Name"}
        </h1>
        <p className="text-lg text-indigo-600 font-medium">
          {resumeData.personal.role || "Professional Title"}
        </p>
      </header>

      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-bold text-zinc-800 uppercase border-b-2 border-zinc-200 mb-4 pb-1">
            Experience
          </h2>
          {resumeData.experience.length === 0 ? (
            <p className="text-zinc-500 italic">No experience added yet.</p>
          ) : (
            resumeData.experience.map((exp, idx) => (
              <div key={idx} className="mb-4">
                <h3 className="font-semibold text-zinc-900">{exp.title}</h3>
                <p className="text-sm text-indigo-600 font-medium">
                  {exp.company}
                </p>
              </div>
            ))
          )}
        </section>
      </div>
    </div>
  );
};

export default Preview;
