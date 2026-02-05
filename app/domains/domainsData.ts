export type DomainStatus = 'established' | 'pivoting';

export type DomainSlug =
  | 'fullstack-web'
  | 'mobile-crossplatform'
  | 'accessibility'
  | 'realtime-multiplayer'
  | 'i18n-l10n'
  | 'edtech-language'
  | 'climate-tech'
  | 'ai-engineering'
  | 'data-engineering'
  | 'solution-architecting';

export interface Domain {
  slug: DomainSlug;
  title: string;
  shortDescription: string; // For cards
  status: DomainStatus;

  // Hero section
  heroImage: string;
  heroTagline: string;
  missionStatement: string;

  // Content sections
  expertiseAreas: string[];
  experience: {
    company?: string;
    role?: string;
    year?: string;
    description: string;
    highlight?: string;
  }[];
  journey: {
    title: string;
    paragraphs: string[];
  };
  certifications?: {
    name: string;
    issuer: string;
    year?: string;
    url?: string;
    status?: 'completed' | 'in-progress' | 'planned';
  }[];
  resources?: {
    title: string;
    type: 'blog' | 'project' | 'course' | 'talk';
    url?: string;
    date?: string;
    description: string;
  }[];

  // Visual & metadata
  iconColor: 'sage' | 'plum' | 'rose' | 'earth';
  relatedProjectIds: string[];
  ctaText?: string;
  metaDescription: string;
}

export const domains: Domain[] = [
  // ============================================================================
  // ESTABLISHED EXPERTISE (6)
  // ============================================================================

  {
    slug: 'fullstack-web',
    title: 'Full-Stack Web Development',
    shortDescription: 'Building scalable, modern web applications from frontend to backend',
    status: 'established',
    heroImage: '/images/domains/fullstack-web.jpg',
    heroTagline: 'Building the web that works for everyone',
    missionStatement:
      'I create robust, scalable web applications that deliver exceptional user experiences while maintaining clean, maintainable code.',
    expertiseAreas: [
      'React, Next.js, TypeScript for modern frontend development',
      'Node.js, Express for scalable backend systems',
      'RESTful API design and GraphQL implementation',
      'Database design (PostgreSQL, MongoDB)',
      'Authentication & authorization (OAuth, JWT)',
      'DevOps and CI/CD pipelines',
    ],
    experience: [
      {
        company: 'Hack Reactor',
        role: 'Software Engineering Immersive',
        year: '2020',
        description:
          'Built multiple full-stack applications using React, Node.js, and various databases. Learned industry best practices for code quality and collaboration.',
        highlight:
          'Created 3 production-ready applications in 12 weeks',
      },
      {
        description:
          'Developed this portfolio website using Next.js 16 with Google OAuth authentication, server components, and responsive design',
        highlight:
          'Implemented private dashboard with OAuth integration',
      },
    ],
    journey: {
      title: 'From Curiosity to Craft',
      paragraphs: [
        "My journey into full-stack development started with a simple question: How do websites actually work? That curiosity led me to Hack Reactor's software engineering bootcamp, where I discovered my passion for building things that live on the web.",
        "What I love most about full-stack development is the complete picture—understanding how data flows from the database through the backend, into the frontend, and ultimately to the user. There's something deeply satisfying about architecting a system end-to-end and seeing it come to life.",
        "Over the years, I've built everything from simple static sites to complex real-time multiplayer applications. Each project taught me something new, and I'm constantly amazed by how much there still is to learn in this ever-evolving field.",
      ],
    },
    iconColor: 'sage',
    relatedProjectIds: [
      'precourse-asteroids',
      'board-race-ting-xie',
      'tic-tac-toe',
    ],
    ctaText: "Let's build something amazing together",
    metaDescription:
      'Experienced full-stack developer specializing in React, Next.js, Node.js, and modern web technologies. Building scalable applications with clean, maintainable code.',
  },

  {
    slug: 'mobile-crossplatform',
    title: 'Mobile & Cross-Platform Development',
    shortDescription: 'Native mobile experiences with React Native and cross-platform tools',
    status: 'established',
    heroImage: '/images/domains/mobile-crossplatform.jpg',
    heroTagline: 'Write once, run anywhere—without compromise',
    missionStatement:
      'I build mobile applications that feel native on every platform while maximizing code reuse and developer efficiency.',
    expertiseAreas: [
      'React Native for iOS and Android development',
      'Expo for rapid mobile prototyping',
      'Mobile UI/UX best practices',
      'Native module integration',
      'Cross-platform state management',
      'Mobile performance optimization',
    ],
    experience: [
      {
        description:
          'Built React Native applications with Expo, integrating native features like camera, location, and push notifications',
        highlight:
          'Achieved 95%+ code sharing between iOS and Android',
      },
      {
        description:
          'Developed cross-platform educational games with Unity and React Native integration',
        highlight:
          'Successfully bridged Unity game engine with React Native UI',
      },
    ],
    journey: {
      title: 'Mobile-First Mindset',
      paragraphs: [
        "In today's world, mobile isn't just important—it's primary. More users access applications from their phones than from desktops, which means mobile development isn't optional; it's essential.",
        "I fell in love with React Native because it allows me to leverage my web development skills to create truly native mobile experiences. The ability to write once and deploy to both iOS and Android without sacrificing quality is incredibly powerful.",
        "Through Expo, I've learned to move fast without breaking things, rapidly prototyping ideas and getting them into users' hands. Mobile development taught me to think about performance, battery life, and limited screen real estate in ways that made me a better developer overall.",
      ],
    },
    iconColor: 'plum',
    relatedProjectIds: [],
    ctaText: 'Bring your app idea to life',
    metaDescription:
      'React Native and cross-platform mobile developer. Building native mobile experiences for iOS and Android with Expo, React Native, and modern mobile development tools.',
  },

  {
    slug: 'accessibility',
    title: 'Accessibility',
    shortDescription: 'Inclusive design for neurodivergent and BLV communities',
    status: 'established',
    heroImage: '/images/domains/accessibility.jpg',
    heroTagline: 'Technology that works for everyone',
    missionStatement:
      'I design and build accessible applications that serve neurodivergent (autism/ADHD) and blind/low-vision communities, ensuring technology is truly inclusive.',
    expertiseAreas: [
      'WCAG 2.1 AA/AAA compliance',
      'Screen reader optimization (NVDA, JAWS, VoiceOver)',
      'Keyboard navigation and focus management',
      'Color contrast and visual accessibility',
      'Cognitive accessibility for neurodivergent users',
      'Accessible Rich Internet Applications (ARIA)',
    ],
    experience: [
      {
        description:
          'Implemented comprehensive accessibility features across web applications, including semantic HTML, ARIA labels, and keyboard navigation',
        highlight:
          'Achieved WCAG 2.1 AA compliance on all projects',
      },
      {
        description:
          'Designed user interfaces with neurodivergent users in mind, focusing on clear visual hierarchies, reduced cognitive load, and predictable interactions',
        highlight:
          'Received positive feedback from neurodivergent beta testers',
      },
    ],
    journey: {
      title: 'Building For All',
      paragraphs: [
        "Accessibility isn't a feature—it's a fundamental human right. As someone who cares deeply about inclusion, I've made it my mission to ensure that the applications I build work for everyone, regardless of their abilities.",
        "I've learned that accessibility isn't just about checking boxes or meeting compliance standards. It's about understanding how different people interact with technology and designing thoughtfully for those experiences.",
        "Working with screen readers, testing with keyboard-only navigation, and considering cognitive accessibility has made me a more empathetic developer. Every project is an opportunity to make the digital world more inclusive.",
      ],
    },
    iconColor: 'rose',
    relatedProjectIds: [],
    ctaText: 'Create accessible experiences together',
    metaDescription:
      'Accessibility specialist focused on WCAG compliance and inclusive design for neurodivergent and blind/low-vision communities. Building technology that works for everyone.',
  },

  {
    slug: 'realtime-multiplayer',
    title: 'Real-Time & Multiplayer Systems',
    shortDescription: 'Building real-time collaboration and multiplayer experiences',
    status: 'established',
    heroImage: '/images/domains/realtime-multiplayer.jpg',
    heroTagline: 'Connecting people in real time',
    missionStatement:
      'I create real-time systems that enable seamless multiplayer experiences, live collaboration, and instant communication.',
    expertiseAreas: [
      'WebSocket implementation with Socket.io',
      'Real-time data synchronization',
      'Room management and matchmaking',
      'Video streaming and WebRTC',
      'Conflict resolution and state management',
      'Low-latency architecture',
    ],
    experience: [
      {
        company: 'Board Race! Ting Xie!',
        description:
          'Built a real-time multiplayer handwriting game using Socket.io with room management, player synchronization, and live scoring',
        highlight:
          'Supported concurrent multiplayer rooms with <100ms latency',
      },
      {
        description:
          'Implemented real-time collaboration features for web applications, enabling multiple users to interact simultaneously',
        highlight:
          'Handled state synchronization across distributed clients',
      },
    ],
    journey: {
      title: 'The Magic of Real-Time',
      paragraphs: [
        "There's something magical about real-time applications. The moment when you see another person's actions reflected instantly on your screen, the feeling of presence despite physical distance—it's incredibly powerful.",
        "Building my first multiplayer game taught me that real-time systems are deceptively complex. You're not just moving data—you're synchronizing state across unreliable networks, handling disconnections gracefully, and ensuring a smooth experience even under challenging conditions.",
        "I love the challenge of real-time development: balancing performance with accuracy, managing concurrent state, and creating that seamless feeling of connection. Every millisecond matters, and the technical constraints push me to write more efficient, elegant code.",
      ],
    },
    iconColor: 'sage',
    relatedProjectIds: ['board-race-ting-xie'],
    ctaText: 'Build real-time experiences together',
    metaDescription:
      'Real-time and multiplayer systems developer. Expert in Socket.io, WebSockets, real-time data synchronization, and building low-latency collaborative experiences.',
  },

  {
    slug: 'i18n-l10n',
    title: 'Internationalization & Localization',
    shortDescription: 'Building globally accessible applications with i18n/l10n',
    status: 'established',
    heroImage: '/images/domains/i18n-l10n.jpg',
    heroTagline: 'Breaking language barriers through technology',
    missionStatement:
      'I build applications that speak to users in their native language, leveraging my Mandarin fluency and cross-cultural experience.',
    expertiseAreas: [
      'i18n framework implementation (react-i18next, next-intl)',
      'Translation management and workflow',
      'Cultural adaptation beyond translation',
      'RTL (right-to-left) language support',
      'Locale-specific formatting (dates, numbers, currency)',
      'Mandarin Chinese fluency',
    ],
    experience: [
      {
        company: 'Board Race! Ting Xie!',
        description:
          'Built a bilingual handwriting game supporting both English and Chinese interfaces with culturally appropriate content',
        highlight:
          'Integrated Chinese character recognition with Google Cloud Vision API',
      },
      {
        description:
          'Implemented comprehensive i18n solutions for web applications, managing translation workflows and locale-specific content',
        highlight:
          'Supported multiple languages with dynamic locale switching',
      },
    ],
    journey: {
      title: 'Speaking the Language',
      paragraphs: [
        "Growing up between cultures and learning Mandarin gave me a deep appreciation for how language shapes our experience of technology. A good translation isn't just about swapping words—it's about understanding cultural context and user expectations.",
        "I've seen firsthand how poorly localized software can alienate users. Numbers formatted incorrectly, dates that don't make sense, or translations that are technically accurate but culturally tone-deaf. These details matter.",
        "Building internationalized applications is about more than just technical implementation. It's about respect for users' cultures and languages, and a commitment to making technology that feels native no matter where you are in the world.",
      ],
    },
    iconColor: 'plum',
    relatedProjectIds: ['board-race-ting-xie'],
    ctaText: 'Go global with your application',
    metaDescription:
      'Internationalization and localization specialist with Mandarin Chinese fluency. Building globally accessible applications with proper i18n/l10n implementation.',
  },

  {
    slug: 'edtech-language',
    title: 'Ed-Tech (Language Learning)',
    shortDescription: 'Educational technology for foreign language acquisition',
    status: 'established',
    heroImage: '/images/domains/edtech-language.jpg',
    heroTagline: 'Making language learning interactive and fun',
    missionStatement:
      'I create engaging educational technology that makes foreign language learning more accessible, interactive, and effective.',
    expertiseAreas: [
      'Gamification of learning experiences',
      'Interactive language practice tools',
      'Handwriting recognition technology',
      'Progress tracking and analytics',
      'Adaptive learning systems',
      'Educational game design',
    ],
    experience: [
      {
        company: 'Board Race! Ting Xie!',
        role: 'Creator & Developer',
        description:
          'Built an interactive multiplayer handwriting game for language learners, integrating handwriting recognition, real-time competition, and progress tracking',
        highlight:
          'Created engaging practice for character writing through gamification',
      },
      {
        description:
          'Designed educational experiences that balance fun with effective learning, using game mechanics to motivate practice and retention',
        highlight:
          'Applied research-based learning principles to game design',
      },
    ],
    journey: {
      title: 'Learning Through Play',
      paragraphs: [
        "Learning a language is hard. Trust me—I've learned Mandarin, and I know the struggle of mastering characters, tones, and grammar. Traditional methods can be tedious, which is why I'm passionate about making language learning more engaging.",
        "Board Race! Ting Xie! was born from my own experience: I needed to practice writing Chinese characters, but copying them over and over was boring. What if I could turn practice into a game? What if competing with others could make it fun?",
        "Educational technology at its best doesn't feel like studying—it feels like playing. By combining my language learning experience with my development skills, I'm able to create tools that actually make people want to practice. That's the sweet spot where learning happens.",
      ],
    },
    iconColor: 'earth',
    relatedProjectIds: ['board-race-ting-xie'],
    ctaText: 'Transform learning experiences',
    metaDescription:
      'Educational technology developer specializing in language learning tools. Building interactive, gamified experiences for foreign language acquisition.',
  },

  // ============================================================================
  // ACTIVELY PIVOTING INTO (4)
  // ============================================================================

  {
    slug: 'climate-tech',
    title: 'Climate Tech',
    shortDescription: 'Applying full-stack skills to environmental solutions',
    status: 'pivoting',
    heroImage: '/images/domains/climate-tech.jpg',
    heroTagline: 'Building technology for a sustainable future',
    missionStatement:
      "I'm applying my full-stack development expertise to climate solutions, building technology that helps address the environmental crisis.",
    expertiseAreas: [
      'Applying full-stack web development to climate solutions',
      'Data visualization for environmental metrics',
      'IoT integration for environmental monitoring',
      'Building tools for sustainability tracking',
      'Contributing to climate tech initiatives',
      'Learning climate science fundamentals',
    ],
    experience: [
      {
        description:
          'Currently building projects that apply my technical skills to environmental challenges',
        highlight:
          'Exploring carbon tracking, sustainability dashboards, and climate data visualization',
      },
      {
        description:
          'Participating in climate tech communities and learning from domain experts',
        highlight:
          'Connecting with climate tech startups and open-source projects',
      },
    ],
    journey: {
      title: 'Code for the Planet',
      paragraphs: [
        "Climate change is the defining challenge of our generation, and I refuse to sit on the sidelines. As a developer, I have skills that can make a difference—whether it's building tools for carbon tracking, creating platforms for sustainable supply chains, or visualizing environmental data.",
        "I'm in the early stages of this pivot, but I'm approaching it with the same intensity I've brought to every other domain I've mastered. I'm learning climate science, connecting with people in the field, and actively building projects that matter.",
        "This isn't just a career pivot—it's a mission. I want to look back in 20 years and know that my technical skills contributed to solving real environmental problems. The planet can't wait, and neither can I.",
      ],
    },
    certifications: [
      {
        name: 'Climate Change: From Learning to Action',
        issuer: 'edX / MIT',
        status: 'planned',
        url: 'https://www.edx.org/learn/climate-change',
      },
      {
        name: 'Sustainable Development Goals',
        issuer: 'UN SDG Academy',
        status: 'in-progress',
      },
    ],
    resources: [
      {
        title: 'Building a Carbon Footprint Tracker',
        type: 'project',
        description:
          'Weekly project building a personal carbon tracking application',
        date: '2026-02',
      },
    ],
    iconColor: 'sage',
    relatedProjectIds: [],
    ctaText: 'Join me in building for the planet',
    metaDescription:
      'Full-stack developer pivoting into climate tech. Applying web development skills to environmental solutions, sustainability tracking, and climate data visualization.',
  },

  {
    slug: 'ai-engineering',
    title: 'AI Engineering',
    shortDescription: 'Machine learning, LLMs, and AI system integration',
    status: 'pivoting',
    heroImage: '/images/domains/ai-engineering.jpg',
    heroTagline: 'Building intelligent systems that augment human capability',
    missionStatement:
      "I'm mastering AI engineering to build intelligent systems that solve real problems, from LLM integration to machine learning pipelines.",
    expertiseAreas: [
      'Large Language Model (LLM) integration',
      'Prompt engineering and AI workflows',
      'Machine learning fundamentals',
      'AI-powered application development',
      'Vector databases and embeddings',
      'Building with OpenAI, Anthropic APIs',
    ],
    experience: [
      {
        description:
          'Building AI-powered applications using modern LLM APIs and frameworks',
        highlight:
          'Integrating Claude, GPT-4, and other AI models into web applications',
      },
      {
        description:
          'Experimenting with vector databases, RAG (Retrieval-Augmented Generation), and AI-powered search',
        highlight:
          'Building prototype applications that leverage AI for enhanced user experiences',
      },
    ],
    journey: {
      title: 'The AI Revolution',
      paragraphs: [
        "AI isn't the future—it's the present. The rapid advancement of LLMs and machine learning has fundamentally changed what's possible in software development, and I'm committed to being at the forefront of this transformation.",
        "I'm approaching AI engineering with both excitement and responsibility. These tools are incredibly powerful, but they require thoughtful implementation. I'm learning not just how to use AI, but when to use it, and how to build systems that are transparent and beneficial.",
        "Every week, I'm building projects that push my understanding further. From chatbot interfaces to AI-powered code analysis, I'm applying my full-stack foundation to create intelligent systems that actually help people.",
      ],
    },
    certifications: [
      {
        name: 'Machine Learning Specialization',
        issuer: 'DeepLearning.AI / Coursera',
        status: 'in-progress',
        url: 'https://www.coursera.org/specializations/machine-learning',
      },
      {
        name: 'LangChain for LLM Application Development',
        issuer: 'DeepLearning.AI',
        status: 'planned',
      },
    ],
    resources: [
      {
        title: 'Grid Intelligence Platform - ML Models',
        type: 'project',
        description:
          'Training and deploying ML models for load forecasting, renewable generation prediction, and price spike detection using scikit-learn, XGBoost, and LightGBM',
        date: '2026-02',
        url: 'https://github.com/yourusername/grid-intelligence-platform',
      },
    ],
    iconColor: 'plum',
    relatedProjectIds: [],
    ctaText: 'Explore AI possibilities together',
    metaDescription:
      'AI engineering specialist building LLM-powered applications. Learning machine learning, prompt engineering, and intelligent system development.',
  },

  {
    slug: 'data-engineering',
    title: 'Data Engineering',
    shortDescription: 'Data pipelines, analytics, and data-driven systems',
    status: 'pivoting',
    heroImage: '/images/domains/data-engineering.jpg',
    heroTagline: 'Turning data into actionable insights',
    missionStatement:
      "I'm building expertise in data engineering to create robust pipelines, efficient analytics systems, and data-driven applications.",
    expertiseAreas: [
      'Data pipeline design and implementation',
      'SQL optimization and database performance',
      'ETL/ELT processes',
      'Data warehousing concepts',
      'Analytics and business intelligence',
      'Working with big data tools',
    ],
    experience: [
      {
        description:
          'Building data pipelines for web applications, handling data ingestion, transformation, and storage',
        highlight:
          'Implementing efficient data flows for analytics and reporting',
      },
      {
        description:
          'Learning modern data engineering tools and best practices through hands-on projects',
        highlight:
          'Exploring Apache Airflow, dbt, and cloud data platforms',
      },
    ],
    journey: {
      title: 'Data-Driven Development',
      paragraphs: [
        "Every great application is built on great data. I've realized that understanding data engineering isn't optional for modern developers—it's essential. Whether you're building analytics dashboards or training ML models, you need reliable data pipelines.",
        "I'm fascinated by the challenge of making data work at scale. How do you handle millions of records efficiently? How do you ensure data quality? How do you build systems that are both fast and reliable? These questions drive my learning.",
        "My goal is to become the kind of developer who can architect complete solutions—from data ingestion to backend processing to frontend visualization. Data engineering is the missing piece that ties it all together.",
      ],
    },
    certifications: [
      {
        name: 'Data Engineering Foundations',
        issuer: 'DataCamp',
        status: 'in-progress',
      },
      {
        name: 'Advanced SQL for Data Analysis',
        issuer: 'Mode Analytics',
        status: 'planned',
      },
    ],
    resources: [
      {
        title: 'Grid Intelligence Platform - Data Pipeline',
        type: 'project',
        description:
          'Building data pipelines with Dagster and dbt to ingest real-time energy data from CAISO/PJM, transform raw grid data, and maintain data quality with automated monitoring',
        date: '2026-01',
        url: 'https://github.com/yourusername/grid-intelligence-platform',
      },
    ],
    iconColor: 'earth',
    relatedProjectIds: [],
    ctaText: 'Build data systems together',
    metaDescription:
      'Data engineering specialist learning pipeline design, ETL processes, and analytics. Building efficient data systems and data-driven applications.',
  },

  {
    slug: 'solution-architecting',
    title: 'Solution Architecting',
    shortDescription: 'System design, architecture, and technical leadership',
    status: 'pivoting',
    heroImage: '/images/domains/solution-architecting.jpg',
    heroTagline: 'Designing systems that scale',
    missionStatement:
      "I'm developing architectural thinking to design scalable, maintainable systems and provide technical leadership.",
    expertiseAreas: [
      'System design and architecture patterns',
      'Scalability and performance optimization',
      'Microservices vs monolithic architecture',
      'Cloud architecture (AWS, GCP, Azure)',
      'Technical decision-making and trade-offs',
      'Documentation and architectural diagrams',
    ],
    experience: [
      {
        description:
          'Architecting full-stack applications from scratch, making decisions about structure, patterns, and technologies',
        highlight:
          'Designed and implemented complete application architectures',
      },
      {
        description:
          'Learning system design through practice: designing scalable APIs, choosing appropriate databases, and planning for growth',
        highlight:
          'Applying architectural principles to real-world projects',
      },
    ],
    journey: {
      title: 'Thinking at Scale',
      paragraphs: [
        "There's a difference between writing code and architecting systems. I've spent years as an implementer, and now I'm deliberately developing the skills to think architecturally—to see the big picture and design systems that will scale.",
        "I'm learning to ask the right questions before writing a single line of code. What are the performance requirements? How will this system grow? What are the failure modes? What's the right level of abstraction? These questions separate good developers from great architects.",
        "My goal is to become a technical leader who can guide teams through complex architectural decisions. I'm studying system design, reading architecture documentation from major companies, and practicing by designing systems end-to-end.",
      ],
    },
    certifications: [
      {
        name: 'AWS Solutions Architect Associate',
        issuer: 'Amazon Web Services',
        status: 'planned',
      },
      {
        name: 'System Design Interview',
        issuer: 'ByteByteGo / Alex Xu',
        status: 'in-progress',
      },
    ],
    resources: [
      {
        title: 'Grid Intelligence Platform - System Architecture',
        type: 'project',
        description:
          'Designing and implementing a FastAPI prediction service with batch and real-time inference patterns, monitoring, data quality checks, and comprehensive documentation',
        date: '2026-01',
        url: 'https://github.com/yourusername/grid-intelligence-platform',
      },
    ],
    iconColor: 'rose',
    relatedProjectIds: [],
    ctaText: 'Design scalable systems together',
    metaDescription:
      'Solution architect learning system design, scalability patterns, and technical leadership. Designing maintainable, scalable systems and applications.',
  },
];

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

export function getDomainBySlug(slug: string): Domain | undefined {
  return domains.find((d) => d.slug === slug);
}

export function getEstablishedDomains(): Domain[] {
  return domains.filter((d) => d.status === 'established');
}

export function getPivotDomains(): Domain[] {
  const pivotDomains = domains.filter((d) => d.status === 'pivoting');
  // Sort to prioritize AI and Data Engineering first
  const order = ['ai-engineering', 'data-engineering', 'solution-architecting', 'climate-tech'];
  return pivotDomains.sort((a, b) => {
    const indexA = order.indexOf(a.slug);
    const indexB = order.indexOf(b.slug);
    return indexA - indexB;
  });
}
