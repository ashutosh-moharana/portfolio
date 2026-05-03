const websites = [

  // Dev Tools & Utilities
  {
    id: 1,
    title: "Learn Git Branching",
    subject: "Interactive Git Visualizer",
    url: "https://learngitbranching.js.org",
    category: "Dev Tools & Utilities",
    icon: "git-branch",
    description: "The best way to actually understand Git — not just memorize commands. Visualizes branches, merges, rebases, and cherry-picks in real-time as you type. Concepts that take weeks to click take hours here."
  },
  {
    id: 2,
    title: "regex101",
    subject: "Regex Tester & Debugger",
    url: "https://regex101.com",
    category: "Dev Tools & Utilities",
    icon: "search",
    description: "Write and debug regular expressions with real-time token-by-token explanation. Supports Java, Python, JS and more. Saves hours every time you deal with pattern matching or input validation."
  },
  {
    id: 3,
    title: "DevDocs",
    subject: "Unified Offline Documentation",
    url: "https://devdocs.io",
    category: "Dev Tools & Utilities",
    icon: "book-open",
    description: "One tab, every documentation. Browse offline-capable docs for Java, Spring, Docker, SQL, JavaScript, and 100+ other technologies. Faster and cleaner than 10 separate Google searches."
  },
  {
    id: 4,
    title: "SQLBolt",
    subject: "Interactive SQL Practice",
    url: "https://sqlbolt.com",
    category: "Dev Tools & Utilities",
    icon: "database",
    description: "Learn SQL through simple, interactive lessons and exercises that run directly in the browser. Covers everything from basic SELECT queries to JOINs and subqueries — clean and beginner-friendly."
  },
  {
    id: 5,
    title: "Excalidraw",
    subject: "Quick Sketch & Whiteboard",
    url: "https://excalidraw.com",
    category: "Dev Tools & Utilities",
    icon: "pen",
    description: "Whiteboard tool for quick sketches — DB schemas, API flows, rough system diagrams. No account needed, exports instantly. Best when you need to think fast and draw faster."
  },
  {
    id: 6,
    title: "Eraser",
    subject: "AI-Powered Technical Diagrams",
    url: "https://www.eraser.io",
    category: "Dev Tools & Utilities",
    icon: "layout",
    description: "AI co-pilot for technical design. Describe your system in plain English or paste code — it generates clean architecture diagrams, ER diagrams, and sequence diagrams instantly. Diagram-as-code with GitHub sync built in."
  },
  {
    id: 7,
    title: "JWT.io",
    subject: "JWT Decoder & Debugger",
    url: "https://jwt.io",
    category: "Dev Tools & Utilities",
    icon: "key",
    description: "Paste any JWT token and instantly decode its header, payload, and verify its signature. If you are working with Spring Security, you will have this tab open constantly while debugging authentication."
  },
  {
    id: 8,
    title: "QuickRef.me",
    subject: "Developer Cheatsheets",
    url: "https://quickref.me",
    category: "Dev Tools & Utilities",
    icon: "file-text",
    description: "Cheatsheets for 200+ technologies — Git, Docker, Java, Spring, SQL, Linux commands. Better organized and cleaner than most cheatsheet sites. The fastest way to recall syntax you haven't used in a while."
  },
  {
    id: 9,
    title: "Ray.so",
    subject: "Code Screenshot Generator",
    url: "https://ray.so",
    category: "Dev Tools & Utilities",
    icon: "camera",
    description: "Turn code snippets into beautiful shareable images with a cleaner UI than Carbon. Popular for LinkedIn posts, technical blogs, and portfolio showcases. Syntax highlighting for all major languages."
  },
  {
    id: 10,
    title: "Carbon",
    subject: "Code Screenshot Generator",
    url: "https://carbon.now.sh",
    category: "Dev Tools & Utilities",
    icon: "camera",
    description: "The original tool for creating beautiful code images. Highly customizable themes, fonts, and window styles. A staple in developer portfolios and tech content creation worldwide."
  },

  // Backend / Java / Spring Boot
  {
    id: 11,
    title: "Coding Shuttle",
    subject: "Java & Spring Boot Courses",
    url: "https://www.codingshuttle.com",
    category: "Backend / Java / Spring Boot",
    icon: "rocket",
    description: "Anuj Bhaiya's platform — ex-Amazon engineer, 5L+ students. Best structured Spring Boot course in India covering REST APIs, JPA, Security, Microservices, Kafka & Docker. Rated 4.9/5 across 6,800+ reviews."
  },
  {
    id: 12,
    title: "Spring Initializr",
    subject: "Spring Boot Project Generator",
    url: "https://start.spring.io",
    category: "Backend / Java / Spring Boot",
    icon: "zap",
    description: "Official tool to bootstrap any Spring Boot project in seconds. Pick dependencies, Java version, and build tool — get a production-ready project structure instantly. Every Spring project starts here."
  },
  {
    id: 13,
    title: "Maven Repository",
    subject: "Java Dependency Search",
    url: "https://mvnrepository.com",
    category: "Backend / Java / Spring Boot",
    icon: "package",
    description: "Search and copy Maven or Gradle dependency snippets for any Java library. Every Java developer has this open constantly — it is the first place you go when adding any new dependency to your project."
  },
  {
    id: 14,
    title: "Docker Hub",
    subject: "Container Image Registry",
    url: "https://hub.docker.com",
    category: "Backend / Java / Spring Boot",
    icon: "box",
    description: "Official registry for Docker images. Pull official images for MySQL, Redis, Kafka, and any service your Spring Boot app depends on. The starting point for any containerized backend setup."
  },

  // DSA & Interview Prep
  {
    id: 15,
    title: "Take U Forward",
    subject: "Striver's A2Z DSA Sheet",
    url: "https://takeuforward.org/home",
    category: "DSA & Interview Prep",
    icon: "book",
    description: "The most popular DSA roadmap in the Indian placement circuit. Striver's A2Z sheet covers arrays to graphs with curated problems and video solutions — built specifically for service-to-product transitions."
  },
  {
    id: 16,
    title: "Visualgo",
    subject: "Algorithm Visualizer",
    url: "https://visualgo.net",
    category: "DSA & Interview Prep",
    icon: "eye",
    description: "Animates data structures and algorithms step-by-step — sorting, trees, graphs, DP and more. When recursion or graph traversal finally clicks visually, it sticks permanently."
  },
  {
    id: 17,
    title: "Exercism",
    subject: "Mentored Language Practice",
    url: "https://exercism.org/tracks",
    category: "DSA & Interview Prep",
    icon: "terminal",
    description: "Practice coding in 70+ languages with real human mentor feedback. Unlike typical grind platforms, the focus is writing idiomatic, production-quality code. Strong Java track with real code reviews."
  },

  // Frontend & UI Tools
  {
    id: 18,
    title: "React Docs",
    subject: "Official React Documentation",
    url: "https://react.dev",
    category: "Frontend & UI Tools",
    icon: "atom",
    description: "The official, fully rewritten React documentation. Teaches React the modern way — hooks, best practices, and interactive sandboxes built in. Clearer and more practical than anything third-party."
  },
  {
    id: 19,
    title: "Tailwind CSS Docs",
    subject: "Official Tailwind Documentation",
    url: "https://tailwindcss.com/docs",
    category: "Frontend & UI Tools",
    icon: "wind",
    description: "The official Tailwind CSS reference. Every utility class, variant, and configuration option in one place. Fast search, live examples — the tab you always have open when building any UI."
  },
  {
    id: 20,
    title: "shadcn/ui",
    subject: "Copy-Paste React Components",
    url: "https://ui.shadcn.com",
    category: "Frontend & UI Tools",
    icon: "component",
    description: "Production-ready React components you fully own — no black-box library, no forced updates. Built on Radix UI and Tailwind. The most respected free component system in the React ecosystem today."
  },
  {
    id: 21,
    title: "DaisyUI",
    subject: "Tailwind CSS Component Library",
    url: "https://daisyui.com/components",
    category: "Frontend & UI Tools",
    icon: "layout",
    description: "Themeable pre-built components on top of Tailwind CSS. One install — buttons, modals, tables, navbars. Perfect for backend devs who need a clean UI fast without writing CSS from scratch."
  },
  {
    id: 22,
    title: "React Icons",
    subject: "Icons Library for React",
    url: "https://react-icons.github.io/react-icons/",
    category: "Frontend & UI Tools",
    icon: "grid",
    description: "Include popular icon sets — Font Awesome, Material, Feather, and more — directly in React with a single import. Thousands of icons, zero hassle. The default icon solution for most React projects."
  },
  {
    id: 23,
    title: "Uiverse",
    subject: "Community CSS & Tailwind Elements",
    url: "https://uiverse.io",
    category: "Frontend & UI Tools",
    icon: "grid",
    description: "Community-built buttons, cards, loaders, and toggles — all copy-paste ready in CSS or Tailwind. Massive time saver for small components that would otherwise take 30 minutes to style from scratch."
  },
  {
    id: 24,
    title: "Coolors",
    subject: "Color Palette Generator",
    url: "https://coolors.co",
    category: "Frontend & UI Tools",
    icon: "droplet",
    description: "The most loved color palette generator among developers and designers. Hit spacebar, get a beautiful palette instantly. Used by practically everyone who has ever built a UI from scratch."
  },
  {
    id: 25,
    title: "Google Fonts",
    subject: "Free Web Fonts",
    url: "https://fonts.google.com",
    category: "Frontend & UI Tools",
    icon: "type",
    description: "Free, high-quality web fonts used in nearly every web project. Browse, pair, and copy the embed code directly. The default answer to typography for any developer building a frontend."
  },
  {
    id: 26,
    title: "Flexbox Froggy",
    subject: "Interactive Flexbox Learning",
    url: "https://flexboxfroggy.com",
    category: "Frontend & UI Tools",
    icon: "align-center",
    description: "Learn CSS Flexbox by moving frogs to lily pads through 24 progressively harder levels. The most fun and effective way to finally understand flex properties without reading dry documentation."
  },
  {
    id: 27,
    title: "Get Waves",
    subject: "SVG Wave Generator",
    url: "https://getwaves.io",
    category: "Frontend & UI Tools",
    icon: "activity",
    description: "Generate smooth, customizable SVG wave dividers for landing pages and portfolios. Drag a slider, copy production-ready SVG code. Looks polished in under a minute — no design tool needed."
  },
  {
    id: 28,
    title: "Clippy",
    subject: "CSS Clip-Path Generator",
    url: "https://bennettfeely.com/clippy",
    category: "Frontend & UI Tools",
    icon: "scissors",
    description: "Visually create complex CSS clip-path shapes by dragging points on a canvas. Eliminates all trial-and-error of writing raw polygon coordinates. Great for hero sections and image masks."
  },

  // AI & Productivity
  {
    id: 29,
    title: "Napkin AI",
    subject: "AI Text-to-Diagram Tool",
    url: "https://app.napkin.ai",
    category: "AI & Productivity",
    icon: "brain",
    description: "Paste any technical notes and Napkin AI converts them into clean diagrams and visuals automatically. Turns documentation and design notes into shareable architecture visuals with zero effort."
  },
  {
    id: 30,
    title: "Gamma",
    subject: "AI-Powered Presentations",
    url: "https://gamma.app",
    category: "AI & Productivity",
    icon: "presentation",
    description: "Generate polished presentations from a prompt or bullet points. The fastest way to create project demos, tech talks, or portfolio case studies — without spending hours in PowerPoint."
  },

];

export default websites;