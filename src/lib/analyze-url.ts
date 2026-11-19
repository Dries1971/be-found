/**
 * Local validation of a page address before it costs an API call.
 * Accepts "example.com/page" too (https:// is added). Returns the
 * normalized href, or null when it can never be a public web page.
 * The API does the authoritative checks (DNS, private ranges, robots).
 */
export function normalizeAnalysisUrl(input: string): string | null {
  const value = input.trim();
  if (!value || value.length > 2048) return null;

  const withScheme = /^[a-z][a-z0-9+.-]*:\/\//i.test(value)
    ? value
    : `https://${value}`;

  let parsed: URL;
  try {
    parsed = new URL(withScheme);
  } catch {
    return null;
  }

  if (parsed.protocol !== "https:" && parsed.protocol !== "http:") return null;
  if (parsed.username || parsed.password) return null;
  if (parsed.port && parsed.port !== "80" && parsed.port !== "443") return null;

  const host = parsed.hostname;
  // Needs a real domain: no bare hostnames, no IP literals, no localhost.
  if (!host.includes(".") || host.endsWith(".")) return null;
  if (/^\d{1,3}(\.\d{1,3}){3}$/.test(host) || host.startsWith("[")) return null;
  if (host === "localhost" || host.endsWith(".localhost") || host.endsWith(".local")) {
    return null;
  }

  parsed.hash = "";
  return parsed.href;
}
