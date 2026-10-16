/**
 * Runs at most one job at a time. While a job runs, newer requests replace
 * each other, so only the latest waits; older ones are dropped. Call `done()`
 * when the running job finishes.
 */
export const createLatestOnlyScheduler = <Job>(
  run: (job: Job) => void,
): { request: (job: Job) => void; done: () => void; busy: () => boolean } => {
  let running = false;
  let pending: { job: Job } | null = null;

  const start = (job: Job): void => {
    running = true;
    run(job);
  };

  return {
    request: (job) => {
      if (running) {
        pending = { job };
        return;
      }
      start(job);
    },
    done: () => {
      running = false;
      if (pending) {
        const next = pending.job;
        pending = null;
        start(next);
      }
    },
    busy: () => running,
  };
};
