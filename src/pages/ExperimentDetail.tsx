import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Seo from "@/components/seo/Seo";
import { getExperiment } from "@/data/experiments";
import AcidBaseTitration from "@/components/experiments/AcidBaseTitration";
import GasLawSim from "@/components/experiments/GasLawSim";
import PhCalculator from "@/components/experiments/PhCalculator";
import MolarMassCalculator from "@/components/experiments/MolarMassCalculator";
import DilutionCalculator from "@/components/experiments/DilutionCalculator";
import GibbsCalculator from "@/components/experiments/GibbsCalculator";
import FlameTestLab from "@/components/experiments/FlameTestLab";
import EquationBalancer from "@/components/experiments/EquationBalancer";
import ReactionRateSim from "@/components/experiments/ReactionRateSim";
import ElectronConfigBuilder from "@/components/experiments/ElectronConfigBuilder";
import ReactionBench from "@/components/experiments/ReactionBench";
import Class10Activity from "@/components/experiments/Class10Activity";
import FallbackExperiment from "@/components/experiments/FallbackExperiment";

const experimentComponents: Record<string, React.ComponentType> = {
  "reaction-bench": ReactionBench,
  "acid-base-titration": AcidBaseTitration,
  "gas-law-sim": GasLawSim,
  "ph-calculator": PhCalculator,
  "molar-mass-calculator": MolarMassCalculator,
  "dilution-calculator": DilutionCalculator,
  "gibbs-calculator": GibbsCalculator,
  "flame-test-lab": FlameTestLab,
  "balance-equations": EquationBalancer,
  "reaction-rate-sim": ReactionRateSim,
  "electron-config-builder": ElectronConfigBuilder,
};

const ExperimentDetail = () => {
  const { experimentId } = useParams();
  const experiment = experimentId ? getExperiment(experimentId) : undefined;

  if (!experiment) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-24">
        <Seo title="Experiment not found" description="That experiment does not exist in the lab." />
        <h1 className="font-display text-display-sm">Experiment not found</h1>
        <p className="mt-3 text-muted-foreground">
          There's no experiment with that address. It may have been renamed.
        </p>
        <Button asChild className="mt-6">
          <Link to="/experiments">
            <ArrowLeft aria-hidden="true" className="h-4 w-4" />
            Back to the lab
          </Link>
        </Button>
      </div>
    );
  }

  // Class 10 activities are rendered from the chapter data by a single component.
  const Component =
    experimentComponents[experiment.id] ??
    (experiment.id.startsWith("c10-") ? Class10Activity : FallbackExperiment);

  return (
    <>
      <Seo
        title={experiment.title}
        description={experiment.description}
        path={`/experiments/${experiment.id}`}
      />

      <header className="border-b border-border bg-grid">
        <div className="mx-auto max-w-5xl px-5 py-10 sm:py-12">
          <Link
            to="/experiments"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft aria-hidden="true" className="h-4 w-4" />
            Lab
          </Link>

          <div className="mt-6 flex items-start gap-4">
            <span
              aria-hidden="true"
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded border border-border bg-card text-2xl"
            >
              {experiment.icon}
            </span>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline">{experiment.unit}</Badge>
                <Badge variant="outline">{experiment.difficulty}</Badge>
              </div>
              <h1 id="experiment-title" className="mt-2 font-display text-display-sm">
                {experiment.title}
              </h1>
              <p className="measure mt-2 text-base leading-relaxed text-muted-foreground">
                {experiment.description}
              </p>
            </div>
          </div>
        </div>
      </header>

      <section
        aria-labelledby="experiment-title"
        className="mx-auto max-w-5xl px-5 py-10"
      >
        <div className="rounded-lg border border-border bg-card p-5 sm:p-7">
          <Component />
        </div>
      </section>
    </>
  );
};

export default ExperimentDetail;
