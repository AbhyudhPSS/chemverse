import { Github, Globe, Linkedin, Mail } from "lucide-react";
import { Link } from "react-router-dom";

import Logo from "@/components/layout/Logo";

const columns = [
  {
    heading: "Study",
    links: [
      { to: "/class9", label: "Class 9 (NCERT)" },
      { to: "/class10", label: "Class 10 (NCERT)" },
      { to: "/class11", label: "Class 11 (NCERT)" },
      { to: "/class12", label: "Class 12 (NCERT)" },
      { to: "/learn", label: "AP Chemistry" },
      { to: "/quiz", label: "Quiz" },
    ],
  },
  {
    heading: "Reference",
    links: [
      { to: "/explore", label: "Periodic table" },
      { to: "/experiments", label: "Lab & calculators" },
    ],
  },
];

const socials = [
  { href: "https://github.com/AbhyudhPSS", label: "GitHub", icon: Github },
  {
    href: "https://www.linkedin.com/in/abhyudh-p-s-solanki-62443828a/",
    label: "LinkedIn",
    icon: Linkedin,
  },
  { href: "https://abhyudhsolanki.in", label: "Website", icon: Globe },
  { href: "mailto:abhyudhsolanki@gmail.com", label: "Email", icon: Mail },
];

const Footer = () => (
  <footer className="mt-24 border-t border-border">
    <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4">
      <div className="lg:col-span-2">
        <Logo />
        <p className="measure mt-4 text-sm leading-relaxed text-muted-foreground">
          A free, open study reference for secondary and introductory university chemistry — the
          periodic table, worked notes, lab activities and practice questions in one place.
        </p>
      </div>

      {columns.map((col) => (
        <nav key={col.heading} aria-label={col.heading}>
          <h2 className="eyebrow">{col.heading}</h2>
          <ul className="mt-4 space-y-2.5">
            {col.links.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ))}

      <div>
        <h2 className="eyebrow">Creator</h2>
        <p className="mt-4 text-sm text-muted-foreground">Abhyudh PS Solanki</p>
        <ul className="mt-4 flex items-center gap-3">
          {socials.map(({ href, label, icon: Icon }) => (
            <li key={label}>
              <a
                href={href}
                target={href.startsWith("mailto:") ? undefined : "_blank"}
                rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                aria-label={label}
                title={label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
              >
                <Icon className="h-4 w-4" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>

    <div className="border-t border-border">
      <div className="mx-auto max-w-6xl px-5 py-6 text-xs text-muted-foreground">
        <p>
          © {new Date().getFullYear()} Abhyudh PS Solanki. All rights reserved. ChemVerse is an
          educational project by Abhyudh PS Solanki.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
