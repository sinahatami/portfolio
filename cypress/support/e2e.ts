// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
// ***********************************************************

// Hide fetch/XHR requests from command log
const app = window.top;
if (
  app &&
  !app.document.head.querySelector("[data-hide-command-log-request]")
) {
  const style = app.document.createElement("style");
  style.innerHTML =
    ".command-name-request, .command-name-xhr { display: none }";
  style.setAttribute("data-hide-command-log-request", "");
  app.document.head.appendChild(style);
}

// Ignore all uncaught exceptions in DEV (like Next.js Hydration errors)
Cypress.on("uncaught:exception", () => {
  return false;
});
