// Path mappings between English and Chinese pinyin URLs
export const pathMappings = {
  // English path : Chinese pinyin path
  '/': '/',
  '/about': '/guanyu-wo',
  '/projects': '/xiangmu',
  '/journey': '/lvcheng',  // Note: lü -> lv
  '/interests': '/xingqu',
  '/contact': '/lianxi',
  '/profile': '/geren',
  '/domains': '/lingyu',
  '/auth/signin': '/auth/denglu',
  '/auth/signout': '/auth/tuichu',
  '/private': '/siren',
  '/booking': '/yuyue',
} as const;

// Reverse mapping for middleware rewrites
export const chineseToEnglishPaths: Record<string, string> = Object.entries(pathMappings).reduce(
  (acc, [en, zh]) => {
    if (en !== zh) {
      acc[zh] = en;
    }
    return acc;
  },
  {} as Record<string, string>
);

// Get the appropriate path based on locale
export function getLocalizedPath(path: string, locale: 'en' | 'zh'): string {
  if (locale === 'zh') {
    return (pathMappings as Record<string, string>)[path] || path;
  }
  return path;
}

// Get the English path from a Chinese path
export function getEnglishPath(path: string): string {
  return chineseToEnglishPaths[path] || path;
}
