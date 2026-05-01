import { createContext, useState, useEffect } from "react";

export const ResumeContext = createContext();

// Default data tailored to a CSE undergrad profile for testing
const defaultData = {
  personal: {
    name: "John Doe",
    role: "B.Tech CSE Undergraduate",
    email: "john@example.com",
  },
  education: {
    institution: "University Name",
    degree: "Computer Science",
    score: "9.74 SGPA",
  },
  skills: ["React.js", "Tailwind CSS", "Framer Motion", "Python", "C++"],
  experience: {
    company: "Tech Corp",
    role: "Software Intern",
    details: "Developed UI components.",
  },
};

export const ResumeProvider = ({ children }) => {
  const [resumeData, setResumeData] = useState(() => {
    const saved = localStorage.getItem("commitcv-data");
    return saved ? JSON.parse(saved) : defaultData;
  });

  const [theme, setTheme] = useState("dark"); // Bonus: Dark mode state

  // Persist to LocalStorage whenever data changes
  useEffect(() => {
    localStorage.setItem("commitcv-data", JSON.stringify(resumeData));
  }, [resumeData]);

  return (
    <ResumeContext.Provider
      value={{ resumeData, setResumeData, theme, setTheme }}
    >
      {children}
    </ResumeContext.Provider>
  );
};
