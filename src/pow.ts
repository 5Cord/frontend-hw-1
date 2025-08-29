const pow = (a: number, b?: number): any => {
  if (typeof a !== 'number') {
    throw new Error('INVALID_ARGUMENT');
  }

  if (b !== undefined) {
    if (typeof b !== 'number') {
      throw new Error('INVALID_ARGUMENT');
    }
    return a ** b;
  }

  return (c: number) => {
    if (typeof c !== 'number') {
      throw new Error('INVALID_ARGUMENT');
    }
    return a ** c;
  };
};

export default pow;

// const pow = (a: number) => (b: number) => {
//   if (typeof a !== 'number' || typeof b !== 'number') {
//     throw new Error('INVALID_ARGUMENT');
//   }
//   return a ** b;
// };

// export default pow;
