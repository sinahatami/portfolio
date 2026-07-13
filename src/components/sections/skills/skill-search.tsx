import { useState } from "react";
import { Search } from "@/lib/icons";
import { RESUME_DATA } from "@/data/resume-data";

interface SkillSearchProps {
  onSkillClick: (skill: string) => void;
}

export const SkillSearch = ({ onSkillClick }: SkillSearchProps) => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<string[]>([]);

  const handleSearch = (query: string) => {
    setSearch(query);
    if (query) {
      const allSkills = Array.from(
        new Set([
          ...(RESUME_DATA.skills[0]?.items || []),
          ...(RESUME_DATA.skills[1]?.items || []),
        ])
      );
      const filtered = allSkills.filter((skill) =>
        skill.toLowerCase().includes(query)
      );
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <div className="mb-8">
      <div className="group relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 flex items-center pl-4">
          <Search className="text-muted-foreground group-focus-within:text-accent h-5 w-5 transition-colors" />
        </div>
        <input
          type="text"
          placeholder="Search 50+ skills..."
          value={search}
          onChange={(e) => handleSearch(e.target.value.toLowerCase())}
          className="focus:ring-accent border-border bg-card/50 w-full rounded-xl border py-4 pr-6 pl-12 backdrop-blur-sm focus:ring-2 focus:outline-none"
        />
      </div>

      {search && (
        <div className="border-border bg-card/80 mt-4 rounded-xl border p-4 backdrop-blur-md">
          <p className="text-muted-foreground mb-2 text-sm">
            Found {searchResults.length} skills
          </p>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {searchResults.map((skill) => (
              <button
                key={skill}
                onClick={() => onSkillClick(skill)}
                className="bg-accent/10 hover:bg-accent/20 text-accent rounded-lg px-3 py-1 text-sm whitespace-nowrap transition-colors"
              >
                {skill}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
