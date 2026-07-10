import { routes, type Locale, type Route } from '../content/site';

export type SiteRoute = 'home' | Route;

export function normalizePathname(pathname: string): string {
  const clean = pathname.split(/[?#]/, 1)[0].replace(/\/{2,}/g, '/');
  if (!clean || clean === '/') return '/';
  return `/${clean.replace(/^\/+|\/+$/g, '')}/`;
}

export function getRouteFromPath(pathname: string): SiteRoute | null {
  const normalized = normalizePathname(pathname);
  if (normalized === '/' || normalized === '/en/') return 'home';

  const routeName = normalized.replace(/^\/en\//, '/').replace(/^\//, '').replace(/\/$/, '');
  return routes.includes(routeName as Route) ? routeName as Route : null;
}

export function getLocalizedPath(route: SiteRoute, lang: Locale): string {
  if (route === 'home') return lang === 'en' ? '/en/' : '/';
  return `${lang === 'en' ? '/en' : ''}/${route}/`;
}

export function getAlternateLocalePath(pathname: string, targetLang: Locale): string {
  return getLocalizedPath(getRouteFromPath(pathname) ?? 'home', targetLang);
}
