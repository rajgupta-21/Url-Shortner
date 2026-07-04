/**
 * Very small user-agent based device detection.
 * Returns one of the values allowed by the Click schema.
 */
export function detectDevice(
  userAgent: string,
): "Mobile" | "Tablet" | "Desktop" | "Bot" {
  const ua = userAgent.toLowerCase();

  if (/bot|crawler|spider|crawling/.test(ua)) {
    return "Bot";
  }

  if (/ipad|tablet/.test(ua)) {
    return "Tablet";
  }

  if (/mobile|android|iphone|ipod/.test(ua)) {
    return "Mobile";
  }

  return "Desktop";
}
