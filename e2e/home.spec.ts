import { expect, test } from "@playwright/test";

test.describe("Home page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("introduces the person with sourced claims", async ({ page }) => {
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Sina Hatami"
    );
    await expect(page.getByRole("img", { name: "Sina Hatami" })).toBeVisible();

    const sources = page.getByRole("list", { name: "Sources" });
    await expect(sources.getByRole("listitem")).toHaveCount(3);
    await page.getByRole("link", { name: "Note 3" }).click();
    await expect(page).toHaveURL(/#note-3$/);
  });

  test("keeps the intro and actions beside the photo on wide screens", async ({
    page,
    isMobile,
  }) => {
    test.skip(isMobile, "On phones the intro runs full width under the photo");
    const intro = await page
      .getByText("Four years of production software")
      .boundingBox();
    const action = await page
      .getByRole("link", { name: "Get in touch" })
      .first()
      .boundingBox();
    const photo = await page
      .getByRole("img", { name: "Sina Hatami" })
      .boundingBox();
    if (!intro || !action || !photo) throw new Error("Hero is not laid out");

    // Intro and actions share the left column; the photo starts beside the
    // claim, above the intro, not stacked under it in the right column.
    expect(Math.abs(intro.x - action.x)).toBeLessThan(2);
    expect(photo.x).toBeGreaterThan(intro.x + intro.width);
    expect(photo.y).toBeLessThan(intro.y);
  });

  test("renders every main section", async ({ page }) => {
    for (const [id, title] of [
      ["experience", "Work"],
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
    const react = skills.getByRole("button", { name: /^React, \d+ uses$/ });
    await react.click();
    await expect(react).toHaveAttribute("aria-pressed", "true");
    await expect(skills.getByRole("heading", { level: 3 })).toHaveText("React");
    await expect(
      skills.getByRole("link", { name: "Widecons" })
    ).toHaveAttribute("href", "#experience-widecons");
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

test("an article links back to the index and to more writing", async ({
  page,
}) => {
  await page.goto("/blog");
  await page
    .getByRole("link", { name: "Understanding React Server Components" })
    .click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Understanding React Server Components"
  );
  await expect(
    page.getByRole("link", { name: "All articles" })
  ).toHaveAttribute("href", "/blog");
  const more = page.getByRole("region", { name: "More writing" });
  await expect(more.getByRole("heading", { level: 3 })).toHaveCount(1);
});

test("a missing page names the address and offers ways on", async ({
  page,
}) => {
  const response = await page.goto("/projects/old-link");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "This page doesn't exist"
  );
  await expect(page.locator("main code")).toHaveText("/projects/old-link");

  const destinations = page.getByRole("region", {
    name: "Where to go instead",
  });
  await expect(
    destinations.getByRole("link", { name: /^Work/ })
  ).toHaveAttribute("href", "/#experience");

  await page.getByRole("button", { name: "Search the site" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
});

test("serves the social image as a PNG", async ({ request }) => {
  const response = await request.get("/og");
  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toBe("image/png");
  expect((await response.body()).byteLength).toBeGreaterThan(10_000);
});

test("serves every icon the manifest and the page point to", async ({
  page,
  request,
}) => {
  const manifest = (await (
    await request.get("/manifest.webmanifest")
  ).json()) as { icons: { src: string; purpose: string }[] };
  expect(manifest.icons.map((icon) => icon.purpose)).toEqual(
    expect.arrayContaining(["any", "maskable"])
  );

  await page.goto("/");
  const linked = await page
    .locator('link[rel="icon"], link[rel="apple-touch-icon"]')
    .evaluateAll((links) =>
      links.map((link) => link.getAttribute("href") ?? "")
    );

  for (const src of [...manifest.icons.map((icon) => icon.src), ...linked]) {
    const response = await request.get(src);
    expect(response.status(), src).toBe(200);
    expect((await response.body()).byteLength, src).toBeGreaterThan(500);
  }
});
