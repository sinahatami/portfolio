const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

console.log("🔍 Analyzing bundle size...\n");

try {
  // Run build
  console.log("1. Building project...");
  execSync("npm run build", { stdio: "inherit" });

  // Check .next/analyze directory for bundle report
  const analyzeDir = path.join(process.cwd(), ".next", "analyze");

  if (fs.existsSync(analyzeDir)) {
    console.log("\n📊 Bundle analysis available in:");
    console.log(`   ${analyzeDir}`);
    console.log("\n   Open client.html in your browser to view the report.");
  }

  // Check build output for size info
  console.log("\n📦 Build completed!");
  console.log("\n💡 Next steps:");
  console.log('   - Run "npm run dev" to test locally');
  console.log("   - Check browser console for performance warnings");
  console.log("   - Use Lighthouse in Chrome DevTools for audit");
} catch (error) {
  console.error("\n❌ Build failed:", error.message);
  process.exit(1);
}
