const sort = (str: string): string => {
  if (typeof str !== 'string') {
    throw new Error('INVALID_ARGUMENT');
  }

  const words = str.toLowerCase().split(' ');

  const sortedWordsWithLength = words.map((word, index) => {
    const sortedWord = word.split('').sort().join('');
    return { sortedWord, originalLength: word.length, originalIndex: index };
  });

  sortedWordsWithLength.sort((a, b) => {
    if (a.originalLength !== b.originalLength) {
      return a.originalLength - b.originalLength;
    }
    return a.originalIndex - b.originalIndex;
  });

  const sortedWords = sortedWordsWithLength.map((item) => item.sortedWord);
  return sortedWords.join(' ');
};

export default sort;