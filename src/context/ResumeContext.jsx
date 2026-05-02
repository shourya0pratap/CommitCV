import { createContext, useState, useEffect, useCallback } from "react";

export const ResumeContext = createContext();

const defaultData = {
  personal: {
    name: "Shourya Pratap Singh",
    role: "B.Tech CSE Undergraduate",
    email: "hello@example.com",
  },
  education: {
    institution: "KR Mangalam University",
    degree: "Computer Science",
    score: "9.74 SGPA",
  },
  skills: [
    "React.js",
    "Tailwind CSS",
    "Framer Motion",
    "Node.js",
    "Python",
    "C++",
    "Java",
  ],
  experiences: [
    {
      id: Date.now(),
      company: "Tech Corp",
      role: "Software Intern",
      details: "Developed UI components.",
    },
  ],
};

export const ResumeProvider = ({ children }) => {
  const [resumeData, setResumeData] = useState(() => {
    const saved = localStorage.getItem("commitcv-data");
    if (saved) {
      const parsed = JSON.parse(saved);
      // Migration: Convert old single 'experience' to array if it exists
      if (parsed.experience && !parsed.experiences) {
        parsed.experiences = [{ id: Date.now(), ...parsed.experience }];
        delete parsed.experience;
      }
      return parsed;
    }
    return defaultData;
  });

  const [sectionOrder, setSectionOrder] = useState(() => {
    const savedOrder = localStorage.getItem("commitcv-order");
    let order = savedOrder
      ? JSON.parse(savedOrder)
      : ["skills", "education", "experiences"];
    // Migration: Update order string
    return order.map((item) => (item === "experience" ? "experiences" : item));
  });

  const [theme, setTheme] = useState(
    () => localStorage.getItem("commitcv-theme") || "dark",
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    localStorage.setItem("commitcv-data", JSON.stringify(resumeData));
    localStorage.setItem("commitcv-order", JSON.stringify(sectionOrder));
  }, [resumeData, sectionOrder]);
  
  useEffect(() => {
    const root = window.document.documentElement; // Targets the <html> tag
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("commitcv-theme", theme);
  }, [theme]);
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

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

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
