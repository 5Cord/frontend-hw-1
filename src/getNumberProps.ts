const getNumberProps = (obj: object): string[] => {
  if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) {
    throw 'INVALID_ARGUMENT';
  }

  const traverse = (currentObj: object, result: string[] = []): string[] => {
    for (const key in currentObj) {
      if (Object.prototype.hasOwnProperty.call(currentObj, key)) {
        const value = currentObj[key];

        if (typeof value === 'number') {
          result.push(key);
        } else if (
          typeof value === 'object' &&
          value !== null &&
          !Array.isArray(value)
        ) {
          traverse(value, result);
        }
      }
      // Или можно так
      // if (Object.hasOwn(currentObj, key)) {
      //   const value = currentObj[key];

      //   if (typeof value === 'number') {
      //     result.push(key);
      //   } else if (
      //     typeof value === 'object' &&
      //     value !== null &&
      //     !Array.isArray(value)
      //   ) {
      //     traverse(value, result);
      //   }
      // }
    }
    return result;
  };

  const numberProps = traverse(obj);

  return numberProps.sort();
};

export default getNumberProps;