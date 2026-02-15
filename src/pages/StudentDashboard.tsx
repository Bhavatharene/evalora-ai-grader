import { motion } from "framer-motion";
import {
  CalendarDays,
  Clock,
  TrendingUp,
  FileText,
  AlertCircle,
  BarChart3,
  Brain,
  Trophy,
  Flame,
} from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import { Progress } from "@/components/ui/progress";

const timetable = [
  { time: "09:00", subject: "Machine Learning", room: "Lab 3A", type: "Lecture" },
  { time: "11:00", subject: "Data Structures", room: "Room 201", type: "Tutorial" },
  { time: "14:00", subject: "Software Engineering", room: "Room 105", type: "Lab" },
  { time: "16:00", subject: "AI Study Block", room: "—", type: "AI Recommended" },
];

const deadlines = [
  { title: "ML Assignment 3", due: "Feb 18", status: "In Progress", urgency: "high" },
  { title: "DSA Problem Set 5", due: "Feb 20", status: "Not Started", urgency: "medium" },
  { title: "SE Group Report", due: "Feb 25", status: "Draft Ready", urgency: "low" },
];

const submissions = [
  { title: "ML Assignment 2", grade: "A", score: 92, date: "Feb 10" },
  { title: "DSA Problem Set 4", grade: "B+", score: 85, date: "Feb 5" },
  { title: "SE Sprint Review", grade: "A-", score: 88, date: "Jan 30" },
];

const feedback = [
  { area: "Algorithm Design", score: 78, suggestion: "Practice graph traversal patterns" },
  { area: "Code Quality", score: 91, suggestion: "Excellent documentation practices" },
  { area: "Problem Analysis", score: 65, suggestion: "Focus on edge case identification" },
  { area: "Research Skills", score: 88, suggestion: "Great use of academic sources" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const StudentDashboard = () => {
  return (
    <div className="min-h-screen gradient-bg">
      <Navbar />
      <div className="pt-24 pb-12 container mx-auto px-6">
        <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.1 } } }}>
          {/* Header */}
          <motion.div variants={fadeUp} className="mb-8">
            <h1 className="text-3xl font-display font-bold">
              Good morning, <span className="gradient-text">Alex</span> 👋
            </h1>
            <p className="text-muted-foreground mt-1">Here's your academic overview for today.</p>
          </motion.div>

          {/* Stats row */}
          <motion.div variants={fadeUp} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: "GPA", value: "3.72", icon: TrendingUp, color: "text-success" },
              { label: "Pending", value: "3", icon: AlertCircle, color: "text-warning" },
              { label: "Submitted", value: "24", icon: FileText, color: "text-info" },
              { label: "Streak", value: "12 days", icon: Flame, color: "text-primary" },
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
              {/* Timetable */}
              <motion.div variants={fadeUp} className="dashboard-section">
                <div className="flex items-center gap-2 mb-4">
                  <CalendarDays className="w-5 h-5 text-primary" />
                  <h2 className="font-display font-semibold text-lg">Today's Timetable</h2>
                </div>
                <div className="space-y-3">
                  {timetable.map((t) => (
                    <div key={t.time} className="flex items-center gap-4 p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                      <span className="text-sm font-mono text-muted-foreground w-14">{t.time}</span>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{t.subject}</p>
                        <p className="text-xs text-muted-foreground">{t.room}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        t.type === "AI Recommended"
                          ? "bg-primary/20 text-primary"
                          : "bg-muted text-muted-foreground"
                      }`}>
                        {t.type}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* AI Feedback / Weakness Heatmap */}
              <motion.div variants={fadeUp} className="dashboard-section">
                <div className="flex items-center gap-2 mb-4">
                  <Brain className="w-5 h-5 text-accent" />
                  <h2 className="font-display font-semibold text-lg">AI Learning Insights</h2>
                </div>
                <div className="space-y-4">
                  {feedback.map((f) => (
                    <div key={f.area}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">{f.area}</span>
                        <span className="text-sm text-muted-foreground">{f.score}%</span>
                      </div>
                      <Progress value={f.score} className="h-2 mb-1" />
                      <p className="text-xs text-muted-foreground">{f.suggestion}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right column */}
            <div className="flex flex-col gap-6">
              {/* Deadlines */}
              <motion.div variants={fadeUp} className="dashboard-section">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-5 h-5 text-warning" />
                  <h2 className="font-display font-semibold text-lg">Upcoming Deadlines</h2>
                </div>
                <div className="space-y-3">
                  {deadlines.map((d) => (
                    <div key={d.title} className="p-3 rounded-xl bg-muted/30">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium text-sm">{d.title}</p>
                          <p className="text-xs text-muted-foreground mt-1">Due: {d.due}</p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          d.urgency === "high"
                            ? "bg-destructive/20 text-destructive"
                            : d.urgency === "medium"
                            ? "bg-warning/20 text-warning"
                            : "bg-success/20 text-success"
                        }`}>
                          {d.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 gradient-btn-secondary text-sm !py-2">
                  Request Extension
                </button>
              </motion.div>

              {/* Submission History */}
              <motion.div variants={fadeUp} className="dashboard-section">
                <div className="flex items-center gap-2 mb-4">
                  <BarChart3 className="w-5 h-5 text-info" />
                  <h2 className="font-display font-semibold text-lg">Recent Submissions</h2>
                </div>
                <div className="space-y-3">
                  {submissions.map((s) => (
                    <div key={s.title} className="flex items-center gap-3 p-3 rounded-xl bg-muted/30">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center font-display font-bold text-primary text-sm">
                        {s.grade}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{s.title}</p>
                        <p className="text-xs text-muted-foreground">{s.date} · {s.score}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Leaderboard */}
              <motion.div variants={fadeUp} className="dashboard-section">
                <div className="flex items-center gap-2 mb-4">
                  <Trophy className="w-5 h-5 text-warning" />
                  <h2 className="font-display font-semibold text-lg">Leaderboard</h2>
                </div>
                <div className="space-y-2">
                  {[
                    { name: "You (Alex)", score: 945, rank: 3 },
                    { name: "Sarah K.", score: 980, rank: 1 },
                    { name: "Mike R.", score: 960, rank: 2 },
                  ]
                    .sort((a, b) => a.rank - b.rank)
                    .map((s) => (
                      <div key={s.name} className={`flex items-center gap-3 p-2 rounded-lg ${s.rank === 3 ? "bg-primary/10" : "bg-muted/20"}`}>
                        <span className="w-6 text-center font-bold text-sm text-muted-foreground">#{s.rank}</span>
                        <span className="flex-1 text-sm font-medium">{s.name}</span>
                        <span className="text-xs text-muted-foreground">{s.score} pts</span>
                      </div>
                    ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default StudentDashboard;
