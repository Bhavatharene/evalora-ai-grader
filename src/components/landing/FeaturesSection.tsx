import { motion } from "framer-motion";
import {
  Brain,
  BookOpen,
  Lightbulb,
  Users,
  ShieldCheck,
  Clock,
  MessageSquareText,
  Bell,
  CalendarDays,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Auto-Grading System",
    desc: "Automatically evaluates assignments using rubric-based scoring and AI analysis.",
  },
  {
    icon: BookOpen,
    title: "Syllabus-Driven Generator",
    desc: "Uploads syllabus PDFs to generate assignments aligned with learning outcomes.",
  },
  {
    icon: Lightbulb,
    title: "AI Assignment Suggestions",
    desc: "Recommends topics, difficulty levels, and format types for teachers.",
  },
  {
    icon: Users,
    title: "Smart Group Formation",
    desc: "Forms balanced student teams based on performance, skills, and participation.",
  },
  {
    icon: ShieldCheck,
    title: "Advanced Copy Detection",
    desc: "Detects renaming-based plagiarism, structural similarity, and controlled resubmission.",
  },
  {
    icon: Clock,
    title: "Deadline Extensions",
    desc: "Students request extensions with documented reasons; teacher-defined approval rules.",
  },
  {
    icon: MessageSquareText,
    title: "Transparent Feedback",
    desc: "Detailed mark breakdown with AI explanations for deductions and improvements.",
  },
  {
    icon: Bell,
    title: "Automated Reminders",
    desc: "Notifications for deadlines, incomplete tasks, and revision schedules.",
  },
  {
    icon: CalendarDays,
    title: "Daily Timetable Dashboard",
    desc: "Personalized dashboard with classes, deadlines, and AI-recommended study time.",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const FeaturesSection = () => {
  return (
    <section className="py-24 relative circuit-pattern">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
            Powerful <span className="gradient-text">Features</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need for intelligent academic assessment, all in one platform.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((f) => (
            <motion.div
              key={f.title}
              variants={item}
              className="glass-card-hover p-6 flex flex-col gap-4 group cursor-default"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <f.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-lg">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
