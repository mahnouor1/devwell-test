import React, { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  AlertCircle,
  TrendingUp,
  MessageSquare,
  GitBranch,
  Mail,
  CheckCircle,
  X,
  Users,
  LogIn,
  UserPlus,
  Github,
  Star,
  ChevronRight,
  Coffee,
  Moon,
  Zap,
  Settings,
  Home,
  Sparkles,
} from "lucide-react";
import RecentCommitsSidebar from "./RecentCommitsSidebar.jsx";
import GitHubProfileCard from "./GitHubProfileCard.jsx";
import DevWellChatbot from "./DevWellChatbot.jsx";

// Enhanced Styles
const styles = {
  gradientPurple: {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem",
    position: "relative",
    overflow: "hidden",
  },
  gradientBlue: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem",
    position: "relative",
    overflow: "hidden",
  },
  floatingShape: {
    position: "absolute",
    borderRadius: "50%",
    opacity: 0.1,
  },
  button: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    padding: "1rem 2.5rem",
    borderRadius: "50px",
    fontSize: "1.125rem",
    fontWeight: "600",
    border: "none",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    boxShadow: "0 20px 40px rgba(102, 126, 234, 0.4)",
    transition: "all 0.3s",
    transform: "translateY(0)",
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(10px)",
    borderRadius: "2rem",
    boxShadow: "0 30px 60px rgba(0, 0, 0, 0.2)",
    padding: "2.5rem",
    width: "100%",
    maxWidth: "32rem",
    border: "1px solid rgba(255, 255, 255, 0.3)",
  },
  input: {
    width: "100%",
    padding: "1rem 1.25rem",
    border: "2px solid #e5e7eb",
    borderRadius: "12px",
    fontSize: "1rem",
    outline: "none",
    boxSizing: "border-box",
    transition: "all 0.3s",
    backgroundColor: "#f9fafb",
  },
  tabButton: {
    flex: 1,
    padding: "1rem",
    borderRadius: "12px",
    fontWeight: "600",
    border: "none",
    cursor: "pointer",
    transition: "all 0.3s",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
  },
  integrationCard: {
    backgroundColor: "white",
    borderRadius: "1.5rem",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
    padding: "2rem",
    border: "2px solid transparent",
    transition: "all 0.4s",
    cursor: "pointer",
    position: "relative",
    overflow: "hidden",
  },
  iconBox: {
    padding: "1rem",
    borderRadius: "15px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
  },
  statsCard: {
    background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
    borderRadius: "1.5rem",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
    padding: "2rem",
    transition: "all 0.3s",
    cursor: "pointer",
    position: "relative",
    overflow: "hidden",
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.5rem 1rem",
    borderRadius: "20px",
    fontSize: "0.875rem",
    fontWeight: "600",
  },
  progressBarContainer: {
    width: "100%",
    height: "12px",
    backgroundColor: "#e5e7eb",
    borderRadius: "10px",
    overflow: "hidden",
    marginBottom: "1.5rem",
    marginTop: "0.5rem",
  },
  progressBarFill: {
    height: "100%",
    background: "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
    borderRadius: "10px",
    transition: "width 1s ease-in-out",
  },
  cardTitle: {
    fontSize: "1.5rem",
    fontWeight: "800",
    marginBottom: "1.5rem",
    color: "#1f2937",
  },
  checkList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
};

// Router Component
function Router({
  currentPage,
  setCurrentPage,
  userAuth,
  integrations,
  userName,
}) {
  const pages = {
    landing: <LandingPage onNavigate={setCurrentPage} />,
    auth: (
      <AuthPage
        onNavigate={setCurrentPage}
        userAuth={userAuth}
        userName={userName}
      />
    ),
    getstarted: (
      <GetStartedPage
        onNavigate={setCurrentPage}
        integrations={integrations}
        userName={userName}
      />
    ),
    home: <HomePage onNavigate={setCurrentPage} userName={userName} />,
  };

  return pages[currentPage] || pages.landing;
}

// Landing Page
function LandingPage({ onNavigate }) {
  return (
    <div style={styles.gradientPurple}>
      {/* Floating shapes */}
      <div
        style={{
          ...styles.floatingShape,
          width: "300px",
          height: "300px",
          top: "10%",
          left: "10%",
          backgroundColor: "white",
          animation: "float 6s ease-in-out infinite",
        }}
      ></div>
      <div
        style={{
          ...styles.floatingShape,
          width: "200px",
          height: "200px",
          bottom: "15%",
          right: "15%",
          backgroundColor: "white",
          animation: "float 8s ease-in-out infinite",
        }}
      ></div>
      <div
        style={{
          ...styles.floatingShape,
          width: "150px",
          height: "150px",
          top: "60%",
          left: "70%",
          backgroundColor: "white",
          animation: "float 7s ease-in-out infinite",
        }}
      ></div>

      <div
        style={{
          maxWidth: "56rem",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            marginBottom: "2rem",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            ...styles.badge,
            background: "rgba(255, 255, 255, 0.2)",
            color: "white",
          }}
        >
          <Sparkles size={16} />
          Your Complete Workflow Solution
        </div>

        <h1
          style={{
            fontSize: "4.5rem",
            fontWeight: "900",
            color: "white",
            marginBottom: "1.5rem",
            textShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
            lineHeight: "1.2",
          }}
        >
          Transform Your
          <br />
          Productivity Today
        </h1>

        <p
          style={{
            fontSize: "1.5rem",
            color: "rgba(255, 255, 255, 0.95)",
            marginBottom: "3rem",
            maxWidth: "40rem",
            margin: "0 auto 3rem",
          }}
        >
          Connect all your favorite tools in one powerful dashboard. Work
          smarter, not harder.
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            alignItems: "center",
            maxWidth: "28rem",
            margin: "0 auto",
          }}
        >
          <button
            onClick={() => {
              window.location.href = '/api/auth/github/login';
            }}
            style={{
              ...styles.button,
              width: "100%",
              background: "#1f2937",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.75rem",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow =
                "0 25px 50px rgba(31, 41, 55, 0.5)";
              e.currentTarget.style.background = "#111827";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 20px 40px rgba(31, 41, 55, 0.4)";
              e.currentTarget.style.background = "#1f2937";
            }}
          >
            <Github size={24} />
            Continue with GitHub
            <ChevronRight size={24} />
          </button>
          
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              width: "100%",
              margin: "0.5rem 0",
            }}
          >
            <div
              style={{
                flex: 1,
                height: "1px",
                background: "rgba(255, 255, 255, 0.3)",
              }}
            />
            <span
              style={{
                color: "rgba(255, 255, 255, 0.8)",
                fontSize: "0.875rem",
                fontWeight: "500",
              }}
            >
              OR
            </span>
            <div
              style={{
                flex: 1,
                height: "1px",
                background: "rgba(255, 255, 255, 0.3)",
              }}
            />
          </div>

          <button
            onClick={() => onNavigate("auth")}
            style={{
              ...styles.button,
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.75rem",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow =
                "0 25px 50px rgba(102, 126, 234, 0.5)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 20px 40px rgba(102, 126, 234, 0.4)";
            }}
          >
            <Zap size={20} />
            Get Started Free
            <ChevronRight size={24} />
          </button>
        </div>

        <div
          style={{
            display: "flex",
            gap: "2rem",
            justifyContent: "center",
            marginTop: "3rem",
            flexWrap: "wrap",
          }}
        >
          {[
            { icon: Users, text: "10K+ Users" },
            { icon: Star, text: "5-Star Rated" },
            { icon: CheckCircle, text: "Free Forever" },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                color: "white",
              }}
            >
              <item.icon size={20} />
              <span style={{ fontWeight: "600" }}>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Enhanced Auth Page
function AuthPage({ onNavigate, userAuth, userName }) {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    if (!isLogin && name) {
      userName.setName(name);
    } else {
      userName.setName("User");
    }
    userAuth.setAuthenticated(true);
    onNavigate("getstarted");
  };

  return (
    <div style={styles.gradientBlue}>
      <div
        style={{
          ...styles.floatingShape,
          width: "400px",
          height: "400px",
          top: "5%",
          right: "10%",
          backgroundColor: "white",
          animation: "float 6s ease-in-out infinite",
        }}
      ></div>
      <div
        style={{
          ...styles.floatingShape,
          width: "250px",
          height: "250px",
          bottom: "10%",
          left: "5%",
          backgroundColor: "white",
          animation: "float 8s ease-in-out infinite",
        }}
      ></div>

      <div style={{ ...styles.card, position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              margin: "0 auto 1.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 10px 30px rgba(102, 126, 234, 0.3)",
            }}
          >
            <Sparkles size={40} color="white" />
          </div>

          <h2
            style={{
              fontSize: "2.25rem",
              fontWeight: "800",
              color: "#1f2937",
              marginBottom: "0.5rem",
            }}
          >
            {isLogin ? "Welcome Back!" : "Join Us Today"}
          </h2>
          <p style={{ color: "#6b7280", fontSize: "1.1rem" }}>
            {isLogin
              ? "Sign in to access your dashboard"
              : "Create your free account now"}
          </p>
        </div>

        <div
          style={{
            display: "flex",
            gap: "0.75rem",
            marginBottom: "2rem",
            padding: "0.5rem",
            backgroundColor: "#f3f4f6",
            borderRadius: "15px",
          }}
        >
          <button
            onClick={() => setIsLogin(true)}
            style={{
              ...styles.tabButton,
              background: isLogin
                ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                : "transparent",
              color: isLogin ? "white" : "#6b7280",
              boxShadow: isLogin
                ? "0 5px 15px rgba(102, 126, 234, 0.3)"
                : "none",
            }}
          >
            <LogIn size={18} />
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            style={{
              ...styles.tabButton,
              background: !isLogin
                ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                : "transparent",
              color: !isLogin ? "white" : "#6b7280",
              boxShadow: !isLogin
                ? "0 5px 15px rgba(102, 126, 234, 0.3)"
                : "none",
            }}
          >
            <UserPlus size={18} />
            Signup
          </button>
        </div>

        {/* OAuth Login Buttons */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
            marginBottom: "1.5rem",
          }}
        >
          <button
            onClick={() => {
              window.location.href = '/api/auth/github/login';
            }}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.75rem",
              padding: "1rem 1.5rem",
              background: "#1f2937",
              color: "white",
              borderRadius: "12px",
              border: "none",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "1rem",
              transition: "all 0.3s",
              boxShadow: "0 4px 12px rgba(31, 41, 55, 0.3)",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 6px 16px rgba(31, 41, 55, 0.4)";
              e.currentTarget.style.background = "#111827";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(31, 41, 55, 0.3)";
              e.currentTarget.style.background = "#1f2937";
            }}
          >
            <Github size={20} />
            Continue with GitHub
          </button>
        </div>

        {/* Divider */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            marginBottom: "1.5rem",
          }}
        >
          <div
            style={{
              flex: 1,
              height: "1px",
              background: "#e5e7eb",
            }}
          />
          <span
            style={{
              color: "#6b7280",
              fontSize: "0.875rem",
              fontWeight: "500",
            }}
          >
            OR
          </span>
          <div
            style={{
              flex: 1,
              height: "1px",
              background: "#e5e7eb",
            }}
          />
        </div>

        <div
          style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
        >
          {!isLogin && (
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.95rem",
                  fontWeight: "600",
                  color: "#374151",
                  marginBottom: "0.5rem",
                }}
              >
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={styles.input}
                placeholder="John Doe"
                onFocus={(e) => (e.currentTarget.style.borderColor = "#667eea")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "#e5e7eb")}
              />
            </div>
          )}

          <div>
            <label
              style={{
                display: "block",
                fontSize: "0.95rem",
                fontWeight: "600",
                color: "#374151",
                marginBottom: "0.5rem",
              }}
            >
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              placeholder="you@example.com"
              onFocus={(e) => (e.currentTarget.style.borderColor = "#667eea")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#e5e7eb")}
            />
          </div>

          <div>
            <label
              style={{
                display: "block",
                fontSize: "0.95rem",
                fontWeight: "600",
                color: "#374151",
                marginBottom: "0.5rem",
              }}
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              placeholder="••••••••"
              onFocus={(e) => (e.currentTarget.style.borderColor = "#667eea")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#e5e7eb")}
            />
          </div>

          <button
            onClick={handleSubmit}
            style={{
              ...styles.button,
              width: "100%",
              justifyContent: "center",
              padding: "1.25rem",
              marginTop: "0.5rem",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow =
                "0 25px 50px rgba(102, 126, 234, 0.5)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 20px 40px rgba(102, 126, 234, 0.4)";
            }}
          >
            {isLogin ? "Sign In" : "Create Account"}
            <ChevronRight size={20} />
          </button>
        </div>

        <p
          style={{
            textAlign: "center",
            marginTop: "1.5rem",
            color: "#6b7280",
            fontSize: "0.9rem",
          }}
        >
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span
            onClick={() => setIsLogin(!isLogin)}
            style={{
              color: "#667eea",
              fontWeight: "600",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            {isLogin ? "Sign up" : "Sign in"}
          </span>
        </p>
      </div>
    </div>
  );
}

// Enhanced Get Started Page
function GetStartedPage({ onNavigate, integrations, userName }) {
  const { github, setGithub, slack, setSlack, gmail, setGmail } = integrations;

  const IntegrationCard = ({
    icon: Icon,
    title,
    connected,
    onToggle,
    color,
    gradient,
  }) => (
    <div
      style={{
        ...styles.integrationCard,
        borderColor: connected ? color : "transparent",
        transform: connected ? "translateY(-5px)" : "translateY(0)",
      }}
      onClick={onToggle}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = "translateY(-8px)";
        e.currentTarget.style.boxShadow = "0 20px 40px rgba(0, 0, 0, 0.15)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = connected
          ? "translateY(-5px)"
          : "translateY(0)";
        e.currentTarget.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.1)";
      }}
    >
      {connected && (
        <div
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            background: "#10b981",
            color: "white",
            padding: "0.25rem 0.75rem",
            borderRadius: "20px",
            fontSize: "0.75rem",
            fontWeight: "700",
            display: "flex",
            alignItems: "center",
            gap: "0.25rem",
          }}
        >
          <CheckCircle size={14} />
          Connected
        </div>
      )}

      <div style={{ textAlign: "center" }}>
        <div
          style={{
            ...styles.iconBox,
            background: gradient,
            margin: "0 auto 1.5rem",
            width: "80px",
            height: "80px",
          }}
        >
          <Icon size={32} color="white" />
        </div>
        <h3
          style={{
            fontSize: "1.5rem",
            fontWeight: "700",
            color: "#1f2937",
            marginBottom: "0.5rem",
          }}
        >
          {title}
        </h3>
        <p
          style={{
            color: "#6b7280",
            marginBottom: "1.5rem",
            fontSize: "0.95rem",
          }}
        >
          {connected ? "Successfully integrated" : "Click to connect"}
        </p>
        <div
          style={{
            padding: "0.75rem",
            borderRadius: "12px",
            fontWeight: "600",
            backgroundColor: connected ? "#d1fae5" : "#f3f4f6",
            color: connected ? "#065f46" : "#374151",
            transition: "all 0.3s",
          }}
        >
          {connected ? "✓ Active" : "Connect Now"}
        </div>
      </div>
    </div>
  );

  return (
    <div style={styles.gradientPurple}>
      <div
        style={{
          maxWidth: "72rem",
          width: "100%",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h1
            style={{
              fontSize: "3rem",
              fontWeight: "900",
              color: "white",
              marginBottom: "1rem",
              textShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
            }}
          >
            Welcome, {userName.name}! 👋
          </h1>
          <p
            style={{
              fontSize: "1.25rem",
              color: "rgba(255, 255, 255, 0.9)",
              fontWeight: "500",
            }}
          >
            Let's connect your favorite tools to get started
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "2rem",
            marginBottom: "3rem",
          }}
        >
          <IntegrationCard
            icon={Github}
            title="GitHub"
            connected={github}
            onToggle={() => setGithub(!github)}
            color="#1f2937"
            gradient="linear-gradient(135deg, #1f2937 0%, #374151 100%)"
          />
          <IntegrationCard
            icon={MessageSquare}
            title="Slack"
            connected={slack}
            onToggle={() => setSlack(!slack)}
            color="#667eea"
            gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
          />
          <IntegrationCard
            icon={Mail}
            title="Gmail"
            connected={gmail}
            onToggle={() => setGmail(!gmail)}
            color="#ef4444"
            gradient="linear-gradient(135deg, #ef4444 0%, #dc2626 100%)"
          />
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
          <button
            onClick={() => onNavigate("home")}
            style={{
              ...styles.button,
              fontSize: "1.25rem",
              padding: "1.25rem 3rem",
              background: "white",
              color: "#667eea",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow =
                "0 25px 50px rgba(255, 255, 255, 0.3)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 20px 40px rgba(102, 126, 234, 0.4)";
            }}
          >
            Continue to Dashboard
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}

// Enhanced Home Page
function HomePage({ onNavigate, userName }) {
  const [activeTab, setActiveTab] = useState("today");
  const [completedTasks, setCompletedTasks] = useState([]);
  const [githubData, setGithubData] = useState(null);
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activityExpanded, setActivityExpanded] = useState(false);

  // Fetch GitHub user data and insights on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch user data
        const userResponse = await fetch('/api/auth/me', {
          credentials: 'include'
        });
        
        if (!userResponse.ok) {
          throw new Error('Failed to fetch user data');
        }
        
        const userData = await userResponse.json();
        
        if (userData.authenticated && userData.provider === 'github') {
          setGithubData(userData.profile);
          // Update userName if available
          if (userData.profile.name) {
            userName.setName(userData.profile.name);
          }
          
          // Fetch insights
          try {
            const insightsResponse = await fetch('/api/github/insights', {
              credentials: 'include'
            });
            
            if (insightsResponse.ok) {
              const insightsData = await insightsResponse.json();
              setInsights(insightsData);
            } else {
              console.warn('Failed to fetch insights, using empty data');
              setInsights({ today: [], weeklyHighlights: {}, recommendedTasks: [] });
            }
          } catch (insightsErr) {
            console.warn('Error fetching insights:', insightsErr);
            setInsights({ today: [], weeklyHighlights: {}, recommendedTasks: [] });
          }
        } else {
          setError('Not authenticated');
        }
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userName]);

  // Calculate wellbeing score from real activity
  const wellbeingScore = insights?.weeklyHighlights?.commitsPastWeek 
    ? Math.min(100, Math.max(0, Math.floor((insights.weeklyHighlights.commitsPastWeek / 20) * 100)))
    : 0;

  // Convert insights.today to tasks format
  const tasks = insights?.today?.map((task, index) => ({
    id: `task-${index}`,
    title: task.task,
    priority: task.priority || 'medium',
    time: task.time || 'All day',
    source: 'github',
    energy: task.priority === 'high' ? 'high' : task.priority === 'low' ? 'low' : 'medium',
    repo: task.repo,
    reason: task.reason,
  })) || [];

  const toggleTask = (taskId) => {
    setCompletedTasks((prev) =>
      prev.includes(taskId)
        ? prev.filter((id) => id !== taskId)
        : [...prev, taskId]
    );
  };

  // Generate insights from real GitHub data
  const realInsights = [];
  
  if (insights?.weeklyHighlights) {
    const { commitsPastWeek, activeRepos, totalRepos, eventsCount } = insights.weeklyHighlights;
    
    if (commitsPastWeek > 0) {
      realInsights.push({
        type: "positive",
        text: `You made ${commitsPastWeek} commit(s) this week across ${activeRepos} active repo(s)`,
        icon: TrendingUp,
      });
    }
    
    if (totalRepos > 0) {
      realInsights.push({
        type: "info",
        text: `You have ${totalRepos} repository(s) in total`,
        icon: GitBranch,
      });
    }
    
    if (eventsCount > 0) {
      realInsights.push({
        type: "info",
        text: `${eventsCount} GitHub event(s) in the past week`,
        icon: GitBranch,
      });
    }
    
    if (commitsPastWeek === 0 && activeRepos === 0) {
      realInsights.push({
        type: "warning",
        text: "No GitHub activity detected this week. Consider starting a new project!",
        icon: AlertCircle,
      });
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      {/* Header */}
      <header
        style={{
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.3)",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <div
          style={{
            maxWidth: "80rem",
            margin: "0 auto",
            padding: "1.25rem 2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "15px",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 5px 15px rgba(102, 126, 234, 0.3)",
              }}
            >
              <Home color="white" size={24} />
            </div>
            <div>
              <h1
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "800",
                  color: "#1f2937",
                  marginBottom: "0.25rem",
                }}
              >
                DevWell Dashboard
              </h1>
              <p style={{ fontSize: "0.85rem", color: "#6b7280" }}>
                {loading ? 'Loading...' : githubData ? (
                  <>
                    Welcome back, {githubData.name || githubData.login || "User"}
                    {githubData.email && ` • ${githubData.email}`}
                  </>
                ) : (
                  `Welcome back, ${userName?.name || "User"}`
                )}
              </p>
            </div>
          </div>
          <button onClick={() => onNavigate("landing")} style={styles.button}>
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main
        style={{ 
          maxWidth: "80rem", 
          margin: "0 auto", 
          padding: "3rem 2rem",
          display: "flex",
          gap: "2rem",
        }}
      >
        {/* Left Sidebar - GitHub Profile & Recent Commits */}
        <aside
          style={{
            width: "280px",
            flexShrink: 0,
            position: "sticky",
            top: "6rem",
            alignSelf: "flex-start",
            maxHeight: "calc(100vh - 8rem)",
            overflowY: "auto",
          }}
        >
          <GitHubProfileCard githubData={githubData} loading={loading} error={error} />
          {githubData?.github_data?.commits && Object.keys(githubData.github_data.commits).length > 0 && (
            <RecentCommitsSidebar commits={githubData.github_data.commits} />
          )}
        </aside>

        {/* Main Content Area */}
        <div style={{ flex: 1, minWidth: 0 }}>
        {/* Repositories Section */}
        {githubData?.github_data?.repos && githubData.github_data.repos.length > 0 && (
          <div style={{ ...styles.statsCard, marginBottom: "2rem" }}>
            <h2 style={styles.cardTitle}>Your Repositories ({githubData.github_data.repos.length})</h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: "1rem",
                marginTop: "1rem",
              }}
            >
              {githubData.github_data.repos.slice(0, 6).map((repo) => (
                <div
                  key={repo.id}
                  style={{
                    background: "rgba(102, 126, 234, 0.05)",
                    borderRadius: "12px",
                    padding: "1rem",
                    border: "2px solid rgba(102, 126, 234, 0.1)",
                  }}
                >
                  <h3 style={{ fontWeight: "600", color: "#1f2937", marginBottom: "0.5rem" }}>
                    {repo.name}
                  </h3>
                  {repo.description && (
                    <p style={{ fontSize: "0.85rem", color: "#6b7280", marginBottom: "0.75rem" }}>
                      {repo.description}
                    </p>
                  )}
                  <div style={{ display: "flex", gap: "1rem", alignItems: "center", fontSize: "0.85rem" }}>
                    {repo.language && (
                      <span style={{ color: "#6b7280" }}>
                        {repo.language}
                      </span>
                    )}
                    <span style={{ display: "flex", alignItems: "center", gap: "0.25rem", color: "#6b7280" }}>
                      <Star size={14} />
                      {repo.stargazers_count || 0}
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: "0.25rem", color: "#6b7280" }}>
                      <GitBranch size={14} />
                      {repo.forks_count || 0}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent Activity Section */}
        {githubData?.github_data?.events && githubData.github_data.events.length > 0 && (
          <div style={{ ...styles.statsCard, marginBottom: "2rem" }}>
            <h2 style={styles.cardTitle}>Recent Activity</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginTop: "1rem" }}>
              {(activityExpanded 
                ? githubData.github_data.events 
                : githubData.github_data.events.slice(0, 3)
              ).map((event, idx) => (
                <div
                  key={event.id || idx}
                  style={{
                    background: "rgba(102, 126, 234, 0.05)",
                    borderRadius: "8px",
                    padding: "0.75rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: "0.85rem", color: "#1f2937", fontWeight: "500" }}>
                      {event.type === 'PushEvent' && '📝 Pushed commits'}
                      {event.type === 'PullRequestEvent' && '🔀 Pull request'}
                      {event.type === 'IssuesEvent' && '📋 Issue'}
                      {event.type === 'CreateEvent' && '✨ Created'}
                      {!['PushEvent', 'PullRequestEvent', 'IssuesEvent', 'CreateEvent'].includes(event.type) && event.type}
                      {event.repo && ` in ${event.repo}`}
                    </p>
                    <p style={{ fontSize: "0.75rem", color: "#6b7280", marginTop: "0.25rem" }}>
                      {event.created_at ? new Date(event.created_at).toLocaleString() : ''}
                    </p>
                  </div>
                </div>
              ))}
              {githubData.github_data.events.length > 3 && (
                <button
                  onClick={() => setActivityExpanded(!activityExpanded)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#667eea",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    cursor: "pointer",
                    padding: "0.5rem 0",
                    textAlign: "left",
                    textDecoration: "none",
                    alignSelf: "flex-start",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.textDecoration = "underline";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.textDecoration = "none";
                  }}
                >
                  {activityExpanded ? "See less" : "See more"}
                </button>
              )}
            </div>
          </div>
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: window.innerWidth >= 1024 ? "2fr 1fr" : "1fr",
            gap: "2rem",
          }}
        >
          {/* Main Content Column */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
          >
            {/* Wellbeing Score */}
            <div style={styles.statsCard}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "1.5rem",
                }}
              >
                <h2 style={styles.cardTitle}>Today's Wellbeing Score</h2>
                <span
                  style={{
                    fontSize: "2.5rem",
                    fontWeight: "900",
                    color: "#667eea",
                  }}
                >
                  {wellbeingScore}
                </span>
              </div>
              <div style={styles.progressBarContainer}>
                <div
                  style={{
                    ...styles.progressBarFill,
                    width: `${wellbeingScore}%`,
                  }}
                />
              </div>
              <p
                style={{
                  fontSize: "0.95rem",
                  color: "#6b7280",
                  lineHeight: "1.6",
                }}
              >
                {insights?.weeklyHighlights?.commitsPastWeek 
                  ? `Based on your GitHub activity: ${insights.weeklyHighlights.commitsPastWeek} commit(s) this week across ${insights.weeklyHighlights.activeRepos || 0} active repository(s).`
                  : loading 
                    ? 'Calculating based on your GitHub activity...'
                    : 'Connect your GitHub account to see your activity score.'}
              </p>
            </div>

            {/* Tasks */}
            <div style={styles.statsCard}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "1.5rem",
                }}
              >
                <h2 style={styles.cardTitle}>Today's Focus 🎯</h2>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button
                    style={{
                      padding: "0.5rem 1rem",
                      borderRadius: "10px",
                      fontSize: "0.9rem",
                      border: "none",
                      cursor: "pointer",
                      fontWeight: "600",
                      background: activeTab === "today" ? "#667eea" : "#e5e7eb",
                      color: activeTab === "today" ? "white" : "#6b7280",
                    }}
                    onClick={() => setActiveTab("today")}
                  >
                    Today
                  </button>
                  <button
                    style={{
                      padding: "0.5rem 1rem",
                      borderRadius: "10px",
                      fontSize: "0.9rem",
                      border: "none",
                      cursor: "pointer",
                      fontWeight: "600",
                      background: activeTab === "week" ? "#667eea" : "#e5e7eb",
                      color: activeTab === "week" ? "white" : "#6b7280",
                    }}
                    onClick={() => setActiveTab("week")}
                  >
                    Week
                  </button>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    style={{
                      background: "rgba(102, 126, 234, 0.05)",
                      borderRadius: "15px",
                      padding: "1.25rem",
                      border: "2px solid rgba(102, 126, 234, 0.1)",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "1rem",
                          flex: 1,
                        }}
                      >
                        <input
                          type="checkbox"
                          style={{
                            width: "20px",
                            height: "20px",
                            marginTop: "2px",
                            cursor: "pointer",
                            accentColor: "#667eea",
                          }}
                          checked={completedTasks.includes(task.id)}
                          onChange={() => toggleTask(task.id)}
                        />
                        <div style={{ flex: 1 }}>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "0.75rem",
                              flexWrap: "wrap",
                            }}
                          >
                            <h3
                              style={{
                                fontWeight: "600",
                                color: completedTasks.includes(task.id)
                                  ? "#9ca3af"
                                  : "#1f2937",
                                textDecoration: completedTasks.includes(task.id)
                                  ? "line-through"
                                  : "none",
                              }}
                            >
                              {task.title}
                            </h3>
                            {task.priority === "urgent" && (
                              <span
                                style={{
                                  padding: "0.25rem 0.75rem",
                                  background: "rgba(239, 68, 68, 0.2)",
                                  color: "#ef4444",
                                  fontSize: "0.75rem",
                                  borderRadius: "999px",
                                  fontWeight: "600",
                                }}
                              >
                                Urgent
                              </span>
                            )}
                            {task.priority === "high" && (
                              <span
                                style={{
                                  padding: "0.25rem 0.75rem",
                                  background: "rgba(249, 115, 22, 0.2)",
                                  color: "#f97316",
                                  fontSize: "0.75rem",
                                  borderRadius: "999px",
                                  fontWeight: "600",
                                }}
                              >
                                High
                              </span>
                            )}
                          </div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "1rem",
                              marginTop: "0.75rem",
                              fontSize: "0.85rem",
                              color: "#6b7280",
                              flexWrap: "wrap",
                            }}
                          >
                            <span
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.25rem",
                              }}
                            >
                              <Clock
                                style={{ width: "16px", height: "16px" }}
                              />
                              {task.time}
                            </span>
                            <span
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.25rem",
                              }}
                            >
                              {task.source === "github" ? (
                                <GitBranch
                                  style={{ width: "16px", height: "16px" }}
                                />
                              ) : (
                                <MessageSquare
                                  style={{ width: "16px", height: "16px" }}
                                />
                              )}
                              {task.source}
                            </span>
                            {task.energy === "high" && (
                              <span
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "0.25rem",
                                  color: "#f59e0b",
                                }}
                              >
                                <Zap
                                  style={{ width: "16px", height: "16px" }}
                                />
                                Peak focus time
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <ChevronRight
                        style={{
                          width: "20px",
                          height: "20px",
                          color: "#9ca3af",
                          flexShrink: 0,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {tasks.length === 0 && !loading && (
                <div
                  style={{
                    marginTop: "1.5rem",
                    paddingTop: "1.5rem",
                    borderTop: "2px solid #e5e7eb",
                    textAlign: "center",
                    color: "#6b7280",
                  }}
                >
                  <p>No tasks found. Start working on your repositories to see tasks here!</p>
                </div>
              )}
              {tasks.length > 0 && (
                <div
                  style={{
                    marginTop: "1.5rem",
                    paddingTop: "1.5rem",
                    borderTop: "2px solid #e5e7eb",
                  }}
                >
                  <p
                    style={{
                      fontSize: "0.9rem",
                      color: "#6b7280",
                      lineHeight: "1.6",
                    }}
                  >
                    💡 Tasks are generated from your GitHub activity and repository updates.
                  </p>
                </div>
              )}
            </div>

            {/* Ask DevWell - Moved to main content for more width */}
            <div style={styles.statsCard}>
              <h2 style={{ ...styles.cardTitle, fontSize: "1.25rem" }}>
                Ask DevWell 💬
              </h2>
              <DevWellChatbot githubData={githubData} insights={insights} />
            </div>
          </div>

          {/* Sidebar */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
          >
            {/* Quick Actions */}
            <div style={styles.statsCard}>
              <h2 style={{ ...styles.cardTitle, fontSize: "1.25rem" }}>
                Quick Actions ⚡
              </h2>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                }}
              >
                <button
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    padding: "1rem",
                    background: "#667eea",
                    color: "white",
                    borderRadius: "12px",
                    border: "none",
                    cursor: "pointer",
                    fontWeight: "600",
                    transition: "all 0.3s ease",
                  }}
                >
                  <Coffee style={{ width: "20px", height: "20px" }} />
                  <span>Take a 15min break</span>
                </button>
                <button
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    padding: "1rem",
                    background: "#e5e7eb",
                    color: "#374151",
                    borderRadius: "12px",
                    border: "none",
                    cursor: "pointer",
                    fontWeight: "600",
                    transition: "all 0.3s ease",
                  }}
                >
                  <Zap style={{ width: "20px", height: "20px" }} />
                  <span>Block focus time</span>
                </button>
                <button
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    padding: "1rem",
                    background: "#e5e7eb",
                    color: "#374151",
                    borderRadius: "12px",
                    border: "none",
                    cursor: "pointer",
                    fontWeight: "600",
                    transition: "all 0.3s ease",
                  }}
                >
                  <Moon style={{ width: "20px", height: "20px" }} />
                  <span>End day early</span>
                </button>
              </div>
            </div>

            {/* Insights */}
            <div style={styles.statsCard}>
              <h2 style={{ ...styles.cardTitle, fontSize: "1.25rem" }}>
                Weekly Insights 📊
              </h2>
              {loading ? (
                <p style={{ color: "#6b7280", textAlign: "center", padding: "2rem" }}>
                  Loading insights...
                </p>
              ) : realInsights.length === 0 ? (
                <p style={{ color: "#6b7280", textAlign: "center", padding: "2rem" }}>
                  No insights available. Start working on your repositories to see insights here!
                </p>
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                  }}
                >
                  {realInsights.map((insight, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "0.75rem",
                        padding: "1rem",
                        background: "rgba(102, 126, 234, 0.05)",
                        borderRadius: "12px",
                      }}
                    >
                      <insight.icon
                        style={{
                          width: "20px",
                          height: "20px",
                          flexShrink: 0,
                          color:
                            insight.type === "warning"
                              ? "#f59e0b"
                              : insight.type === "positive"
                              ? "#10b981"
                              : "#667eea",
                        }}
                      />
                      <p
                        style={{
                          fontSize: "0.9rem",
                          color: "#374151",
                          lineHeight: "1.5",
                        }}
                      >
                        {insight.text}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        </div>
      </main>
    </div>
  );
}

// Main App
export default function App() {
  const [currentPage, setCurrentPage] = useState("landing");
  const [authenticated, setAuthenticated] = useState(false);
  const [name, setName] = useState("User");
  const [github, setGithub] = useState(false);
  const [slack, setSlack] = useState(false);
  const [gmail, setGmail] = useState(false);

  // Handle URL-based routing and OAuth callback
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const path = window.location.pathname;

    // Handle OAuth success callback
    if (urlParams.get('auth') === 'success' || path === '/dashboard') {
      // Fetch user info from API
      fetch('/api/auth/me', {
        credentials: 'include'
      })
        .then(res => res.json())
        .then(data => {
          if (data.authenticated) {
            setAuthenticated(true);
            if (data.profile?.name) {
              setName(data.profile.name);
            }
            if (data.provider === 'github') {
              setGithub(true);
            }
            if (data.provider === 'slack') {
              setSlack(true);
            }
            // Navigate to home page (dashboard)
            setCurrentPage('home');
            // Clean up URL
            window.history.replaceState({}, '', '/');
          }
        })
        .catch(err => {
          console.error('Failed to fetch user info:', err);
        });
    }

    // Handle URL paths
    if (path === '/login' || path === '/auth') {
      setCurrentPage('auth');
    } else if (path === '/dashboard' || path === '/home') {
      // Check if authenticated
      fetch('/api/auth/me', {
        credentials: 'include'
      })
        .then(res => res.json())
        .then(data => {
          if (data.authenticated) {
            setAuthenticated(true);
            if (data.profile?.name) {
              setName(data.profile.name);
            }
            setCurrentPage('home');
          } else {
            setCurrentPage('landing');
          }
        })
        .catch(() => {
          setCurrentPage('landing');
        });
    }
  }, []);

  return (
    <>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
      <Router
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        userAuth={{ authenticated, setAuthenticated }}
        userName={{ name, setName }}
        integrations={{ github, setGithub, slack, setSlack, gmail, setGmail }}
      />
    </>
  );
}
