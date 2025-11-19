/**
 * GitHub Profile Card Component
 * Displays GitHub user profile information
 */

import { Github } from "lucide-react";

function GitHubProfileCard({ githubData, loading, error }) {
  const styles = {
    statsCard: {
      background: "rgba(255, 255, 255, 0.95)",
      backdropFilter: "blur(10px)",
      borderRadius: "20px",
      padding: "1.5rem",
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
      border: "1px solid rgba(255, 255, 255, 0.3)",
    },
    cardTitle: {
      fontSize: "1.25rem",
      fontWeight: "800",
      color: "#1f2937",
      marginBottom: "1rem",
    },
  };

  if (loading) {
    return (
      <div style={{ ...styles.statsCard, marginBottom: "1.5rem", textAlign: "center" }}>
        <p style={{ color: "#6b7280" }}>Loading GitHub data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ ...styles.statsCard, marginBottom: "1.5rem", textAlign: "center", background: "rgba(239, 68, 68, 0.1)" }}>
        <p style={{ color: "#ef4444" }}>Error: {error}</p>
      </div>
    );
  }

  if (!githubData) {
    return null;
  }

  return (
    <div style={{ ...styles.statsCard, marginBottom: "1.5rem", width: "100%", boxSizing: "border-box" }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", width: "100%" }}>
        {githubData.avatar_url && (
          <img
            src={githubData.avatar_url}
            alt={githubData.name || githubData.login}
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              border: "3px solid #667eea",
              flexShrink: 0,
            }}
          />
        )}
        <div style={{ flex: 1, minWidth: 0, width: "100%" }}>
          <h2 style={{ ...styles.cardTitle, fontSize: "1.5rem", marginBottom: "0.5rem", wordWrap: "break-word", overflowWrap: "break-word" }}>
            GitHub Profile
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", width: "100%" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
              <Github size={20} color="#667eea" style={{ flexShrink: 0 }} />
              <span style={{ fontWeight: "600", color: "#1f2937", wordWrap: "break-word", overflowWrap: "break-word", maxWidth: "100%" }}>
                {githubData.login}
              </span>
            </div>
            {githubData.name && (
              <p style={{ color: "#6b7280", margin: 0, wordWrap: "break-word", overflowWrap: "break-word", maxWidth: "100%" }}>
                {githubData.name}
              </p>
            )}
            {githubData.email && (
              <p style={{ color: "#6b7280", margin: 0, wordWrap: "break-word", overflowWrap: "break-word", maxWidth: "100%" }}>
                📧 {githubData.email}
              </p>
            )}
            {githubData.bio && (
              <p style={{ color: "#6b7280", margin: "0.5rem 0 0 0", fontStyle: "italic", wordWrap: "break-word", overflowWrap: "break-word", maxWidth: "100%" }}>
                {githubData.bio}
              </p>
            )}
            {githubData.company && (
              <p style={{ color: "#6b7280", margin: 0, wordWrap: "break-word", overflowWrap: "break-word", maxWidth: "100%" }}>
                🏢 {githubData.company}
              </p>
            )}
            {githubData.location && (
              <p style={{ color: "#6b7280", margin: 0, wordWrap: "break-word", overflowWrap: "break-word", maxWidth: "100%" }}>
                📍 {githubData.location}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GitHubProfileCard;

