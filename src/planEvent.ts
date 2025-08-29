const planEvent = (callback, delay) => {
  if (typeof callback !== 'function') {
    throw 'INVALID_ARGUMENT';
  }

  if (typeof delay !== 'number') {
    throw 'INVALID_ARGUMENT';
  }

  return new Promise((onResolve) => {
    if (delay <= 0) {
      onResolve(callback());
    } else {
      setTimeout(async () => {
        const result = await callback();
        onResolve(result);
      }, delay);
    }
  });
};

export default planEvent;