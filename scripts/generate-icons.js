const fs = require("fs");
const path = require("path");

// Create icons directory if it doesn't exist
const iconsDir = path.join(__dirname, "../public/icons");
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// List of required icons
const iconSizes = [72, 96, 128, 144, 152, 192, 384, 512];

// Create placeholder icons
iconSizes.forEach((size) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}">
    <rect width="${size}" height="${size}" fill="#3b82f6"/>
    <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="white" font-size="${size / 3}" font-family="Arial, sans-serif">SH</text>
  </svg>`;

  fs.writeFileSync(path.join(iconsDir, `icon-${size}x${size}.png`), "");
  fs.writeFileSync(path.join(iconsDir, `icon-${size}x${size}.svg`), svg);
});

console.log("✅ Generated placeholder icons in /public/icons/");
