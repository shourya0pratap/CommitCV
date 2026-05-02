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

const GithubIcon = ({ size = 24, className = "" }) => (
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
    className={className}
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
  const updateExperience = (id, field, value) => {
    setResumeData((prev) => ({
      ...prev,
      experiences: prev.experiences.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp,
      ),
    }));
  };
  const addExperience = () => {
    setResumeData((prev) => ({
      ...prev,
      experiences: [
        ...prev.experiences,
        { id: Date.now(), company: "", role: "", details: "" },
      ],
    }));
  };
  const removeExperience = (id) => {
    setResumeData((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((exp) => exp.id !== id),
    }));
  };
  const handleGithubFetch = (e) => {
    e.preventDefault();
    fetchGithubProfile(githubUser);
  };

  const inputStyles =
    "w-full p-2.5 border rounded-lg dark:bg-gray-900 dark:border-gray-700 dark:text-white mb-3 focus:ring-2 focus:ring-emerald-500 outline-none transition-shadow";

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl h-[85vh] overflow-y-auto print:hidden space-y-8 border border-gray-100 dark:border-gray-700 custom-scrollbar">
      {/* GitHub Auto-fill */}
      <div className="bg-emerald-50 dark:bg-emerald-500/10 p-5 rounded-xl border border-emerald-100 dark:border-emerald-500/20">
        <h3 className="text-sm font-bold text-emerald-800 dark:text-emerald-400 mb-3 uppercase flex items-center gap-2">
          <GithubIcon size={18} /> Auto-fill from GitHub
        </h3>
        <form onSubmit={handleGithubFetch} className="flex gap-2">
          <input
            className="flex-1 p-2.5 rounded-lg border border-emerald-200 dark:border-emerald-500/30 dark:bg-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="GitHub Username..."
            value={githubUser}
            onChange={(e) => setGithubUser(e.target.value)}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-5 py-2.5 bg-emerald-600 text-white rounded-lg font-bold hover:bg-emerald-700 disabled:opacity-50 transition-colors"
          >
            {isLoading ? "Fetching..." : "Fetch"}
          </button>
        </form>
        {error && (
          <p className="text-red-500 text-sm mt-2 font-medium">{error}</p>
        )}
      </div>

      {/* Personal Details */}
      <section>
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2 border-b dark:border-gray-700 pb-2">
          <User size={22} className="text-emerald-500" /> Personal Details
        </h3>
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
      </section>

      {/* Education */}
      <section>
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2 border-b dark:border-gray-700 pb-2">
          <GraduationCap size={22} className="text-emerald-500" /> Education
        </h3>
        <input
          className={inputStyles}
          value={resumeData.education.institution}
          onChange={(e) =>
            updateField("education", "institution", e.target.value)
          }
          placeholder="Institution (e.g., KR Mangalam University)"
        />
        <input
          className={inputStyles}
          value={resumeData.education.degree}
          onChange={(e) => updateField("education", "degree", e.target.value)}
          placeholder="Degree"
        />
        <input
          className={inputStyles}
          value={resumeData.education.score}
          onChange={(e) => updateField("education", "score", e.target.value)}
          placeholder="Score"
        />
      </section>

      {/* Skills */}
      <section>
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2 border-b dark:border-gray-700 pb-2">
          <Wrench size={22} className="text-emerald-500" /> Skills
        </h3>
        <form onSubmit={addSkill} className="flex gap-2 mb-4">
          <input
            className="flex-1 p-2.5 border rounded-lg dark:bg-gray-900 dark:border-gray-700 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="Add a skill..."
          />
          <button
            type="submit"
            className="px-4 py-2 bg-gray-800 dark:bg-gray-700 text-white rounded-lg font-bold hover:bg-gray-900 dark:hover:bg-gray-600 transition-colors"
          >
            <Plus size={20} />
          </button>
        </form>
        <Reorder.Group
          axis="y"
          values={resumeData.skills}
          onReorder={handleReorder}
          className="space-y-2"
        >
          {resumeData.skills.map((skill) => (
            <Reorder.Item
              key={skill}
              value={skill}
              className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-900 border dark:border-gray-700 rounded-lg cursor-grab active:cursor-grabbing hover:border-emerald-500 transition-colors"
            >
              <span className="dark:text-white font-medium flex items-center gap-3">
                <GripVertical size={16} className="text-gray-400" /> {skill}
              </span>
              <button
                onClick={() => removeSkill(skill)}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <X size={18} />
              </button>
            </Reorder.Item>
          ))}
        </Reorder.Group>
      </section>

      {/* Experiences */}
      <section>
        <div className="flex justify-between items-center mb-4 border-b dark:border-gray-700 pb-2">
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
            <Briefcase size={22} className="text-emerald-500" /> Experience
          </h3>
          <button
            onClick={addExperience}
            className="text-sm flex items-center gap-1 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-3 py-1.5 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-500/20 transition-colors font-semibold"
          >
            <Plus size={16} /> Add
          </button>
        </div>

        <div className="space-y-4">
          {resumeData.experiences.map((exp, index) => (
            <div
              key={exp.id}
              className="p-5 border dark:border-gray-700 rounded-xl relative bg-gray-50 dark:bg-gray-900/50 group"
            >
              {resumeData.experiences.length > 1 && (
                <button
                  onClick={() => removeExperience(exp.id)}
                  className="absolute top-3 right-3 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={20} />
                </button>
              )}
              <h4 className="text-sm font-bold text-gray-400 mb-3 uppercase tracking-wider">
                Experience {index + 1}
              </h4>
              <input
                className={inputStyles}
                value={exp.company}
                onChange={(e) =>
                  updateExperience(exp.id, "company", e.target.value)
                }
                placeholder="Company"
              />
              <input
                className={inputStyles}
                value={exp.role}
                onChange={(e) =>
                  updateExperience(exp.id, "role", e.target.value)
                }
                placeholder="Role"
              />
              <textarea
                className={inputStyles}
                value={exp.details}
                onChange={(e) =>
                  updateExperience(exp.id, "details", e.target.value)
                }
                placeholder="Details..."
                rows="3"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
