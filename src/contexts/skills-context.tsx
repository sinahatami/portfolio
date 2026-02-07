"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";

interface SkillDetail {
  name: string;
  description: string;
  level: number;
  years: number;
  projects: number;
  certification?: string;
  icon?: string;
  category:
    | "frontend"
    | "backend"
    | "devops"
    | "data-science"
    | "ai-ml"
    | "other";
}

interface SkillsContextType {
  selectedSkill: SkillDetail | null;
  setSelectedSkill: (skill: SkillDetail | null) => void;
  hoveredSkill: string | null;
  setHoveredSkill: (skill: string | null) => void;
}

const SkillsContext = createContext<SkillsContextType | undefined>(undefined);

export function SkillsProvider({ children }: { children: ReactNode }) {
  const [selectedSkill, setSelectedSkillState] = useState<SkillDetail | null>(
    null
  );
  const [hoveredSkill, setHoveredSkillState] = useState<string | null>(null);

  // Memoized setters
  const setSelectedSkill = useCallback((skill: SkillDetail | null) => {
    setSelectedSkillState(skill);
  }, []);

  const setHoveredSkill = useCallback((skill: string | null) => {
    setHoveredSkillState(skill);
  }, []);

  return (
    <SkillsContext.Provider
      value={{
        selectedSkill,
        setSelectedSkill,
        hoveredSkill,
        setHoveredSkill,
      }}
    >
      {children}
    </SkillsContext.Provider>
  );
}

export function useSkills() {
  const context = useContext(SkillsContext);

  if (context === undefined) {
    throw new Error("useSkills must be used within a SkillsProvider");
  }

  return context;
}
