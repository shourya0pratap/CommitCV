import React, { useContext } from "react";
import { ResumeContext } from "../context/ResumeContext";

const Preview = () => {
  const { resumeData } = useContext(ResumeContext);

  return (
    <div className="bg-white shadow-2xl min-h-[11in] w-[8.5in] mx-auto p-12 origin-top scale-90">
      <header className="border-b-4 border-indigo-600 pb-6 mb-8">
        <h1 className="text-4xl font-black text-zinc-900 uppercase tracking-tighter">
          {resumeData.personal.name || "Your Name"}
        </h1>
        <p className="text-lg text-indigo-600 font-medium">
          {resumeData.personal.role || "Professional Title"}
        </p>
      </header>

      {/* Render sections dynamically [cite: 150] */}
      <div className="space-y-6">
        <p className="text-zinc-600 italic">
          Tip: As you type in the editor, this template updates instantly using
          React State.
        </p>
      </div>
    </div>
  );
};

export default Preview;
