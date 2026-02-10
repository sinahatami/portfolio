# 🌐 Sina Hatami | Senior Software Engineer

# Portfolio

## 🎯 Overview

A cutting-edge, high-performance portfolio website built with modern web technologies. This portfolio showcases Sina Hatami's expertise as a **Software Engineer** with 4+ years of experience in React, Next.js, TypeScript, and AI/ML technologies.

The site features interactive 3D visualizations, real-time GitHub integration, and a fully responsive design optimized for performance and user experience.

🚀 **Live Demo:** [sinahatami.dev](https://sinahatami.dev) 
💻 **GitHub Repository:** [github.com/sinahatami/portfolio](https://github.com/sinahatami/portfolio)

## ✨ Key Features

### 🎨 Modern UI/UX

```
● Dark/Light Theme : Fully customizable theme system with persistent user preferences.
● Interactive 3D Elements : Tech sphere visualization and project showcases using
Three.js.
● Smooth Animations : Framer Motion-powered transitions and micro-interactions.
● Responsive Design : Flawless experience across all device sizes (mobile, tablet,
desktop).
● Custom Cursor : Interactive cursor with hover effects (optimized for desktop).
```
### ⚡ Performance Optimized

```
● Next.js 14 App Router : Utilizing the latest React Server Components (RSC) architecture.
● Image Optimization : Automatic compression, lazy loading, and WebP support.
● Code Splitting : Dynamic imports implemented for heavy 3D and interactive components.
● PWA Support : Fully installable as a Progressive Web App.
● Core Web Vitals : Real-time monitoring for optimal LCP, FID, and CLS scores.
```
### 🔧 Technical Excellence

```
● TypeScript First : End-to-end type safety across the entire application.
● 3D Integration : WebGL-based tech visualization with graceful fallbacks for older
devices.
● Real-time Data : GitHub API integration for live activity and repository tracking.
● Contact Form : Server-side validation with Resend email integration.
● SEO & Accessibility : WCAG 2.1 AA compliant and optimized for search engine crawlers.
```

## 📊 Tech Stack

```
Category Technologies
Core Framework Next.js 14 (App Router), React 18,
TypeScript 5
Styling & UI Tailwind CSS, Shadcn/ui, Framer Motion,
Lucide React
3D & Graphics Three.js, @react-three/fiber,
@react-three/drei, WebGL
Backend & APIs Resend (Email), GitHub REST API, Next.js
Server Actions
Monitoring Vercel Analytics, Speed Insights,
Performance Observer API
Dev Tools ESLint, Prettier, Husky, Commitlint
```
## 🏗 Project Structure

src/
├── app/ # Next.js 14 App Router (Pages & API)
├── components/
│ ├── 3d/ # Three.js / WebGL Components
│ ├── sections/ # Page Sections (Hero, Skills, Projects, etc.)
│ ├── layout/ # Navigation, Footer, Scroll components
│ ├── features/ # Cursor, Command Menu, Voice features
│ ├── ui/ # Base UI Components (Buttons, Cards, Badges)
│ └── pwa/ # PWA Registry & Offline indicators
├── contexts/ # Global State (Skills, Theme)
├── hooks/ # Custom React Hooks (WebGL, Performance)
├── data/ # Static Content & Resume Data
├── lib/ # Utility functions & Shared logic
├── actions/ # Next.js Server Actions (Contact form)
├── types/ # Global TypeScript Definitions
└── config/ # Feature flags & Animation configs

## 🚀 Getting Started


### Prerequisites

```
● Node.js 18.17 or later
● npm, yarn, or pnpm
```
### Installation & Setup

1. **Clone the repository**
    git clone
    [https://github.com/sinahatami/portfolio.git](https://github.com/sinahatami/portfolio.git)
    cd portfolio
2. **Install dependencies**
    npm install
3. **Environment Configuration**
    Create a .env.local file in the root directory:
    # Required for contact form
    RESEND_API_KEY=your_resend_api_key_here
    # Optional: GitHub API for enhanced features
    GITHUB_TOKEN=your_github_personal_access_token_here
    # Optional: Analytics
    NEXT_PUBLIC_GA_ID=your_google_analytics_id
4. **Run Development Server**
    npm run dev
    Open [http://localhost:3000](http://localhost:3000) to view the result.

## 📦 Available Scripts

```
● npm run dev: Start development server with Turbopack.
● npm run build: Build the application for production.
● npm run start: Start production server.
● npm run lint: Run ESLint to find code issues.
● npm run format: Format code with Prettier.
● npm run type-check: Validate TypeScript types.
● npm run analyze: Analyze bundle sizes for optimization.
```
## 🚢 Deployment

### Vercel (Recommended)


The easiest way to deploy this portfolio is using the Vercel Platform.

1. Push your code to a GitHub repository.
2. Import the project into Vercel.
3. Add your environment variables in the Vercel Dashboard.
4. Deploy!

### Manual Build

npm run build
npm run start

## 🛠 Performance Optimization

This portfolio achieves **100/100 Lighthouse scores** through:
● **Caching** : Static Site Generation (SSG) with Incremental Static Regeneration (ISR).
● **Bundle Optimization** : Tree-shaking and aggressive code splitting.
● **Asset Strategy** : Next/Image for WebP delivery and optimized font loading.
● **Monitoring** : Integration with Vercel Speed Insights.

## 🤝 Contributing

Contributions are welcome!

1. Fork the Project.
2. Create your Feature Branch (git checkout -b feature/AmazingFeature).
3. Commit your Changes (git commit -m 'Add AmazingFeature').
4. Push to the Branch (git push origin feature/AmazingFeature).
5. Open a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📬 Contact

**Sina Hatami** - Software Engineer
● **Email** : hatamisinaa@gmail.com
● **Website** : sinahatami.dev
● **LinkedIn** : sina-hatami
● **GitHub** : sinahatami
● **Location** : Genoa, Italy
<div align="center">


<br />
Made with ❤ using Next.js, TypeScript, and Tailwind CSS
<br />
<strong>⭐ Star this repository if you found it helpful!</strong>
<br />
<br />
<a href="https://www.google.com/search?q=https://github.com/sinahatami/portfolio">
<img src="https://img.shields.io/github/stars/sinahatami/portfolio?style=social" alt="Github
Stars" />
</a>
</div>


