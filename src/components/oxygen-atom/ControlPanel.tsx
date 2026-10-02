import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ZoomIn, ZoomOut, Gauge, Tag } from "lucide-react";

interface ControlPanelProps {
  speed: number;
  onSpeedChange: (speed: number) => void;
  zoom: number;
  onZoomChange: (zoom: number) => void;
  showLabels: boolean;
  onShowLabelsChange: (show: boolean) => void;
}

const ControlPanel = ({
  speed,
  onSpeedChange,
  zoom,
  onZoomChange,
  showLabels,
  onShowLabelsChange,
}: ControlPanelProps) => {
  return (
    <div className="flex flex-col gap-6 p-4 bg-card rounded-lg border border-border">
      <h3 className="text-lg font-semibold text-foreground">Controls</h3>
      
      {/* Speed Control */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Gauge className="w-4 h-4 text-muted-foreground" />
          <Label className="text-sm font-medium">Animation Speed</Label>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground">Slow</span>
          <Slider
            value={[speed]}
            onValueChange={(values) => onSpeedChange(values[0])}
            min={0.25}
            max={3}
            step={0.25}
            className="flex-1"
          />
          <span className="text-xs text-muted-foreground">Fast</span>
        </div>
        <p className="text-xs text-muted-foreground text-center">{speed}x</p>
      </div>

      {/* Zoom Control */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <ZoomIn className="w-4 h-4 text-muted-foreground" />
          <Label className="text-sm font-medium">Zoom Level</Label>
        </div>
        <div className="flex items-center gap-3">
          <ZoomOut className="w-4 h-4 text-muted-foreground" />
          <Slider
            value={[zoom]}
            onValueChange={(values) => onZoomChange(values[0])}
            min={0.5}
            max={1.5}
            step={0.1}
            className="flex-1"
          />
          <ZoomIn className="w-4 h-4 text-muted-foreground" />
        </div>
        <p className="text-xs text-muted-foreground text-center">{Math.round(zoom * 100)}%</p>
      </div>

      {/* Labels Toggle */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Tag className="w-4 h-4 text-muted-foreground" />
          <Label htmlFor="labels-toggle" className="text-sm font-medium">
            Show Labels
          </Label>
        </div>
        <Switch
          id="labels-toggle"
          checked={showLabels}
          onCheckedChange={onShowLabelsChange}
        />
      </div>
    </div>
  );
};

export default ControlPanel;
