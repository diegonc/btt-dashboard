import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import type { QueueInfo } from "../types/queue";
import { BooleanIndicator } from "./BooleanIndicator";
import { NumberIndicator } from "./NumberIndicator";

interface QueueEvent {
  type: string;
  timestamp: number;
  [key: string]: string | number;
}

export function QueueStatus() {
  const { data, isPending, error } = useQuery<QueueInfo>({
    queryKey: ["queue"],
    queryFn: () => fetch("/api/v1/queue/stats").then((res) => res.json()),
  });

  const [events, setEvents] = useState<QueueEvent[]>([]);

  useEffect(() => {
    const eventSource = new EventSource("/api/v1/queue/events");

    const handleMessage = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data);
        setEvents((prev) => [
          { ...data, timestamp: Date.now() },
          ...prev,
        ]);
      } catch (err) {
        console.error("Failed to parse event:", err);
      }
    };

    eventSource.addEventListener("message", handleMessage);

    return () => {
      eventSource.removeEventListener("message", handleMessage);
      eventSource.close();
    };
  }, []);

  if (isPending) {
    return <div className="spinner"></div>;
  }
  if (error) {
    return <div>{error.toString()}</div>;
  }

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  return (
    <div>
      <section className="indicator-section">
        <BooleanIndicator value={data.isPaused} title="Paused" />
        <NumberIndicator value={data.pending} title="Executing" />
        <NumberIndicator value={data.waiting} title="Waiting" />
        <NumberIndicator value={data.concurrency} title="Concurrency" />
      </section>

      <section className="events-section">
        <h3>Queue Events</h3>
        <div className="events-list">
          {events.length === 0 ? (
            <div className="no-events">No events yet</div>
          ) : (
            events.map((event, index) => (
              <div key={index} className="event-item">
                <span className="event-type">{event.type}</span>
                <span className="event-time">{formatTime(event.timestamp)}</span>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
