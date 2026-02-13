/**
 * Inline script for FOUC prevention.
 * Runs synchronously in <head> before any rendering.
 * Reads theme from localStorage, falls back to system preference.
 */
export const themeScript = `
(function() {
  try {
    var stored = localStorage.getItem('theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var isDark = stored === 'dark' || (!stored && prefersDark);
    document.documentElement.classList.toggle('dark', isDark);
  } catch (e) {}
})();
`;
