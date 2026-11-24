import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProjectIndex } from "@/components/organisms/project-index";
import type { Project } from "@/domain/portfolio";

const project = (id: string, domains: Project["domains"]): Project => ({
  id,
  title: `Project ${id}`,
  description: "Description",
  domains,
  stack: ["TypeScript"],
  sourceUrl: `https://github.com/x/${id}`,
});

const projects = [
  project("a", ["web"]),
  project("b", ["ml"]),
  project("c", ["web", "ml"]),
  project("d", ["data"]),
];

describe("ProjectIndex", () => {
  it("shows the first projects and reveals the rest on demand", async () => {
    render(<ProjectIndex projects={projects} initialCount={2} />);
    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(2);

    await userEvent.click(
      screen.getByRole("button", { name: /show all 4 projects/i })
    );
    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(4);
  });

  it("filters by area and marks the active filter", async () => {
    render(<ProjectIndex projects={projects} />);
    const ml = screen.getByRole("button", { name: /machine learning/i });

    await userEvent.click(ml);

    expect(ml).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText("Project b")).toBeInTheDocument();
    expect(screen.getByText("Project c")).toBeInTheDocument();
    expect(screen.queryByText("Project a")).not.toBeInTheDocument();
  });
});
