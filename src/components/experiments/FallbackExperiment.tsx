import { useParams } from "react-router-dom";
import { getExperiment } from "@/data/experiments";

const FallbackExperiment = () => {
  const { experimentId } = useParams();
  const experiment = experimentId ? getExperiment(experimentId) : undefined;

  return (
    <div className="text-center py-12 space-y-4">
      <p className="text-5xl">{experiment?.icon || "🔬"}</p>
      <h2 className="text-xl font-semibold text-foreground">Coming Soon!</h2>
      <p className="text-muted-foreground max-w-md mx-auto">
        This interactive experiment is under development. Check back soon for a fully interactive experience!
      </p>
      <div className="bg-white/5 rounded-xl p-4 max-w-sm mx-auto">
        <p className="text-sm text-muted-foreground">
          <strong className="text-foreground">What it will include:</strong><br />
          {experiment?.description}
        </p>
      </div>
    </div>
  );
};

export default FallbackExperiment;
