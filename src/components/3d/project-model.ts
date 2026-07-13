export interface ProjectModel {
  id: string;
  title: string;
  tech: string[];
  position: [number, number, number];
  scale: number;
  description: string;
  link?: string;
}
