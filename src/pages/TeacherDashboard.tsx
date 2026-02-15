import { motion } from "framer-motion";
import {
  PlusCircle,
  ClipboardList,
  ShieldCheck,
  Users,
  BarChart3,
  Settings,
  Brain,
  FileText,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import { Progress } from "@/components/ui/progress";

const assignments = [
  { title: "ML Assignment 3", submissions: 28, total: 35, avg: 78, status: "Grading" },
  { title: "DSA Problem Set 5", submissions: 0, total: 35, avg: 0, status: "Draft" },
  { title: "SE Group Report", submissions: 35, total: 35, avg: 82, status: "Completed" },
];

const plagiarismReports = [
  { student: "John D.", assignment: "ML Assignment 2", similarity: 42, flag: "High" },
  { student: "Lisa M.", assignment: "ML Assignment 2", similarity: 18, flag: "Low" },
  { student: "Tom H.", assignment: "SE Report", similarity: 31, flag: "Medium" },
];

const classPerformance = [
  { subject: "Machine Learning", avg: 76, trend: "up" },
  { subject: "Data Structures", avg: 82, trend: "up" },
  { subject: "Software Engineering", avg: 71, trend: "down" },
];

const rubricItems = [
  { criterion: "Problem Understanding", weight: 20 },
  { criterion: "Solution Approach", weight: 30 },
  { criterion: "Code Quality", weight: 25 },
  { criterion: "Documentation", weight: 15 },
  { criterion: "Testing", weight: 10 },
];

const groups = [
  { name: "Team Alpha", members: ["Alex P.", "Sarah K.", "Mike R."], strength: "Balanced" },
  { name: "Team Beta", members: ["Lisa M.", "John D.", "Amy T."], strength: "Research" },
  { name: "Team Gamma", members: ["Tom H.", "Eva L.", "Chris W."], strength: "Technical" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const TeacherDashboard = () => {
  return (
    <div className="min-h-screen gradient-bg">
      <Navbar />
      <div className="pt-24 pb-12 container mx-auto px-6">
        <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.1 } } }}>
          {/* Header */}
          <motion.div variants={fadeUp} className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-display font-bold">
                Teacher <span className="gradient-text">Command Center</span>
              </h1>
              <p className="text-muted-foreground mt-1">Manage assignments, grading, and student analytics.</p>
            </div>
            <div className="flex gap-3">
              <button className="gradient-btn flex items-center gap-2 text-sm">
                <PlusCircle className="w-4 h-4" />
                New Assignment
              </button>
              <button className="gradient-btn-secondary flex items-center gap-2 text-sm">
                <Settings className="w-4 h-4" />
                Settings
              </button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div variants={fadeUp} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Active Assignments", value: "3", icon: ClipboardList, color: "text-primary" },
              { label: "Students", value: "105", icon: Users, color: "text-info" },
              { label: "Avg Class Score", value: "76%", icon: TrendingUp, color: "text-success" },
              { label: "Plagiarism Flags", value: "3", icon: AlertTriangle, color: "text-destructive" },
            ].map((s) => (
              <div key={s.label} className="stat-card">
                <div className="flex items-center gap-2">
                  <s.icon className={`w-4 h-4 ${s.color}`} />
                  <span className="text-xs text-muted-foreground">{s.label}</span>
                </div>
                <span className="text-2xl font-bold font-display">{s.value}</span>
              </div>
            ))}
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left column */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              {/* Assignments */}
              <motion.div variants={fadeUp} className="dashboard-section">
                <div className="flex items-center gap-2 mb-4">
                  <ClipboardList className="w-5 h-5 text-primary" />
                  <h2 className="font-display font-semibold text-lg">Assignments</h2>
                </div>
                <div className="space-y-3">
                  {assignments.map((a) => (
                    <div key={a.title} className="p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-sm">{a.title}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          a.status === "Completed"
                            ? "bg-success/20 text-success"
                            : a.status === "Grading"
                            ? "bg-primary/20 text-primary"
                            : "bg-muted text-muted-foreground"
                        }`}>
                          {a.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>{a.submissions}/{a.total} submitted</span>
                        {a.avg > 0 && <span>Avg: {a.avg}%</span>}
                      </div>
                      <Progress value={(a.submissions / a.total) * 100} className="h-1.5 mt-2" />
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Rubric Builder */}
              <motion.div variants={fadeUp} className="dashboard-section">
                <div className="flex items-center gap-2 mb-4">
                  <Brain className="w-5 h-5 text-accent" />
                  <h2 className="font-display font-semibold text-lg">Rubric Builder</h2>
                </div>
                <div className="space-y-2">
                  {rubricItems.map((r) => (
                    <div key={r.criterion} className="flex items-center gap-4 p-3 rounded-lg bg-muted/20">
                      <span className="flex-1 text-sm">{r.criterion}</span>
                      <div className="w-20">
                        <Progress value={r.weight} className="h-2" />
                      </div>
                      <span className="text-xs text-muted-foreground w-10 text-right">{r.weight}%</span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 p-3 rounded-lg bg-primary/5 border border-primary/20">
                  <div className="flex items-center gap-2 text-xs text-primary">
                    <Brain className="w-3 h-3" />
                    AI Confidence Score: <span className="font-bold">94.2%</span>
                  </div>
                </div>
              </motion.div>

              {/* Class Performance */}
              <motion.div variants={fadeUp} className="dashboard-section">
                <div className="flex items-center gap-2 mb-4">
                  <BarChart3 className="w-5 h-5 text-info" />
                  <h2 className="font-display font-semibold text-lg">Class Performance Analytics</h2>
                </div>
                <div className="space-y-4">
                  {classPerformance.map((c) => (
                    <div key={c.subject}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">{c.subject}</span>
                        <div className="flex items-center gap-2">
                          <TrendingUp className={`w-3 h-3 ${c.trend === "up" ? "text-success" : "text-destructive rotate-180"}`} />
                          <span className="text-sm text-muted-foreground">{c.avg}%</span>
                        </div>
                      </div>
                      <Progress value={c.avg} className="h-2" />
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right column */}
            <div className="flex flex-col gap-6">
              {/* Plagiarism */}
              <motion.div variants={fadeUp} className="dashboard-section">
                <div className="flex items-center gap-2 mb-4">
                  <ShieldCheck className="w-5 h-5 text-destructive" />
                  <h2 className="font-display font-semibold text-lg">Plagiarism Reports</h2>
                </div>
                <div className="space-y-3">
                  {plagiarismReports.map((p, i) => (
                    <div key={i} className="p-3 rounded-xl bg-muted/30">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">{p.student}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          p.flag === "High"
                            ? "bg-destructive/20 text-destructive"
                            : p.flag === "Medium"
                            ? "bg-warning/20 text-warning"
                            : "bg-success/20 text-success"
                        }`}>
                          {p.similarity}% match
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">{p.assignment}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Group Formation */}
              <motion.div variants={fadeUp} className="dashboard-section">
                <div className="flex items-center gap-2 mb-4">
                  <Users className="w-5 h-5 text-secondary" />
                  <h2 className="font-display font-semibold text-lg">Smart Groups</h2>
                </div>
                <div className="space-y-3">
                  {groups.map((g) => (
                    <div key={g.name} className="p-3 rounded-xl bg-muted/30">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">{g.name}</span>
                        <span className="text-xs px-2 py-1 rounded-full bg-accent/20 text-accent">
                          {g.strength}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">{g.members.join(", ")}</p>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 gradient-btn-secondary text-sm !py-2">
                  Auto-Generate Groups
                </button>
              </motion.div>

              {/* AI Grading Control */}
              <motion.div variants={fadeUp} className="dashboard-section">
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="w-5 h-5 text-primary" />
                  <h2 className="font-display font-semibold text-lg">Auto-Grading</h2>
                </div>
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                    <p className="text-sm mb-2">ML Assignment 3</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                      Grading in progress... 18/28 evaluated
                    </div>
                    <Progress value={64} className="h-1.5 mt-2" />
                  </div>
                  <button className="w-full gradient-btn text-sm !py-2">
                    Start Batch Grading
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
