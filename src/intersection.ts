const intersection = (arr1: number[], arr2: number[]): number[] => {
  if (arr1 === undefined || arr2 === undefined) {
    throw new Error('INVALID_ARGUMENTS_COUNT');
  }
  if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
    throw new Error('INVALID_ARGUMENT');
  }
  const isValidArray = (arr: any[]): boolean =>
    arr.every((item) => typeof item === 'number');
  if (!isValidArray(arr1) || !isValidArray(arr2)) {
    throw new Error('INVALID_ELEMENT_IN_ARRAY');
  }
  const set2 = new Set(arr2);
  const intersectionArr = arr1.filter((item) => set2.has(item));
  const uniqueIntersectionArr = Array.from(new Set(intersectionArr));
  return uniqueIntersectionArr;
};

export default intersection;