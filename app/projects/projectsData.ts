export interface Project {
  id: string;
  name: string;
  description: string;
  techStack: string[];
  repoUrl: string;
  type: 'web-app' | 'showcase' | 'empty';
  status: 'active' | 'incomplete' | 'setup-only';
  hasDemo: boolean;
  needsApiKeys?: boolean;
  demoPath?: string;
  demoType?: 'iframe' | 'code' | 'instructions';
}

export const projects: Project[] = [
  {
    id: 'board-race-ting-xie',
    name: 'Board Race! Ting Xie!',
    description: 'An online interactive multi-player/single-player handwriting game for anyone practicing a new language. Test your memory and handwriting skills in Chinese or any other language.',
    techStack: ['React', 'Express', 'Socket.io', 'Google Cloud Vision API', 'Webpack'],
    repoUrl: 'https://github.com/kongaiwen/board-race-ting-xie',
    type: 'web-app',
    status: 'active',
    hasDemo: true,
    needsApiKeys: true,
    // Use environment variable for production URL, fallback to localhost for development
    demoPath: process.env.NEXT_PUBLIC_BOARD_RACE_URL || 'http://localhost:3001',
    demoType: 'iframe',
  },
  {
    id: 'precourse-asteroids',
    name: 'Precourse Asteroids',
    description: 'Hack Reactor seip2006 precourse takes on an Asteroids clone. A classic arcade game recreation built with vanilla JavaScript.',
    techStack: ['JavaScript', 'HTML5 Canvas', 'CSS'],
    repoUrl: 'https://github.com/kongaiwen/precourse-asteroids',
    type: 'web-app',
    status: 'active',
    hasDemo: true,
    needsApiKeys: false,
    demoPath: '/demos/precourse-asteroids/asteroidsgame.html',
    demoType: 'iframe',
  },
  {
    id: 'tic-tac-toe',
    name: 'Tic-Tac-Toe',
    description: 'My first attempt at making a text-based tic-tac-toe game. A Python command-line implementation of the classic game. Play it directly in your browser with an interactive Python console!',
    techStack: ['Python'],
    repoUrl: 'https://github.com/kongaiwen/tic-tac-toe',
    type: 'showcase',
    status: 'active',
    hasDemo: true,
    needsApiKeys: false,
    demoType: 'code',
  },
];
