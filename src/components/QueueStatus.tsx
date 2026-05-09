import { useQuery } from "@tanstack/react-query";

import type { QueueInfo } from "../types/queue";
import { BooleanIndicator } from "./BooleanIndicator";
import { NumberIndicator } from "./NumberIndicator";

export function QueueStatus() {
  const { data, isPending, error } = useQuery<QueueInfo>({
    queryKey: ["queue"],
    queryFn: () => fetch("/api/v1/queue/stats").then((res) => res.json()),
  });

  if (isPending) {
    return <div className="spinner"></div>;
  }
  if (error) {
    return <div>{error.toString()}</div>;
  }

  return (
    <div>
      <section className="indicator-row">
        <BooleanIndicator value={data.isPaused} title="Paused" />
        <NumberIndicator value={data.pending} title="Executing" />
        <NumberIndicator value={data.waiting} title="Waiting" />
        <NumberIndicator value={data.concurrency} title="Concurrency" />
      </section>
    </div>
  );
}
