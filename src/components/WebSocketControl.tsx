import { useCallback, useState } from "react";

export function WebSocketControl() {
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleReconnect = useCallback(async () => {
    setIsLoading(true);
    setFeedback(null);

    try {
      const response = await fetch("/api/v1/ws/reconnect", {
        method: "POST",
      });

      if (response.ok) {
        setFeedback({
          type: "success",
          message: "WebSocket reconnection initiated",
        });
      } else {
        setFeedback({
          type: "error",
          message: `Failed to reconnect: ${response.statusText}`,
        });
      }
    } catch (error) {
      setFeedback({
        type: "error",
        message: `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="indicator-section">
      <div className="section-header">
        <h3>WebSocket</h3>
      </div>
      <button
        className="reload-button"
        type="button"
        onClick={handleReconnect}
        disabled={isLoading}
      >
        {isLoading ? "Reconnecting..." : "Reconnect WebSocket"}
      </button>
      {feedback && (
        <div
          className={`feedback-message feedback-${feedback.type}`}
          style={{ marginTop: "12px" }}
        >
          {feedback.message}
        </div>
      )}
    </div>
  );
}
