import { ContactBlock } from "@/components/organisms/contact-block";
import { Hero } from "@/components/organisms/hero";
import { ProjectIndex } from "@/components/organisms/project-index";
import { RecommendationList } from "@/components/organisms/recommendation-list";
import { RepositorySummary } from "@/components/organisms/repository-summary";
import { RouteStrip } from "@/components/organisms/route-strip";
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
import {
  buildCareerTimeline,
  buildRouteStops,
  educationToCareerEntries,
  experienceToCareerEntries,
} from "@/lib/career";
import { toYearMonth } from "@/lib/dates";
import { attachRepoActivity, unfeaturedRepos } from "@/lib/projects";
import { withSkillUsage } from "@/lib/skills";
import { getGitHubActivityService } from "@/server/container";

/** Regenerate hourly so live GitHub data and "today" stay fresh. */
export const revalidate = 3600;

/**
 * Page = composition root for the UI: it reads content and live data,
 * derives view models with pure functions, and hands plain props to
 * presentational organisms.
 */
export default async function HomePage() {
  const now = toYearMonth(new Date());
  const timeline = buildCareerTimeline(
    [
      ...experienceToCareerEntries(EXPERIENCE),
      ...educationToCareerEntries(EDUCATION),
    ],
    now
  );
  const skills = withSkillUsage(SKILL_GROUPS, {
    experience: EXPERIENCE,
    projects: PROJECTS,
  });
  const github = PROFILE.socials.find((social) => social.id === "github");

  // GitHub failures resolve to null; projects then render without live data.
  const activity = await getGitHubActivityService().getActivity();
  const repos = activity?.repos ?? [];

  return (
    <>
      <Hero profile={PROFILE} timeline={timeline} now={now} />

      <PageSection
        id="experience"
        title="Route"
        description="Roles and degrees, newest first"
      >
        <RouteStrip
          stops={buildRouteStops(EXPERIENCE, EDUCATION)}
          now={now}
          nextStop={
            PROFILE.availability.open
              ? {
                  title: "Your team",
                  description:
                    "Next stop: open to software and ML engineering roles",
                  href: "#contact",
                }
              : undefined
          }
        />
      </PageSection>

      <PageSection
        id="projects"
        title="Projects"
        description="Every public repository, with live GitHub data"
        tone="band"
        line="research"
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
        description="Select one to see the roles and projects that used it"
        line="study"
        hideInPrint
      >
        <SkillsExplorer groups={skills} />
      </PageSection>

      <PageSection
        id="recommendations"
        title="References"
        description="From a professor, a senior colleague and a CEO"
        tone="band"
      >
        <RecommendationList recommendations={RECOMMENDATIONS} />
      </PageSection>

      <PageSection
        id="contact"
        title="Get in touch"
        tone="board"
        line="signal"
        hideInPrint
      >
        <ContactBlock profile={PROFILE} />
      </PageSection>
    </>
  );
}
