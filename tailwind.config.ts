import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

/**
 * ChemVerse — "Paper & Reagent" design system.
 *
 * Colour is a semantic layer over the CSS custom properties declared in
 * src/index.css, so light/dark theming is handled entirely by swapping
 * variables rather than duplicating utility classes.
 */
export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  // Element-category and mark-weight colours are resolved at runtime from data,
  // so the JIT compiler cannot see them in source. Keep this list tight.
  safelist: [
    {
      pattern: /(bg|text|border|ring|from|to)-(cobalt|iris|magenta|cyanine|viridian|saffron|copper|crimson|moss|plum)/,
    },
  ],
  theme: {
    container: {
      center: true,
      padding: "1.25rem",
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["'IBM Plex Sans'", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["'IBM Plex Mono'", "ui-monospace", "SFMono-Regular", "monospace"],
        display: ["'Instrument Serif'", "Georgia", "serif"],
      },
      fontSize: {
        // Tightened display sizes — headlines are set in the serif face.
        "display-sm": ["2.25rem", { lineHeight: "1.1", letterSpacing: "-0.015em" }],
        "display-md": ["3rem", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-lg": ["4rem", { lineHeight: "1", letterSpacing: "-0.025em" }],
        "display-xl": ["5rem", { lineHeight: "0.98", letterSpacing: "-0.03em" }],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent-muted))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },

        /* Categorical pigment palette — colour only where it carries meaning. */
        cobalt: "hsl(var(--cobalt))",
        iris: "hsl(var(--iris))",
        magenta: "hsl(var(--magenta))",
        cyanine: "hsl(var(--cyanine))",
        viridian: "hsl(var(--viridian))",
        saffron: "hsl(var(--saffron))",
        copper: "hsl(var(--copper))",
        crimson: "hsl(var(--crimson))",
        moss: "hsl(var(--moss))",
        plum: "hsl(var(--plum))",

        atom: {
          background: "hsl(var(--atom-background))",
          proton: "hsl(var(--atom-proton))",
          "proton-foreground": "hsl(var(--atom-proton-foreground))",
          neutron: "hsl(var(--atom-neutron))",
          "neutron-foreground": "hsl(var(--atom-neutron-foreground))",
          electron: "hsl(var(--atom-electron))",
          "electron-glow": "hsl(var(--atom-electron-glow))",
          orbit: "hsl(var(--atom-orbit))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        // Two restrained levels. Separation is carried by hairline borders.
        xs: "0 1px 2px 0 hsl(24 20% 8% / 0.05)",
        sm: "0 1px 3px 0 hsl(24 20% 8% / 0.07), 0 1px 2px -1px hsl(24 20% 8% / 0.04)",
        md: "0 4px 16px -4px hsl(24 20% 8% / 0.10), 0 2px 4px -2px hsl(24 20% 8% / 0.05)",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.2, 0, 0, 1)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(6px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s cubic-bezier(0.2, 0, 0, 1)",
        "accordion-up": "accordion-up 0.2s cubic-bezier(0.2, 0, 0, 1)",
        "fade-up": "fade-up 0.32s cubic-bezier(0.2, 0, 0, 1) both",
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
