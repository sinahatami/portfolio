/**
 * This script helps find and fix animation loops
 * Run with: node scripts/fix-animations.js
 */

const fs = require("fs");
const path = require("path");

const componentsDir = path.join(__dirname, "../src/components");

// Find all components with motion.div
function findMotionComponents(dir) {
  const results = [];
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      results.push(...findMotionComponents(filePath));
    } else if (file.endsWith(".tsx") || file.endsWith(".ts")) {
      const content = fs.readFileSync(filePath, "utf8");
      if (content.includes("motion.div") || content.includes("motion(")) {
        results.push({
          file: filePath,
          lines: content.split("\n").length,
          hasAnimateProp: content.includes("animate="),
          hasWhileInView: content.includes("whileInView"),
        });
      }
    }
  }

  return results;
}

const motionComponents = findMotionComponents(componentsDir);
console.log(`Found ${motionComponents.length} components with Framer Motion:`);

motionComponents.forEach((comp, i) => {
  console.log(`${i + 1}. ${comp.file}`);
  console.log(
    `   Lines: ${comp.lines}, Has animate: ${comp.hasAnimateProp}, Has whileInView: ${comp.hasWhileInView}`
  );
});

console.log("\nTo fix infinite loops:");
console.log("1. Disable all animations with ENABLE_ANIMATIONS = false");
console.log("2. Replace motion.div with StaticWrapper component");
console.log("3. Remove animate, initial, whileInView props");
console.log("4. Test each component individually");
