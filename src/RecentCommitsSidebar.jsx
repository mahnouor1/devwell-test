/**
 * Recent Commits Sidebar Component
 * Displays recent commits in a fixed left sidebar
 */

function RecentCommitsSidebar({ commits }) {
  if (!commits || Object.keys(commits).length === 0) {
    return null;
  }

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

  return (
    <div style={{ ...styles.statsCard }}>
      <h2 style={styles.cardTitle}>Recent Commits</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginTop: "1rem" }}>
        {Object.entries(commits).slice(0, 3).map(([repoName, repoCommits]) => (
          <div key={repoName}>
            <h3 style={{ fontSize: "0.9rem", fontWeight: "600", color: "#667eea", marginBottom: "0.5rem" }}>
              {repoName}
            </h3>
            {Array.isArray(repoCommits) && repoCommits.slice(0, 3).map((commit, idx) => (
              <div
                key={idx}
                style={{
                  background: "rgba(102, 126, 234, 0.05)",
                  borderRadius: "8px",
                  padding: "0.75rem",
                  marginBottom: "0.5rem",
                }}
              >
                <p style={{ fontSize: "0.85rem", color: "#1f2937", marginBottom: "0.25rem" }}>
                  {commit.commit?.message?.split('\n')[0] || 'No message'}
                </p>
                <p style={{ fontSize: "0.75rem", color: "#6b7280" }}>
                  {commit.commit?.author?.date ? new Date(commit.commit.author.date).toLocaleDateString() : ''}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentCommitsSidebar;

