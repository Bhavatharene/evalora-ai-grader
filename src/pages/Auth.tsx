import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Brain, GraduationCap, BookOpen } from "lucide-react";

const Auth = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen gradient-bg circuit-pattern flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg"
      >
        <div className="text-center mb-10">
          <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-4">
            <Brain className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-display font-bold">
            Welcome to <span className="gradient-text">Evalora</span>
          </h1>
          <p className="text-muted-foreground text-sm mt-2">Choose your portal to continue</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/auth/student")}
            className="glass-card-hover p-8 text-center flex flex-col items-center gap-4 cursor-pointer border-[hsl(var(--info)/0.2)]"
          >
            <div className="w-16 h-16 rounded-2xl bg-[hsl(var(--info)/0.15)] border border-[hsl(var(--info)/0.3)] flex items-center justify-center">
              <GraduationCap className="w-9 h-9 text-info" />
            </div>
            <div>
              <h2 className="font-display font-bold text-lg mb-1">Student</h2>
              <p className="text-xs text-muted-foreground">Access assignments, grades & AI insights</p>
            </div>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/auth/teacher")}
            className="glass-card-hover p-8 text-center flex flex-col items-center gap-4 cursor-pointer border-[hsl(var(--accent)/0.2)]"
          >
            <div className="w-16 h-16 rounded-2xl bg-[hsl(var(--accent)/0.15)] border border-[hsl(var(--accent)/0.3)] flex items-center justify-center">
              <BookOpen className="w-9 h-9 text-accent" />
            </div>
            <div>
              <h2 className="font-display font-bold text-lg mb-1">Teacher</h2>
              <p className="text-xs text-muted-foreground">Manage courses, grading & analytics</p>
            </div>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
