import { Brain } from "lucide-react";

const footerLinks = {
  "About the Platform": ["Our Mission", "How It Works", "Team"],
  Features: ["Auto-Grading", "Plagiarism Detection", "Smart Groups", "AI Feedback"],
  "For Institutions": ["Enterprise Plans", "API Access", "Integrations"],
  "Privacy & Integrity": ["Academic Policy", "Data Security", "Terms of Service"],
};

const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-card/30 backdrop-blur-md">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                <Brain className="w-5 h-5 text-primary" />
              </div>
              <span className="font-display font-bold text-lg">Evalora</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Next-generation AI-powered assignment evaluation for modern education.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-display font-semibold text-sm mb-4">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>© 2026 Evalora. All rights reserved.</p>
          <p>Contact: hello@evalora.ai</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
