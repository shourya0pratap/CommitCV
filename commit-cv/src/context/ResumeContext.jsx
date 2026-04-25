import React, { createContext, useState, useEffect } from "react";

export const ResumeContext = createContext();

export const ResumeProvider = ({ children }) => {
  // Persistence: Load from LocalStorage or use default [cite: 153]
  const [resumeData, setResumeData] = useState(() => {
    const saved = localStorage.getItem("commitcv_data");
    return saved
      ? JSON.parse(saved)
      : {
          personal: { name: "", email: "", role: "", leetcode: "" },
          experience: [],
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

  return (
    <ResumeContext.Provider
      value={{ resumeData, setResumeData, updatePersonal }}
    >
      {children}
    </ResumeContext.Provider>
  );
};
