import { motion } from "framer-motion";
import { Cpu, Zap } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const hardwareModules = [
  {
    feature: "AI Assignment Auto-Grading",
    product: "Ryzen AI Software + ONNX Runtime",
    acceleration: "Rubric-based LLM on XDNA NPU",
    badge: "amd",
  },
  {
    feature: "Syllabus-Based Assignment Generation",
    product: "Ryzen AI + Vitis AI",
    acceleration: "NLP topic extraction on NPU",
    badge: "huggingface",
  },
  {
    feature: "AI Assignment Suggestions",
    product: "ROCm or Ryzen AI",
    acceleration: "Recommendation models inference",
    badge: "barchart",
  },
  {
    feature: "Smart Group Formation",
    product: "Ryzen AI + scikit-learn ONNX",
    acceleration: "Clustering offloaded to NPU",
    badge: "amd",
  },
  {
    feature: "Copy Detection (Renaming)",
    product: "Ryzen AI + sentence-transformers",
    acceleration: "Semantic similarity matching",
    badge: "amd",
  },
  {
    feature: "Reason-Based Deadline Extension",
    product: "EPYC CPU backend",
    acceleration: "Rule-based NLP logic",
    badge: "barchart",
  },
  {
    feature: "Transparent Mark Explanation",
    product: "GAIA agents on Ryzen AI",
    acceleration: "Chain-of-thought reasoning",
    badge: "amd",
  },
  {
    feature: "Automated Due Reminders",
    product: "Ryzen AI PC scheduler",
    acceleration: "APScheduler + notifications",
    badge: "huggingface",
  },
  {
    feature: "Daily Timetable Dashboard",
    product: "Radeon 700M iGPU",
    acceleration: "Data viz + ML predictions",
    badge: null,
  },
];

const badgeColors: Record<string, string> = {
  amd: "bg-destructive/20 text-destructive",
  huggingface: "bg-warning/20 text-warning",
  barchart: "bg-info/20 text-info",
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4 } },
};

const HardwareSection = () => {
  return (
    <section className="py-24 relative circuit-pattern">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Cpu className="w-6 h-6 text-primary" />
            <Zap className="w-5 h-5 text-accent" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
            Hardware <span className="gradient-text">Acceleration</span> Modules
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Powered by AMD Ryzen AI, EPYC, and ROCm — every feature is optimized for on-device NPU and GPU acceleration.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="glass rounded-2xl overflow-hidden"
        >
          <Table>
            <TableHeader>
              <TableRow className="border-b border-[hsl(var(--glass-border)/0.3)] hover:bg-transparent">
                <TableHead className="text-primary font-display font-semibold text-sm">Feature</TableHead>
                <TableHead className="text-primary font-display font-semibold text-sm">Primary AMD Product</TableHead>
                <TableHead className="text-primary font-display font-semibold text-sm">Acceleration Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {hardwareModules.map((mod) => (
                <motion.tr
                  key={mod.feature}
                  variants={item}
                  className="border-b border-[hsl(var(--glass-border)/0.15)] hover:bg-[hsl(var(--glass-bg)/0.4)] transition-colors"
                >
                  <TableCell className="font-medium text-sm">{mod.feature}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{mod.product}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm text-muted-foreground">{mod.acceleration}</span>
                      {mod.badge && (
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${badgeColors[mod.badge] || ""}`}>
                          {mod.badge}
                        </span>
                      )}
                    </div>
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </motion.div>
      </div>
    </section>
  );
};

export default HardwareSection;
