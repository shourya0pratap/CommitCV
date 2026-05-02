import { createContext, useState, useEffect, useCallback } from "react";

export const ResumeContext = createContext();

const defaultData = {
  personal: {
    name: "John Doe",
    role: "Frontend Developer",
    email: "john.doe@example.com",
  },
  skills: ["React.js", "JavaScript", "Tailwind CSS", "Git"],
  educations: [
    {
      id: 1,
      institution: "University of Technology",
      degree: "B.S. Computer Science",
      duration: "2020 - 2024",
      details:
        "Graduated with Honors. Coursework included Data Structures, Algorithms, and Web Engineering.",
    },
  ],
  experiences: [
    {
      id: 1,
      company: "Tech Innovations Inc.",
      role: "Junior Web Developer",
      details:
        "Built responsive UI components and improved site accessibility.",
    },
  ],
};

export const ResumeProvider = ({ children }) => {
  const [resumeData, setResumeData] = useState(() => {
    const saved = localStorage.getItem("commitcv-data");
    if (saved) {
      const parsed = JSON.parse(saved);

      // Migration 1: Single experience to multiple
      if (parsed.experience && !parsed.experiences) {
        parsed.experiences = [{ id: Date.now(), ...parsed.experience }];
        delete parsed.experience;
      }

      // Migration 2: Single education to multiple
      if (parsed.education && !parsed.educations) {
        parsed.educations = [
          {
            id: Date.now(),
            institution: parsed.education.institution,
            degree: parsed.education.degree,
            duration: "",
            details: `Score: ${parsed.education.score}`,
          },
        ];
        delete parsed.education;
      }
      return parsed;
    }
    return defaultData;
  });

  const [sectionOrder, setSectionOrder] = useState(() => {
    const savedOrder = localStorage.getItem("commitcv-order");
    let order = savedOrder
      ? JSON.parse(savedOrder)
      : ["skills", "educations", "experiences"];
    // Migrate order strings
    return order.map((item) =>
      item === "experience"
        ? "experiences"
        : item === "education"
          ? "educations"
          : item,
    );
  });

  const [theme, setTheme] = useState(
    () => localStorage.getItem("commitcv-theme") || "light",
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Persist Data
  useEffect(() => {
    localStorage.setItem("commitcv-data", JSON.stringify(resumeData));
    localStorage.setItem("commitcv-order", JSON.stringify(sectionOrder));
  }, [resumeData, sectionOrder]);

  // Persist Theme to HTML tag
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("commitcv-theme", theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  const fetchGithubProfile = async (username) => {
    if (!username) return;
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`https://api.github.com/users/${username}`);
      if (!res.ok) throw new Error("User not found");
      const data = await res.json();
      setResumeData((prev) => ({
        ...prev,
        personal: {
          ...prev.personal,
          name: data.name || data.login,
          role: data.bio || prev.personal.role,
        },
      }));
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ResumeContext.Provider
      value={{
        resumeData,
        setResumeData,
        sectionOrder,
        setSectionOrder,
        theme,
        toggleTheme,
        fetchGithubProfile,
        isLoading,
        error,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};
