import { useContext, useState, useEffect } from "react";
import { ResumeContext } from "./ResumeContext";

export default function Editor() {
  const { resumeData, setResumeData } = useContext(ResumeContext);
  const [apiMessage, setApiMessage] = useState("Loading tip...");

  // Mandatory: API Integration (Fetching a random advice slip as a placeholder for a real backend)
  useEffect(() => {
    fetch("https://api.adviceslip.com/advice")
      .then((res) => res.json())
      .then((data) => setApiMessage(data.slip.advice))
      .catch(() =>
        setApiMessage("Keep your resume concise and action-oriented."),
      );
  }, []);

  const handleChange = (section, field, value) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };

  const handleSkillChange = (e) => {
    const skillsArray = e.target.value.split(",").map((s) => s.trim());
    setResumeData((prev) => ({ ...prev, skills: skillsArray }));
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 h-[85vh] overflow-y-auto print:hidden">
      <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-lg text-sm">
        💡 <strong>Tip of the day:</strong> {apiMessage}
      </div>

      <h2 className="text-2xl font-bold mb-4 dark:text-white">Editor</h2>

      {/* Personal Info */}
      <div className="space-y-4 mb-6">
        <h3 className="text-lg font-semibold text-gray-500 dark:text-gray-400">
          Personal
        </h3>
        <input
          className="w-full p-2 border rounded dark:bg-gray-900 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-emerald-500"
          value={resumeData.personal.name}
          onChange={(e) => handleChange("personal", "name", e.target.value)}
          placeholder="Full Name"
        />
        <input
          className="w-full p-2 border rounded dark:bg-gray-900 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-emerald-500"
          value={resumeData.personal.role}
          onChange={(e) => handleChange("personal", "role", e.target.value)}
          placeholder="Role (e.g., Software Engineer)"
        />
      </div>

      {/* Skills (Comma separated for easy array handling) */}
      <div className="space-y-4 mb-6">
        <h3 className="text-lg font-semibold text-gray-500 dark:text-gray-400">
          Skills (Comma separated)
        </h3>
        <textarea
          className="w-full p-2 border rounded dark:bg-gray-900 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-emerald-500"
          value={resumeData.skills.join(", ")}
          onChange={handleSkillChange}
        />
      </div>

      {/* Education */}
      <div className="space-y-4 mb-6">
        <h3 className="text-lg font-semibold text-gray-500 dark:text-gray-400">
          Education
        </h3>
        <input
          className="w-full p-2 border rounded dark:bg-gray-900 dark:border-gray-600 dark:text-white"
          value={resumeData.education.degree}
          onChange={(e) => handleChange("education", "degree", e.target.value)}
        />
        <input
          className="w-full p-2 border rounded dark:bg-gray-900 dark:border-gray-600 dark:text-white"
          value={resumeData.education.score}
          onChange={(e) => handleChange("education", "score", e.target.value)}
          placeholder="GPA/SGPA"
        />
      </div>
    </div>
  );
}
