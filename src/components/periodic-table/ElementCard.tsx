import { type Element, categoryColors } from "@/data/elements";
import { useNavigate } from "react-router-dom";

interface ElementCardProps {
  element: Element;
  size?: "sm" | "md" | "lg";
}

const ElementCard = ({ element, size = "md" }: ElementCardProps) => {
  const navigate = useNavigate();
  const colors = categoryColors[element.category];

  const sizeClasses = {
    sm: "w-12 h-12 text-sm",
    md: "w-20 h-20 text-xl",
    lg: "w-32 h-32 text-3xl",
  };

  return (
    <button
      onClick={() => navigate(`/element/${element.atomicNumber}`)}
      className={`element-card relative flex flex-col items-center justify-center rounded-xl border border-white/20 cursor-pointer group bg-gradient-to-br ${colors.bg} ${sizeClasses[size]}`}
    >
      {/* Glow effect */}
      <div 
        className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${colors.glow}`}
        style={{
          boxShadow: `0 0 30px currentColor, inset 0 0 20px currentColor`,
        }}
      />
      
      {/* Atomic number */}
      <span className="absolute top-1 left-2 text-[10px] text-white/60 font-mono">
        {element.atomicNumber}
      </span>
      
      {/* Symbol */}
      <span className={`font-bold ${colors.text} relative z-10`}>
        {element.symbol}
      </span>
      
      {size !== "sm" && (
        <span className="text-[10px] text-white/70 relative z-10">
          {element.name}
        </span>
      )}
    </button>
  );
};

export default ElementCard;
