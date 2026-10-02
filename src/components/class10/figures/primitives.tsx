import type { ReactNode } from "react";

/* ------------------------------------------------------------------ *
 * Shared apparatus parts for the NCERT activity figures.
 *
 * The figures are schematic line drawings in the style of the textbook:
 * glass is outlined, chemicals carry the colour, and nothing is shaded
 * for its own sake. Everything reads from the design-system variables so
 * the drawings work in both themes.
 * ------------------------------------------------------------------ */

export const INK = "hsl(var(--foreground))";
export const SOFT = "hsl(var(--muted-foreground))";
export const LINE = "hsl(var(--foreground) / 0.5)";
export const GLASS = "hsl(var(--muted) / 0.45)";
export const CLEAR = "hsl(var(--cobalt) / 0.10)";

export interface FigureProps {
  run: boolean;
}

/** A small caption pinned inside the drawing. */
export const Label = ({
  x,
  y,
  children,
  anchor = "middle",
  size = 9,
  fill = SOFT,
}: {
  x: number;
  y: number;
  children: ReactNode;
  anchor?: "start" | "middle" | "end";
  size?: number;
  fill?: string;
}) => (
  <text x={x} y={y} textAnchor={anchor} fontSize={size} fill={fill}>
    {children}
  </text>
);

/** An upright test tube. `level` is the liquid height from the bottom. */
export const TestTube = ({
  x,
  y,
  w = 34,
  h = 96,
  fill,
  level = 0.6,
}: {
  x: number;
  y: number;
  w?: number;
  h?: number;
  fill?: string;
  level?: number;
}) => {
  const r = w / 2;
  const bodyBottom = y + h - r;
  const liquidH = (h - r) * level;
  const clipId = `tt-${x}-${y}`;

  return (
    <g>
      <defs>
        <clipPath id={clipId}>
          <path d={`M${x} ${y} H${x + w} V${bodyBottom} a${r} ${r} 0 0 1 ${-w} 0 Z`} />
        </clipPath>
      </defs>
      <path
        d={`M${x} ${y} H${x + w} V${bodyBottom} a${r} ${r} 0 0 1 ${-w} 0 Z`}
        fill={GLASS}
        stroke={LINE}
        strokeWidth="1.6"
      />
      {fill && (
        <g clipPath={`url(#${clipId})`}>
          <rect
            x={x}
            y={y + h - liquidH}
            width={w}
            height={liquidH}
            fill={fill}
            style={{ transition: "fill 800ms ease, y 800ms ease, height 800ms ease" }}
          />
        </g>
      )}
      <rect x={x - 2} y={y - 3} width={w + 4} height={3.5} rx="1.75" fill={LINE} />
    </g>
  );
};

/** A bunsen burner. The flame only appears when lit. */
export const Burner = ({ x, y, lit }: { x: number; y: number; lit: boolean }) => (
  <g>
    {lit && (
      <g>
        <ellipse cx={x} cy={y - 26} rx="9" ry="19" fill="hsl(var(--saffron))" opacity="0.85">
          <animate attributeName="ry" values="17;21;17" dur="700ms" repeatCount="indefinite" />
        </ellipse>
        <ellipse cx={x} cy={y - 21} rx="4.5" ry="11" fill="hsl(200 90% 70%)" opacity="0.9">
          <animate attributeName="ry" values="9;13;9" dur="700ms" repeatCount="indefinite" />
        </ellipse>
      </g>
    )}
    <rect x={x - 5} y={y - 6} width="10" height="30" fill={SOFT} />
    <path d={`M${x - 20} ${y + 32} H${x + 20} L${x + 14} ${y + 24} H${x - 14} Z`} fill={SOFT} />
  </g>
);

/** Rising bubbles inside a liquid column. */
export const Bubbles = ({
  x,
  fromY,
  toY,
  count = 5,
  spread = 18,
}: {
  x: number;
  fromY: number;
  toY: number;
  count?: number;
  spread?: number;
}) => (
  <g>
    {Array.from({ length: count }).map((_, i) => (
      <circle
        key={i}
        cx={x - spread / 2 + (i * spread) / (count - 1)}
        cy={fromY}
        r={1.5 + (i % 3) * 0.7}
        fill="hsl(var(--background))"
        opacity="0.95"
      >
        <animate attributeName="cy" from={fromY} to={toY} dur={`${1 + i * 0.2}s`} repeatCount="indefinite" />
        <animate attributeName="opacity" values="0;0.95;0" dur={`${1 + i * 0.2}s`} repeatCount="indefinite" />
      </circle>
    ))}
  </g>
);

/** A dropper that releases a drop when active. */
export const Dropper = ({
  x,
  y,
  active,
  dropTo,
  colour = "hsl(var(--crimson))",
}: {
  x: number;
  y: number;
  active: boolean;
  dropTo: number;
  colour?: string;
}) => (
  <g>
    <rect x={x - 5} y={y - 30} width="10" height="20" rx="5" fill={GLASS} stroke={LINE} strokeWidth="1.4" />
    <path d={`M${x - 2.5} ${y - 10} H${x + 2.5} L${x} ${y} Z`} fill={GLASS} stroke={LINE} strokeWidth="1.2" />
    {active && (
      <circle cx={x} cy={y + 3} r="2.6" fill={colour}>
        <animate attributeName="cy" from={y + 3} to={dropTo} dur="900ms" repeatCount="indefinite" />
        <animate attributeName="opacity" values="1;1;0" dur="900ms" repeatCount="indefinite" />
      </circle>
    )}
  </g>
);

/** A right-angled delivery tube from a cork to a second vessel. */
export const DeliveryTube = ({ d }: { d: string }) => (
  <path d={d} fill="none" stroke={LINE} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
);

/** A rubber cork sitting in the mouth of a vessel. */
export const Cork = ({ x, y, w = 26 }: { x: number; y: number; w?: number }) => (
  <path d={`M${x} ${y + 9} L${x + 3} ${y} H${x + w - 3} L${x + w} ${y + 9} Z`} fill={SOFT} />
);
