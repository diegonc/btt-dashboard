export type RunningTask = {
  id?: string;
  priority: number;
  startTime: number;
  timeout?: number;
};

export type QueueInfo = {
  isPaused: boolean;
  isSaturated: boolean;
  pending: number;
  waiting: number;
  concurrency: number;
  runningTasks: Array<RunningTask>;
};
