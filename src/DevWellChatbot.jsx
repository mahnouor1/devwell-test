import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, Loader } from "lucide-react";

const DevWellChatbot = ({ githubData, insights }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const suggestedQuestions = [
    "What should I work on next?",
    "How am I doing this week?",
    "Block my afternoon for coding",
    "Show me my recent activity",
    "What are my top repositories?",
  ];

  const sendMessage = async (text) => {
    if (!text.trim()) return;

    const userMessage = {
      role: "user",
      content: text,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          message: text,
          context: {
            githubData: githubData ? {
              name: githubData.name || githubData.login,
              repos: githubData?.github_data?.repos?.length || 0,
              commits: githubData?.github_data?.commits ? Object.keys(githubData.github_data.commits).length : 0,
            } : null,
            insights: insights ? {
              commitsPastWeek: insights.weeklyHighlights?.commitsPastWeek || 0,
              activeRepos: insights.weeklyHighlights?.activeRepos || 0,
            } : null,
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();

      const botMessage = {
        role: "assistant",
        content: data.response || "I'm here to help! How can I assist you today?",
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage = {
        role: "assistant",
        content: "Sorry, I'm having trouble right now. Please try again later.",
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleSuggestedClick = (question) => {
    sendMessage(question);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        maxHeight: "700px",
        minHeight: "500px",
      }}
    >
      {/* Chat Messages */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          padding: "1.25rem",
          marginBottom: "1rem",
          minHeight: "400px",
          maxHeight: "550px",
        }}
      >
        {messages.length === 0 ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
              padding: "1rem 0",
            }}
          >
            {suggestedQuestions.map((question, idx) => (
              <div
                key={idx}
                onClick={() => handleSuggestedClick(question)}
                style={{
                  background: "rgba(102, 126, 234, 0.05)",
                  borderRadius: "12px",
                  padding: "1rem",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = "rgba(102, 126, 234, 0.1)";
                  e.currentTarget.style.transform = "translateX(4px)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = "rgba(102, 126, 234, 0.05)";
                  e.currentTarget.style.transform = "translateX(0)";
                }}
              >
                <p style={{ fontSize: "0.9rem", color: "#374151", margin: 0 }}>
                  "{question}"
                </p>
              </div>
            ))}
          </div>
        ) : (
          <>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: msg.role === "user" ? "flex-end" : "flex-start",
                  gap: "0.25rem",
                }}
              >
                <div
                  style={{
                    background:
                      msg.role === "user"
                        ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                        : "rgba(102, 126, 234, 0.1)",
                    color: msg.role === "user" ? "white" : "#374151",
                    padding: "0.75rem 1rem",
                    borderRadius:
                      msg.role === "user"
                        ? "16px 16px 4px 16px"
                        : "16px 16px 16px 4px",
                    maxWidth: "85%",
                    wordWrap: "break-word",
                    overflowWrap: "break-word",
                    fontSize: "0.95rem",
                    lineHeight: "1.6",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {msg.content}
                </div>
                <span
                  style={{
                    fontSize: "0.75rem",
                    color: "#9ca3af",
                    padding: "0 0.5rem",
                  }}
                >
                  {new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            ))}
            {loading && (
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.5rem",
                }}
              >
                <div
                  style={{
                    background: "rgba(102, 126, 234, 0.1)",
                    padding: "0.75rem 1rem",
                    borderRadius: "16px 16px 16px 4px",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <Loader
                    size={16}
                    style={{
                      animation: "spin 1s linear infinite",
                    }}
                  />
                  <span style={{ fontSize: "0.9rem", color: "#374151" }}>
                    Thinking...
                  </span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} style={{ marginTop: "auto" }}>
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            alignItems: "center",
          }}
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything..."
            disabled={loading}
            style={{
              flex: 1,
              padding: "0.75rem 1rem",
              border: "2px solid #e5e7eb",
              borderRadius: "12px",
              fontSize: "0.9rem",
              outline: "none",
              boxSizing: "border-box",
              transition: "all 0.3s",
              backgroundColor: "#f9fafb",
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "#667eea";
              e.currentTarget.style.backgroundColor = "white";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "#e5e7eb";
              e.currentTarget.style.backgroundColor = "#f9fafb";
            }}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            style={{
              padding: "0.75rem 1rem",
              background:
                loading || !input.trim()
                  ? "#e5e7eb"
                  : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: loading || !input.trim() ? "#9ca3af" : "white",
              border: "none",
              borderRadius: "12px",
              cursor: loading || !input.trim() ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.3s",
              boxShadow:
                loading || !input.trim()
                  ? "none"
                  : "0 4px 12px rgba(102, 126, 234, 0.3)",
            }}
            onMouseOver={(e) => {
              if (!loading && input.trim()) {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 6px 16px rgba(102, 126, 234, 0.4)";
              }
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                loading || !input.trim()
                  ? "none"
                  : "0 4px 12px rgba(102, 126, 234, 0.3)";
            }}
          >
            {loading ? (
              <Loader size={18} style={{ animation: "spin 1s linear infinite" }} />
            ) : (
              <Send size={18} />
            )}
          </button>
        </div>
      </form>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default DevWellChatbot;

