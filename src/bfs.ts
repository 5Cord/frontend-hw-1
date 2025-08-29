const bfs = (graph: { [key: string]: string[] }): string[] => {
  if (typeof graph !== 'object' || graph === null || Array.isArray(graph)) {
    throw 'INVALID_ARGUMENT';
  }

  const root = Object.keys(graph)[0];

  if (!root) {
    return [];
  }

  const queue: string[] = [root];
  const result: string[] = [];

  while (queue.length > 0) {
    const currentNode = queue.shift();
    if (currentNode === undefined) {
      continue;
    }
    result.push(currentNode);

    const children = graph[currentNode];
    if (Array.isArray(children)) {
      for (const child of children) {
        queue.push(child);
      }
    }
  }

  return result;
};

export default bfs;