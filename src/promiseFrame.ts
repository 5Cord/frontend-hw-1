type Task<T> = () => Promise<T> | T;

const promiseFrame = async <
  T extends Task<any>[] | Readonly<Task<any>[]>,
  ResultT = Awaited<ReturnType<T[number]>>
>(
  tasks: T,
  maxConcurrent?: number
): Promise<ResultT[]> => {
  if (!Array.isArray(tasks)) {
    throw new Error('INVALID_ARGUMENT');
  }
  if (
    maxConcurrent !== undefined &&
    (typeof maxConcurrent !== 'number' || maxConcurrent <= 0)
  ) {
    throw new Error('INVALID_ARGUMENT');
  }

  if (maxConcurrent === undefined) {
    return Promise.all(tasks.map((task) => Promise.resolve(task())));
  }

  const results: ResultT[] = new Array(tasks.length);
  let runningTasks = 0;
  let taskIndex = 0;
  let errorOccurred = false;

  const runTask = async (index: number): Promise<void> => {
    if (
      index >= tasks.length ||
      runningTasks >= maxConcurrent ||
      errorOccurred
    ) {
      return;
    }

    runningTasks++;

    try {
      results[index] = await Promise.resolve(tasks[index]());
    } catch (error) {
      errorOccurred = true;
      throw error;
    } finally {
      runningTasks--;
      if (!errorOccurred) {
        await runTask(taskIndex++);
      }
    }
  };

  const taskPromises: Promise<void>[] = [];
  for (let i = 0; i < Math.min(maxConcurrent, tasks.length); i++) {
    taskPromises.push(runTask(taskIndex++));
  }

  await Promise.all(taskPromises);

  return results;
};

export default promiseFrame;