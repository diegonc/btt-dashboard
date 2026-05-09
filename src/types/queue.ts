export type RunningTask = {
  id?: string;
  priority: number;
  startTime: number;
  timeout?: number;
};

export type WaitingTask = {
  id: string;
};

export type QueueInfo = {
  isPaused: boolean;
  isSaturated: boolean;
  pending: number;
  waiting: number;
  concurrency: number;
  runningTasks: Array<RunningTask>;
  //waitingTasks: Array<{ run: Function }>;
};
