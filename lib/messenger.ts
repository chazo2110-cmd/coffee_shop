// This shop's default Page; an empty database setting explicitly disables chat.
export const DEFAULT_MESSENGER_URL = 'https://m.me/HarveyJettt';

export function messengerUrl(value: string | undefined): string | null {
  if (!value?.trim()) return null;
  try {
    const url = new URL(value.trim());
    if (url.protocol !== 'https:' || url.username || url.password || url.port) return null;
    const host = url.hostname.toLowerCase();
    if (!['m.me', 'facebook.com', 'www.facebook.com', 'm.facebook.com'].includes(host)) return null;
    const path = url.pathname.replace(/^\/+|\/+$/g, '');
    if (host !== 'm.me' && path === 'profile.php') {
      const id = url.searchParams.get('id');
      return id && /^\d+$/.test(id) ? `https://m.me/${id}` : null;
    }
    if (!/^[a-zA-Z0-9._-]+$/.test(path)) return null;
    if (['groups', 'events', 'share', 'pages', 'watch', 'reel', 'login', 'profile.php'].includes(path.toLowerCase())) return null;
    return `https://m.me/${path}`;
  } catch {
    return null;
  }
}
