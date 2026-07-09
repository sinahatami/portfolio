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

// Ignore Next.js Hydration Errors in Cypress
Cypress.on("uncaught:exception", (err) => {
  // Next.js hydration error code 418 or 423
  if (
    err.message.includes("Minified React error #418") ||
    err.message.includes("Minified React error #423")
  ) {
    return false;
  }
  // Ignore ResizeObserver loop limit exceeded
  if (err.message.includes("ResizeObserver loop limit exceeded")) {
    return false;
  }
  return true;
});
