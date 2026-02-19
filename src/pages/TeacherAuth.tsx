import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, User, BookOpen } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const TeacherAuth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isSignUp) {
        await signUp(email, password, name, "teacher");
        toast.success("Account created! Redirecting...");
      } else {
        await signIn(email, password);
        toast.success("Welcome back!");
      }
    } catch (err: any) {
      toast.error(err.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen gradient-bg circuit-pattern flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-[hsl(var(--accent)/0.15)] border border-[hsl(var(--accent)/0.3)] flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8 text-accent" />
          </div>
          <h1 className="text-2xl font-display font-bold">
            Teacher <span className="gradient-text">Portal</span>
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {isSignUp ? "Create your teacher account" : "Sign in to your command center"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="glass p-8 rounded-2xl space-y-4 border-[hsl(var(--accent)/0.2)]">
          {isSignUp && (
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-muted/30 border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
                  placeholder="Dr. Sarah Williams"
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-sm text-muted-foreground mb-1 block">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-muted/30 border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
                placeholder="teacher@university.edu"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-muted-foreground mb-1 block">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-muted/30 border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full font-semibold rounded-xl px-6 py-3 transition-all duration-300 text-sm text-primary-foreground disabled:opacity-50"
            style={{ background: "linear-gradient(135deg, hsl(var(--accent)), hsl(var(--primary)))" }}
          >
            {loading ? "Please wait..." : isSignUp ? "Create Teacher Account" : "Sign In as Teacher"}
          </button>

          <p className="text-center text-sm text-muted-foreground">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <button type="button" onClick={() => setIsSignUp(!isSignUp)} className="text-accent hover:underline">
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </p>

          <div className="text-center pt-2 border-t border-border/30">
            <span className="text-xs text-muted-foreground">Are you a student? </span>
            <button type="button" onClick={() => navigate("/auth/student")} className="text-xs text-info hover:underline">
              Go to Student Login
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default TeacherAuth;
