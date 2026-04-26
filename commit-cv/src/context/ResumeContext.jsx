import React, { createContext, useState, useEffect } from "react";

export const ResumeContext = createContext();

export const ResumeProvider = ({ children }) => {
  const [resumeData, setResumeData] = useState(() => {
    const saved = localStorage.getItem("commitcv_data");
    return saved
      ? JSON.parse(saved)
      : {
          personal: { name: "", email: "", role: "", leetcode: "" },
          experience: [{ title: "Software Engineer", company: "Google" }],
          education: [],
          skills: [],
          themeColor: "#2563eb",
        };
  });

  useEffect(() => {
    localStorage.setItem("commitcv_data", JSON.stringify(resumeData));
  }, [resumeData]);

  const updatePersonal = (field, value) => {
    setResumeData((prev) => ({
      ...prev,
      personal: { ...prev.personal, [field]: value },
    }));
  };

  const addExperience = () => {
    setResumeData((prev) => ({
      ...prev,
      experience: [...prev.experience, { title: "", company: "" }],
    }));
  };

  return (
    <ResumeContext.Provider
      value={{ resumeData, setResumeData, updatePersonal, addExperience }}
    >
      {children}
    </ResumeContext.Provider>
  );
};
