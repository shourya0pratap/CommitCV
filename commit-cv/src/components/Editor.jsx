import React, { useContext } from "react";
import { ResumeContext } from "../context/ResumeContext";
import { User, Briefcase, GraduationCap } from "lucide-react";

const Editor = () => {
  const { resumeData, updatePersonal } = useContext(ResumeContext);

  return (
    <div className="space-y-8 max-w-xl mx-auto">
      <section>
        <div className="flex items-center gap-2 mb-4 text-zinc-500">
          <User size={18} />
          <h2 className="font-semibold uppercase tracking-wider text-sm">
            Personal Info
          </h2>
        </div>
        <div className="grid gap-4">
          <input
            className="w-full p-3 rounded-lg border border-zinc-200 focus:ring-2 focus:ring-indigo-500 outline-none"
            placeholder="Full Name"
            value={resumeData.personal.name}
            onChange={(e) => updatePersonal("name", e.target.value)}
          />
          <input
            className="w-full p-3 rounded-lg border border-zinc-200 focus:ring-2 focus:ring-indigo-500 outline-none"
            placeholder="Role (e.g. Software Engineer)"
            value={resumeData.personal.role}
            onChange={(e) => updatePersonal("role", e.target.value)}
          />
        </div>
      </section>

      {/* Add more sections for Experience and Education here [cite: 147] */}
    </div>
  );
};

export default Editor;
