import { motion } from "framer-motion";
import { Upload, FileText } from "lucide-react";
import heroDashboard from "@/assets/hero-dashboard.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center circuit-pattern overflow-hidden">
      {/* Ambient glow effects */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col gap-6"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 glass px-4 py-2 w-fit text-sm text-muted-foreground"
          >
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            AI-Powered Academic Platform
          </motion.div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display leading-tight">
            Reinventing Assignment Evaluation with{" "}
            <span className="gradient-text text-glow">Transparent AI Intelligence</span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
            AI-powered grading, syllabus-driven task generation, plagiarism detection,
            smart grouping, and personalized academic dashboards.
          </p>

          <div className="flex flex-wrap gap-4 mt-2">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="gradient-btn flex items-center gap-2 text-base"
            >
              <Upload className="w-5 h-5" />
              Upload Assignment
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="gradient-btn-secondary flex items-center gap-2 text-base"
            >
              <FileText className="w-5 h-5" />
              Generate from Syllabus
            </motion.button>
          </div>

          <div className="flex items-center gap-6 mt-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-foreground">10K+</span> Assignments Graded
            </div>
            <div className="w-px h-4 bg-border" />
            <div className="flex items-center gap-2">
              <span className="font-semibold text-foreground">98%</span> Accuracy
            </div>
            <div className="w-px h-4 bg-border" />
            <div className="flex items-center gap-2">
              <span className="font-semibold text-foreground">500+</span> Institutions
            </div>
          </div>
        </motion.div>

        {/* Right dashboard preview */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="relative"
        >
          <div className="animate-float">
            <div className="glass-card p-2 rounded-2xl overflow-hidden">
              <img
                src={heroDashboard}
                alt="Evalora AI Dashboard Preview"
                className="rounded-xl w-full object-cover"
              />
            </div>
          </div>
          {/* Floating badges */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 }}
            className="absolute -bottom-4 -left-4 glass px-4 py-3 flex items-center gap-3 animate-pulse_glow"
          >
            <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
              <span className="text-success font-bold text-sm">A+</span>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">AI Confidence</p>
              <p className="font-semibold text-sm">96.4%</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
