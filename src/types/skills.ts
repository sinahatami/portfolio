export interface SkillDetail {
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

export interface SkillsContextType {
  selectedSkill: SkillDetail | null;
  setSelectedSkill: (skill: SkillDetail | null) => void;
  hoveredSkill: string | null;
  setHoveredSkill: (skill: string | null) => void;
}
