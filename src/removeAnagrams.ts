const removeAnagrams = (arr: string[]): string[] => {
  if (!Array.isArray(arr)) {
    throw new Error('INVALID_ARGUMENT');
  }

  arr.forEach((item) => {
    if (typeof item !== 'string') {
      throw new Error('INVALID_ELEMENT_IN_ARRAY');
    }
  });

  if (arr.length == 1) {
    throw new Error('INVALID_ARGUMENT');
  }

  const sortString = (str: string): string => str.split('').sort().join('');

  const anagramCounts: { [key: string]: number } = {};

  arr.forEach((item) => {
    const sorted = sortString(item);
    anagramCounts[sorted] = (anagramCounts[sorted] || 0) + 1;
  });

  const result = arr.filter((item) => {
    const sorted = sortString(item);
    return anagramCounts[sorted] === 1;
  });

  return result;
};

export default removeAnagrams;