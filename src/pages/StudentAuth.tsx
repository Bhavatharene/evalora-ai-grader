import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Brain, Mail, Lock, User, GraduationCap } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const StudentAuth = () => {
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
        await signUp(email, password, name, "student");
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
          <div className="w-14 h-14 rounded-2xl bg-[hsl(var(--info)/0.15)] border border-[hsl(var(--info)/0.3)] flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="w-8 h-8 text-info" />
          </div>
          <h1 className="text-2xl font-display font-bold">
            Student <span className="gradient-text">Portal</span>
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {isSignUp ? "Create your student account" : "Sign in to your student dashboard"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="glass p-8 rounded-2xl space-y-4 border-[hsl(var(--info)/0.2)]">
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
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-muted/30 border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-info/50"
                  placeholder="Alex Johnson"
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
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-muted/30 border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-info/50"
                placeholder="student@university.edu"
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
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-muted/30 border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-info/50"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full font-semibold rounded-xl px-6 py-3 transition-all duration-300 text-sm text-primary-foreground disabled:opacity-50"
            style={{ background: "linear-gradient(135deg, hsl(var(--info)), hsl(var(--primary)))" }}
          >
            {loading ? "Please wait..." : isSignUp ? "Create Student Account" : "Sign In as Student"}
          </button>

          <p className="text-center text-sm text-muted-foreground">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <button type="button" onClick={() => setIsSignUp(!isSignUp)} className="text-info hover:underline">
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </p>

          <div className="text-center pt-2 border-t border-border/30">
            <span className="text-xs text-muted-foreground">Are you a teacher? </span>
            <button type="button" onClick={() => navigate("/auth/teacher")} className="text-xs text-primary hover:underline">
              Go to Teacher Login
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default StudentAuth;
