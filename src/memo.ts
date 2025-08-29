const memo = <T extends (...args: any[]) => any>(
  fn: T,
  duration?: number
): ((...args: Parameters<T>) => ReturnType<T>) => {
  if (typeof fn !== 'function') {
    throw new Error('INVALID_ARGUMENT');
  }
  if (
    duration !== undefined &&
    (typeof duration !== 'number' || duration < 0)
  ) {
    throw new Error('INVALID_ARGUMENT');
  }

  const storage = new Map<
    string,
    { result: ReturnType<T>; timer: NodeJS.Timeout }
  >();

  const createKey = (args: Parameters<T>): string => JSON.stringify(args);

  return (...args: Parameters<T>): ReturnType<T> => {
    const key = createKey(args);

    if (storage.has(key)) {
      const entry = storage.get(key)!;

      if (duration !== undefined) {
        clearTimeout(entry.timer);
        entry.timer = setTimeout(() => storage.delete(key), duration);
      }

      return entry.result;
    }

    const output = fn(...args);

    if (duration !== undefined) {
      const timer = setTimeout(() => storage.delete(key), duration);
      storage.set(key, { result: output, timer });
    } else {
      storage.set(key, {
        result: output,
        timer: null as unknown as NodeJS.Timeout,
      });
    }

    return output;
  };
};

export default memo;