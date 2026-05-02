import { useContext, useState } from "react";
import { ResumeContext } from "../context/ResumeContext";
import { Reorder } from "framer-motion";
import {
  User,
  GraduationCap,
  Briefcase,
  Wrench,
  Plus,
  X,
  GripVertical,
} from "lucide-react";

const GithubIcon = ({ size = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function Editor() {
  const { resumeData, setResumeData, fetchGithubProfile, isLoading, error } =
    useContext(ResumeContext);
  const [newSkill, setNewSkill] = useState("");
  const [githubUser, setGithubUser] = useState("");

  const handleReorder = (newOrder) =>
    setResumeData((prev) => ({ ...prev, skills: newOrder }));
  const addSkill = (e) => {
    e.preventDefault();
    if (!newSkill.trim()) return;
    setResumeData((prev) => ({
      ...prev,
      skills: [...prev.skills, newSkill.trim()],
    }));
    setNewSkill("");
  };
  const removeSkill = (skillToRemove) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skillToRemove),
    }));
  };
  const updateField = (section, field, value) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };
  const handleGithubFetch = (e) => {
    e.preventDefault();
    fetchGithubProfile(githubUser);
  };

  // Generic Array Handlers
  const updateArrayItem = (arrayName, id, field, value) => {
    setResumeData((prev) => ({
      ...prev,
      [arrayName]: prev[arrayName].map((item) =>
        item.id === id ? { ...item, [field]: value } : item,
      ),
    }));
  };
  const addArrayItem = (arrayName, emptyTemplate) => {
    setResumeData((prev) => ({
      ...prev,
      [arrayName]: [...prev[arrayName], { id: Date.now(), ...emptyTemplate }],
    }));
  };
  const removeArrayItem = (arrayName, id) => {
    setResumeData((prev) => ({
      ...prev,
      [arrayName]: prev[arrayName].filter((item) => item.id !== id),
    }));
  };

  // Sleek Dark Mode Class Variables
  const inputStyles =
    "w-full p-3.5 bg-[#F7F7F9] dark:bg-black/40 border border-gray-100 dark:border-slate-800 rounded-2xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 mb-3 focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-500 outline-none transition-all font-medium";
  const bentoCard =
    "bg-white dark:bg-[#141414] p-6 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-sm transition-colors";
  const sectionTitle =
    "text-lg font-bold text-slate-900 dark:text-white mb-5 flex items-center gap-2";

  return (
    <div className="h-[85vh] overflow-y-auto pr-2 pb-10 custom-scrollbar space-y-4 print:hidden">
      {/* GitHub Auto-fill */}
      <div
        className={`w-full ${bentoCard} !bg-slate-900 dark:!bg-[#1A1A1A] !border-transparent text-white`}
      >
        <h3 className="text-sm font-bold text-slate-300 dark:text-slate-400 mb-3 uppercase tracking-wider flex items-center gap-2">
          <GithubIcon size={18} /> Sync with GitHub
        </h3>
        <form onSubmit={handleGithubFetch} className="flex gap-2">
          <input
            className="flex-1 p-3.5 rounded-2xl bg-slate-800 dark:bg-black/50 border-none text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-white"
            placeholder="Enter username..."
            value={githubUser}
            onChange={(e) => setGithubUser(e.target.value)}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-3.5 bg-white text-slate-900 rounded-2xl font-bold hover:bg-gray-100 disabled:opacity-50 transition-colors"
          >
            {isLoading ? "Syncing..." : "Sync"}
          </button>
        </form>
        {error && (
          <p className="text-red-400 text-sm mt-2 font-medium">{error}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Personal Details */}
        <div className={`col-span-1 md:col-span-2 ${bentoCard}`}>
          <h3 className={sectionTitle}>
            <User size={20} className="text-slate-400 dark:text-slate-500" />{" "}
            Personal
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input
              className={inputStyles}
              value={resumeData.personal.name}
              onChange={(e) => updateField("personal", "name", e.target.value)}
              placeholder="Full Name"
            />
            <input
              className={inputStyles}
              value={resumeData.personal.role}
              onChange={(e) => updateField("personal", "role", e.target.value)}
              placeholder="Role/Title"
            />
            <input
              className={inputStyles}
              value={resumeData.personal.email}
              onChange={(e) => updateField("personal", "email", e.target.value)}
              placeholder="Email"
            />
          </div>
        </div>
      </div>

      {/* Educations */}
      <div className={bentoCard}>
        <div className="flex justify-between items-center mb-5">
          <h3 className={sectionTitle} style={{ marginBottom: 0 }}>
            <GraduationCap
              size={20}
              className="text-slate-400 dark:text-slate-500"
            />{" "}
            Education
          </h3>
          <button
            onClick={() =>
              addArrayItem("educations", {
                institution: "",
                degree: "",
                duration: "",
                details: "",
              })
            }
            className="text-sm flex items-center gap-1 bg-[#F7F7F9] dark:bg-black/40 text-slate-900 dark:text-white px-4 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors font-bold border border-gray-100 dark:border-slate-800"
          >
            <Plus size={16} /> Add Education
          </button>
        </div>

        <div className="space-y-4">
          {resumeData.educations.map((edu, index) => (
            <div
              key={edu.id}
              className="p-5 bg-[#F7F7F9] dark:bg-black/40 border border-gray-100 dark:border-slate-800 rounded-2xl relative group transition-colors"
            >
              {resumeData.educations.length > 1 && (
                <button
                  onClick={() => removeArrayItem("educations", edu.id)}
                  className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition-colors"
                >
                  <X size={20} />
                </button>
              )}
              <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 mb-4 uppercase tracking-wider">
                Education {index + 1}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                <input
                  className={`${inputStyles} !mb-0`}
                  value={edu.institution}
                  onChange={(e) =>
                    updateArrayItem(
                      "educations",
                      edu.id,
                      "institution",
                      e.target.value,
                    )
                  }
                  placeholder="Institution (e.g., Harvard)"
                />
                <input
                  className={`${inputStyles} !mb-0`}
                  value={edu.degree}
                  onChange={(e) =>
                    updateArrayItem(
                      "educations",
                      edu.id,
                      "degree",
                      e.target.value,
                    )
                  }
                  placeholder="Degree/Course"
                />
              </div>
              <input
                className={inputStyles}
                value={edu.duration}
                onChange={(e) =>
                  updateArrayItem(
                    "educations",
                    edu.id,
                    "duration",
                    e.target.value,
                  )
                }
                placeholder="Duration (e.g., 2024 - 2028)"
              />
              <textarea
                className={inputStyles}
                value={edu.details}
                onChange={(e) =>
                  updateArrayItem(
                    "educations",
                    edu.id,
                    "details",
                    e.target.value,
                  )
                }
                placeholder="Skills learned, coursework, or GPA..."
                rows="2"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div className={bentoCard}>
        <h3 className={sectionTitle}>
          <Wrench size={20} className="text-slate-400 dark:text-slate-500" />{" "}
          Skills
        </h3>
        <form onSubmit={addSkill} className="flex gap-2 mb-6">
          <input
            className={inputStyles}
            style={{ marginBottom: 0 }}
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="Add a new skill..."
          />
          <button
            type="submit"
            className="px-5 py-3.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-bold hover:bg-slate-800 dark:hover:bg-gray-200 transition-colors"
          >
            <Plus size={20} />
          </button>
        </form>
        <Reorder.Group
          axis="y"
          values={resumeData.skills}
          onReorder={handleReorder}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2"
        >
          {resumeData.skills.map((skill) => (
            <Reorder.Item
              key={skill}
              value={skill}
              className="flex justify-between items-center p-3 bg-[#F7F7F9] dark:bg-black/40 border border-gray-100 dark:border-slate-800 rounded-xl cursor-grab active:cursor-grabbing hover:border-slate-300 dark:hover:border-slate-600 transition-colors"
            >
              <span className="text-slate-700 dark:text-slate-300 font-semibold flex items-center gap-2 text-sm">
                <GripVertical size={14} className="text-slate-400" /> {skill}
              </span>
              <button
                onClick={() => removeSkill(skill)}
                className="text-slate-400 hover:text-red-500 transition-colors"
              >
                <X size={16} />
              </button>
            </Reorder.Item>
          ))}
        </Reorder.Group>
      </div>

      {/* Experiences */}
      <div className={bentoCard}>
        <div className="flex justify-between items-center mb-5">
          <h3 className={sectionTitle} style={{ marginBottom: 0 }}>
            <Briefcase
              size={20}
              className="text-slate-400 dark:text-slate-500"
            />{" "}
            Experience
          </h3>
          <button
            onClick={() =>
              addArrayItem("experiences", {
                company: "",
                role: "",
                details: "",
              })
            }
            className="text-sm flex items-center gap-1 bg-[#F7F7F9] dark:bg-black/40 text-slate-900 dark:text-white px-4 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors font-bold border border-gray-100 dark:border-slate-800"
          >
            <Plus size={16} /> Add Role
          </button>
        </div>

        <div className="space-y-4">
          {resumeData.experiences.map((exp, index) => (
            <div
              key={exp.id}
              className="p-5 bg-[#F7F7F9] dark:bg-black/40 border border-gray-100 dark:border-slate-800 rounded-2xl relative group transition-colors"
            >
              {resumeData.experiences.length > 1 && (
                <button
                  onClick={() => removeArrayItem("experiences", exp.id)}
                  className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition-colors"
                >
                  <X size={20} />
                </button>
              )}
              <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 mb-4 uppercase tracking-wider">
                Role {index + 1}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                <input
                  className={`${inputStyles} !mb-0`}
                  value={exp.company}
                  onChange={(e) =>
                    updateArrayItem(
                      "experiences",
                      exp.id,
                      "company",
                      e.target.value,
                    )
                  }
                  placeholder="Company"
                />
                <input
                  className={`${inputStyles} !mb-0`}
                  value={exp.role}
                  onChange={(e) =>
                    updateArrayItem(
                      "experiences",
                      exp.id,
                      "role",
                      e.target.value,
                    )
                  }
                  placeholder="Job Title"
                />
              </div>
              <textarea
                className={inputStyles}
                value={exp.details}
                onChange={(e) =>
                  updateArrayItem(
                    "experiences",
                    exp.id,
                    "details",
                    e.target.value,
                  )
                }
                placeholder="Describe your achievements..."
                rows="3"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
