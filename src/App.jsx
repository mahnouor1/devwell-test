import React, { useState } from "react";
import {
  ChevronRight,
  Github,
  Mail,
  MessageSquare,
  Home,
  LogIn,
  UserPlus,
  Sparkles,
  Zap,
  TrendingUp,
  Users,
  CheckCircle,
  Clock,
  Star,
} from "lucide-react";

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
    animation: "float 6s ease-in-out infinite",
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
            gap: "1rem",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={() => onNavigate("auth")}
            style={styles.button}
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
  const activities = [
    {
      title: "Project Alpha launched successfully",
      time: "2 minutes ago",
      type: "success",
    },
    { title: "New team member joined", time: "1 hour ago", type: "info" },
    { title: "Code review completed", time: "3 hours ago", type: "success" },
    {
      title: "Meeting scheduled for tomorrow",
      time: "5 hours ago",
      type: "warning",
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
      }}
    >
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
                Dashboard
              </h1>
              <p style={{ fontSize: "0.85rem", color: "#6b7280" }}>
                Welcome back, {userName.name}
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigate("landing")}
            style={{
              padding: "0.75rem 1.5rem",
              color: "white",
              fontWeight: "600",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              border: "none",
              borderRadius: "12px",
              cursor: "pointer",
              boxShadow: "0 5px 15px rgba(102, 126, 234, 0.3)",
              transition: "all 0.3s",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 8px 20px rgba(102, 126, 234, 0.4)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 5px 15px rgba(102, 126, 234, 0.3)";
            }}
          >
            Logout
          </button>
        </div>
      </header>

      <main
        style={{ maxWidth: "80rem", margin: "0 auto", padding: "3rem 2rem" }}
      >
        <div style={{ marginBottom: "3rem" }}>
          <h2
            style={{
              fontSize: "2.25rem",
              fontWeight: "900",
              color: "#1f2937",
              marginBottom: "0.5rem",
            }}
          >
            Your Performance Overview
          </h2>
          <p style={{ color: "#6b7280", fontSize: "1.1rem" }}>
            Track your progress and achievements
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
          {[
            {
              icon: TrendingUp,
              label: "Projects",
              value: "12",
              change: "+3 this week",
              gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "#667eea",
            },
            {
              icon: Clock,
              label: "Tasks",
              value: "48",
              change: "18 pending",
              gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
              color: "#f5576c",
            },
            {
              icon: CheckCircle,
              label: "Completed",
              value: "34",
              change: "+12 today",
              gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
              color: "#00f2fe",
            },
          ].map((stat, i) => (
            <div
              key={i}
              style={{
                ...styles.statsCard,
                background: "white",
                borderLeft: `5px solid ${stat.color}`,
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow =
                  "0 20px 40px rgba(0, 0, 0, 0.12)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 10px 30px rgba(0, 0, 0, 0.08)";
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "start",
                  marginBottom: "1rem",
                }}
              >
                <div>
                  <h3
                    style={{
                      color: "#6b7280",
                      fontSize: "0.95rem",
                      fontWeight: "600",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {stat.label}
                  </h3>
                  <p
                    style={{
                      fontSize: "2.5rem",
                      fontWeight: "900",
                      color: "#1f2937",
                    }}
                  >
                    {stat.value}
                  </p>
                </div>
                <div
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "15px",
                    background: stat.gradient,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <stat.icon size={28} color="white" />
                </div>
              </div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.25rem",
                  padding: "0.5rem 1rem",
                  borderRadius: "20px",
                  backgroundColor: "#f0fdf4",
                  color: "#16a34a",
                  fontSize: "0.85rem",
                  fontWeight: "600",
                }}
              >
                <TrendingUp size={14} />
                {stat.change}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            backgroundColor: "white",
            borderRadius: "2rem",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
            padding: "2.5rem",
            border: "1px solid rgba(0, 0, 0, 0.05)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "2rem",
            }}
          >
            <h3
              style={{
                fontSize: "1.75rem",
                fontWeight: "800",
                color: "#1f2937",
              }}
            >
              Recent Activity
            </h3>
            <span
              style={{
                ...styles.badge,
                backgroundColor: "#ede9fe",
                color: "#7c3aed",
              }}
            >
              <Clock size={14} />
              Live Updates
            </span>
          </div>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            {activities.map((activity, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1.5rem",
                  padding: "1.5rem",
                  backgroundColor: "#f9fafb",
                  borderRadius: "1rem",
                  border: "1px solid #e5e7eb",
                  transition: "all 0.3s",
                  cursor: "pointer",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = "#f3f4f6";
                  e.currentTarget.style.borderColor = "#667eea";
                  e.currentTarget.style.transform = "translateX(5px)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = "#f9fafb";
                  e.currentTarget.style.borderColor = "#e5e7eb";
                  e.currentTarget.style.transform = "translateX(0)";
                }}
              >
                <div
                  style={{
                    width: "12px",
                    height: "12px",
                    background:
                      activity.type === "success"
                        ? "linear-gradient(135deg, #10b981 0%, #059669 100%)"
                        : activity.type === "warning"
                        ? "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)"
                        : "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                    borderRadius: "50%",
                    boxShadow: "0 0 0 4px rgba(102, 126, 234, 0.1)",
                  }}
                ></div>
                <div style={{ flex: 1 }}>
                  <p
                    style={{
                      fontWeight: "600",
                      color: "#1f2937",
                      fontSize: "1.05rem",
                      marginBottom: "0.25rem",
                    }}
                  >
                    {activity.title}
                  </p>
                  <p
                    style={{
                      fontSize: "0.875rem",
                      color: "#9ca3af",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.25rem",
                    }}
                  >
                    <Clock size={12} />
                    {activity.time}
                  </p>
                </div>
                <ChevronRight size={20} color="#9ca3af" />
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            marginTop: "3rem",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "2rem",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "1.5rem",
              padding: "2rem",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-20px",
                right: "-20px",
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              }}
            ></div>
            <Zap
              size={40}
              style={{ marginBottom: "1rem", position: "relative", zIndex: 1 }}
            />
            <h4
              style={{
                fontSize: "1.5rem",
                fontWeight: "800",
                marginBottom: "0.5rem",
                position: "relative",
                zIndex: 1,
              }}
            >
              Productivity Boost
            </h4>
            <p
              style={{
                fontSize: "0.95rem",
                opacity: 0.9,
                position: "relative",
                zIndex: 1,
              }}
            >
              You're 23% more productive this week! Keep up the great work.
            </p>
          </div>

          <div
            style={{
              backgroundColor: "white",
              borderRadius: "1.5rem",
              padding: "2rem",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
              background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
              color: "white",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                bottom: "-30px",
                left: "-30px",
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              }}
            ></div>
            <Star
              size={40}
              style={{ marginBottom: "1rem", position: "relative", zIndex: 1 }}
            />
            <h4
              style={{
                fontSize: "1.5rem",
                fontWeight: "800",
                marginBottom: "0.5rem",
                position: "relative",
                zIndex: 1,
              }}
            >
              Achievement Unlocked
            </h4>
            <p
              style={{
                fontSize: "0.95rem",
                opacity: 0.9,
                position: "relative",
                zIndex: 1,
              }}
            >
              You've completed 50 tasks this month! 🎉
            </p>
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

  return (
    <>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
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
