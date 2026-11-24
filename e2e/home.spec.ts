import { expect, test } from "@playwright/test";

test.describe("Home page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("introduces the person and shows the career route map", async ({
    page,
  }) => {
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Sina Hatami"
    );
    await expect(page.getByRole("img", { name: "Sina Hatami" })).toBeVisible();

    const map = page.locator("svg[aria-label^='Career route map']");
    await expect(map).toBeVisible();
    await expect(
      map.locator("[aria-pressed='true'][aria-label*='hAppI Lab']")
    ).toHaveCount(1);
    await expect(map.getByText("Next stop")).toBeVisible();
  });

  test("selecting a station shows its details below the map", async ({
    page,
    isMobile,
  }) => {
    test.skip(isMobile, "Stations are selected with a pointer on desktop");
    const station = page.locator("[role='button'][aria-label^='Iran EIT']");
    await station.focus();
    await expect(station).toHaveAttribute("aria-pressed", "true");
    await expect(page.getByTestId("station-details")).toContainText(
      "Full Stack Engineer"
    );
  });

  test("renders every main section", async ({ page }) => {
    for (const [id, title] of [
      ["experience", "Route"],
      ["education-unige", "University of Genoa"],
      ["projects", "Projects"],
      ["skills", "Skills"],
      ["recommendations", "References"],
      ["contact", "Get in touch"],
    ] as const) {
      const section = page.locator(`#${id}`);
      await section.scrollIntoViewIfNeeded();
      await expect(section).toBeVisible();
      await expect(section).toContainText(title);
    }
    await expect(page.locator("#contact form")).toBeVisible();
  });

  test("filters projects by area", async ({ page }) => {
    const projects = page.locator("#projects");
    const systems = projects.getByRole("button", { name: "Systems & XR" });
    await systems.click();
    await expect(systems).toHaveAttribute("aria-pressed", "true");
    await expect(
      projects.getByRole("heading", { name: "High Performance Computing" })
    ).toBeVisible();
    await expect(
      projects.getByRole("heading", { name: "HoldsUp" })
    ).toHaveCount(0);
  });

  test("shows the evidence for a chosen skill", async ({ page }) => {
    const skills = page.locator("#skills");
    const python = skills
      .getByRole("list", { name: "Data science & AI" })
      .getByRole("button", { name: /^Python, \d+ uses$/ });
    await python.click();
    await expect(python).toHaveAttribute("aria-pressed", "true");
    await expect(skills.getByRole("heading", { level: 4 })).toHaveText(
      "Python"
    );
  });

  test("validates the contact form without sending it", async ({ page }) => {
    const form = page.locator("#contact form");
    await form.scrollIntoViewIfNeeded();
    await form.getByRole("textbox", { name: "Your email" }).fill("nope");
    await form.getByRole("textbox", { name: "Message" }).fill("Hi");
    await form.getByRole("button", { name: "Send message" }).click();
    await expect(
      form.getByText("Enter an email address like name@company.com.")
    ).toBeVisible();
    await expect(form.getByText("Write at least 10 characters.")).toBeVisible();
  });

  test("opens and closes the command menu with the keyboard", async ({
    page,
    isMobile,
  }) => {
    test.skip(isMobile, "Keyboard shortcut is a desktop feature");
    await page.keyboard.press("ControlOrMeta+k");
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog).toContainText("Print resume");
    await page.keyboard.press("Escape");
    await expect(dialog).toHaveCount(0);
  });
});

test("has no console errors on load", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  expect(errors).toEqual([]);
});

test("blog index lists posts", async ({ page }) => {
  await page.goto("/blog");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.locator("main article, main li").first()).toBeVisible();
});
