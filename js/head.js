/**
 * /js/head.js
 *
 * Centralizes shared <head> includes for a static multi-page site.
 *
 * Responsibilities:
 * - Inject shared external resources (Google Fonts, Font Awesome).
 * - Inject shared site CSS stack (tokens + base + responsive desktop/mobile).
 * - Prevent duplicate injection if the script runs more than once.
 * - Reduce FOUC (flash of unstyled content) when paired with:
 *     <style id="anti-fouc">html{visibility:hidden}</style>
 *   in the page <head>. This script removes that style once key CSS is ready.
 */
(async function injectHead() {
  // Guard against double-injection.
  if (document.documentElement.dataset.headInjected === "true") return;
  document.documentElement.dataset.headInjected = "true";

  /**
   * Removes the anti-FOUC style (if present) and restores visibility.
   * Intended to be safe to call multiple times.
   */
  const killFouc = () => {
    const s = document.getElementById("anti-fouc");
    if (s) s.remove();
    document.documentElement.style.visibility = "";
  };

  /**
   * Returns true if a <link> with the same rel + href already exists in <head>.
   * Used to keep this script idempotent.
   */
  const hasLink = (rel, href) =>
    !!document.head.querySelector(`link[rel="${rel}"][href="${href}"]`);

  /**
   * Appends a <link> element to <head> with the given attributes.
   * - Skips insertion if the same rel+href already exists.
   * - Returns the created element (or null if deduped).
   */
  const appendLink = (attrs) => {
    const rel = attrs.rel;
    const href = attrs.href;
    if (rel && href && hasLink(rel, href)) return null;

    const link = document.createElement("link");
    for (const [k, v] of Object.entries(attrs)) {
      if (v == null) continue;
      if (v === "") link.setAttribute(k, "");
      else link.setAttribute(k, String(v));
    }
    document.head.appendChild(link);
    return link;
  };

  /**
   * Resolves when a <link rel="stylesheet"> finishes loading (or errors).
   * If the stylesheet is already available via link.sheet, resolves immediately.
   */
  const waitFor = (link) =>
    new Promise((res) => {
      if (!link) return res();
      if (link.sheet) return res();
      link.addEventListener("load", res, { once: true });
      link.addEventListener("error", res, { once: true });
    });

  try {
    // Google Font (Funnel Display)
    appendLink({ rel: "preconnect", href: "https://fonts.googleapis.com" });
    appendLink({ rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" });
    const googleFont = appendLink({
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Funnel+Display:wght@300..800&display=swap",
    });

    // Font Awesome (icon font)
    appendLink({ rel: "preconnect", href: "https://cdnjs.cloudflare.com", crossorigin: "" });
    appendLink({
      rel: "preload",
      href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css",
      as: "style",
      crossorigin: "",
    });
    const fontAwesome = appendLink({
      rel: "stylesheet",
      href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css",
    });

    // Site CSS stack
    const tokens = appendLink({ rel: "stylesheet", href: "/css/tokens.css" });
    // main.css composes base + utilities + components (mobile-first modules)
    const main = appendLink({ rel: "stylesheet", href: "/css/main.css" });

    // Responsive split: both are injected, but media controls which applies.
    const isDesktop = window.matchMedia("(min-width: 769px)").matches;
    const desktop = appendLink({
      rel: "stylesheet",
      href: "/css/desktop.css",
      media: "(min-width: 769px)",
    });
    const mobile = appendLink({
      rel: "stylesheet",
      href: "/css/mobile.css",
      media: "(max-width: 768px)",
    });

    /**
     * CSS required for first meaningful paint.
     * Includes the active breakpoint stylesheet and shared assets.
     *
     * Note: If faster reveal preferred with icons/fonts popping in later,
     * remove `fontAwesome` and/or `googleFont` from this list.
     */
    const wanted = [tokens, main, isDesktop ? desktop : mobile, fontAwesome, googleFont].filter(Boolean);

    // Reveal the page when styles are ready or after a safety timeout.
    await Promise.race([
      Promise.all(wanted.map(waitFor)),
      new Promise((res) => setTimeout(res, 1500)),
    ]);

    killFouc();
  } catch (e) {
    // Never leave the page hidden on error.
    console.error("head.js: failed to inject shared head includes", e);
    killFouc();
  }
})();
