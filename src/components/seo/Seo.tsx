import { useEffect } from "react";

const SITE_NAME = "ChemVerse";

interface SeoProps {
  /** Page-specific title. Rendered as "<title> · ChemVerse". */
  title: string;
  description: string;
  /** Route path used to build the canonical URL, e.g. "/class10". */
  path?: string;
}

const setMeta = (selector: string, attr: "name" | "property", key: string, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

/**
 * Minimal, dependency-free document metadata for a client-rendered SPA.
 * Canonical URLs are derived from the live origin so no domain is hardcoded.
 */
const Seo = ({ title, description, path }: SeoProps) => {
  useEffect(() => {
    const fullTitle = title === SITE_NAME ? title : `${title} · ${SITE_NAME}`;
    document.title = fullTitle;

    setMeta('meta[name="description"]', "name", "description", description);
    setMeta('meta[property="og:title"]', "property", "og:title", fullTitle);
    setMeta('meta[property="og:description"]', "property", "og:description", description);
    setMeta('meta[property="og:site_name"]', "property", "og:site_name", SITE_NAME);
    setMeta('meta[name="twitter:title"]', "name", "twitter:title", fullTitle);
    setMeta('meta[name="twitter:description"]', "name", "twitter:description", description);

    if (typeof window !== "undefined") {
      const href = `${window.location.origin}${path ?? window.location.pathname}`;
      setMeta('meta[property="og:url"]', "property", "og:url", href);

      // Most scrapers require an absolute image URL; resolve it against the live origin.
      const image = `${window.location.origin}/og.png`;
      setMeta('meta[property="og:image"]', "property", "og:image", image);
      setMeta('meta[name="twitter:image"]', "name", "twitter:image", image);

      let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", "canonical");
        document.head.appendChild(link);
      }
      link.setAttribute("href", href);
    }
  }, [title, description, path]);

  return null;
};

export default Seo;
