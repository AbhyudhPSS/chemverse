import type { ReactNode } from "react";

/* Shared drawing helpers for every inline diagram. */

export const Frame = ({
  children,
  caption,
  viewBox,
}: {
  children: ReactNode;
  caption: string;
  viewBox: string;
}) => {
  // Never scale a diagram *up* past its drawn size, or its type balloons and
  // the set stops looking like one family. Narrow diagrams simply centre.
  const intrinsicWidth = Number(viewBox.split(/\s+/)[2]) || undefined;

  return (
    <figure className="my-8">
      <div className="overflow-x-auto rounded-lg border border-border bg-card p-4 sm:p-6">
        <svg
          viewBox={viewBox}
          role="img"
          className="mx-auto h-auto w-full"
          style={intrinsicWidth ? { maxWidth: `${intrinsicWidth}px` } : undefined}
        >
          <title>{caption}</title>
          {children}
        </svg>
      </div>
      <figcaption className="mt-2.5 text-center text-xs text-muted-foreground">{caption}</figcaption>
    </figure>
  );
};

export const ink = "hsl(var(--foreground))";
export const soft = "hsl(var(--muted-foreground))";
export const line = "hsl(var(--border))";

/**
 * An arrowhead whose tip sits exactly at (x, y) and points along `angle`
 * (0° = right, 90° = down, −90° = up). Computing the rotation explicitly
 * keeps every arrow aimed along its line instead of relying on hand-placed
 * triangle vertices, which is where the earlier diagrams went wrong.
 */
export const arrowHead = (x: number, y: number, angle: number, fill: string, size = 9) => (
  <path
    d={`M0 0 L${-size} ${-size * 0.48} L${-size} ${size * 0.48} Z`}
    fill={fill}
    transform={`translate(${x}, ${y}) rotate(${angle})`}
  />
);

export const box = (x: number, y: number, w: number, h: number, fill: string, stroke: string) => (
  <rect x={x} y={y} width={w} height={h} rx="4" fill={fill} stroke={stroke} strokeWidth="1.5" />
);
