import { CareerTable } from "@/components/organisms/career-table";
import { ContactBlock } from "@/components/organisms/contact-block";
import { Hero } from "@/components/organisms/hero";
import { ProjectIndex } from "@/components/organisms/project-index";
import { RecommendationList } from "@/components/organisms/recommendation-list";
import { RepositorySummary } from "@/components/organisms/repository-summary";
import { SkillsExplorer } from "@/components/organisms/skills-explorer";
import { PageSection } from "@/components/templates/page-section";
import {
  EDUCATION,
  EXPERIENCE,
  PROFILE,
  PROJECTS,
  RECOMMENDATIONS,
  SKILL_GROUPS,
} from "@/content";
import { buildRouteStops } from "@/lib/career";
import { toYearMonth } from "@/lib/dates";
import { attachRepoActivity, unfeaturedRepos } from "@/lib/projects";
import { resolveProofNotes } from "@/lib/proof";
import { evidenceColumns, rankSkills, withSkillUsage } from "@/lib/skills";
import { getGitHubActivityService } from "@/server/container";

/** Regenerate hourly so live GitHub data and "today" stay fresh. */
export const revalidate = 3600;

const count = (n: number, word: string) => `${n} ${word}${n === 1 ? "" : "s"}`;

/**
 * Page = composition root for the UI: it reads content and live data,
 * derives view models with pure functions, and hands plain props to
 * presentational organisms.
 */
export default async function HomePage() {
  const now = toYearMonth(new Date());
  const stops = buildRouteStops(EXPERIENCE, EDUCATION);
  const firstYear = Math.min(
    ...stops.map((stop) => Number(stop.period.start.slice(0, 4)))
  );
  const sources = { experience: EXPERIENCE, projects: PROJECTS };
  const skills = rankSkills(withSkillUsage(SKILL_GROUPS, sources));
  const github = PROFILE.socials.find((social) => social.id === "github");

  // GitHub failures resolve to null; projects then render without live data.
  const activity = await getGitHubActivityService().getActivity();
  const repos = activity?.repos ?? [];

  return (
    <>
      <Hero
        profile={PROFILE}
        notes={resolveProofNotes(PROFILE.proof, RECOMMENDATIONS)}
      />

      <PageSection
        id="experience"
        title="Work"
        description={`${count(EXPERIENCE.length, "role")} and ${count(EDUCATION.length, "degree")} since ${firstYear}`}
      >
        <CareerTable stops={stops} now={now} />
      </PageSection>

      <PageSection
        id="projects"
        title="Projects"
        description="Every public repository, with live GitHub data"
      >
        <ProjectIndex projects={attachRepoActivity(PROJECTS, repos)} />
        <div data-print="hide">
          <RepositorySummary
            activity={activity}
            others={unfeaturedRepos(PROJECTS, repos)}
            profileUrl={github?.url ?? "https://github.com"}
          />
        </div>
      </PageSection>

      <PageSection
        id="skills"
        title="Skills"
        description="Each dot is a role or project that used the skill"
        hideInPrint
      >
        <SkillsExplorer
          skills={skills.used}
          unused={skills.unused}
          columns={evidenceColumns(skills.used, sources)}
        />
      </PageSection>

      <PageSection
        id="recommendations"
        title="References"
        description="From a professor, a senior colleague and a CEO"
      >
        <RecommendationList recommendations={RECOMMENDATIONS} />
      </PageSection>

      <PageSection id="contact" title="Get in touch" hideInPrint>
        <ContactBlock profile={PROFILE} />
      </PageSection>
    </>
  );
}
