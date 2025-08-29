const sum = (...arg: number[]): number => {
  if (arg.length < 2) {
    throw new Error('INVALID_ARGUMENTS_COUNT');
  }
  if (!arg.every((el) => typeof el === 'number')) {
    throw new Error('INVALID_ARGUMENT');
  }

  return arg.reduce((acc, item) => acc + item, 0);
};

export default sum;
