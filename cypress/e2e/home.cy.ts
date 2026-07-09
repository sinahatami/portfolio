describe("Portfolio Home Page E2E", () => {
  beforeEach(() => {
    // Visit the home page before each test
    cy.visit("/");
  });

  it("should load the hero section correctly", () => {
    // Check if the main heading exists
    cy.get("h1").should("contain.text", "Engineering");
    cy.get("h1").should("contain.text", "Interfaces");

    // Check if avatar or image exists
    cy.get("img[alt='Sina Hatami']").should("be.visible");
  });

  it("should navigate through the page sections via scrolling", () => {
    // Verify experience section
    cy.get("#experience").scrollIntoView();
    cy.get("#experience").should("be.visible");
    cy.get("#experience").contains("Experience");

    // Verify skills section
    cy.get("#skills").scrollIntoView();
    cy.get("#skills").should("be.visible");
    cy.get("#skills").contains("Skills");

    // Verify contact section
    cy.get("#contact").scrollIntoView();
    cy.get("#contact").should("be.visible");
    cy.get("form").should("be.visible");
  });

  it("should toggle the command menu via keyboard shortcut", () => {
    // Wait for hydration
    cy.wait(1000);

    // Trigger CMD+K or CTRL+K
    cy.get("body").type("{ctrl}k");

    // The command menu dialog should appear
    cy.get("[role='dialog']").should("be.visible");
    cy.get("[role='dialog']").contains("Print Resume");

    // Close command menu with escape
    cy.get("body").type("{esc}");
    cy.get("[role='dialog']").should("not.exist");
  });
});
