const dfs = (
  graph: { [key: string]: string[] },
  startNode?: string
): string[] => {
  if (typeof graph !== 'object' || graph === null || Array.isArray(graph)) {
    throw 'INVALID_ARGUMENT';
  }

  if (Object.keys(graph).length === 0) {
    return [];
  }

  const start = startNode || Object.keys(graph)[0];

  if (!graph[start]) {
    return [];
  }

  const result: string[] = [];
  const visited = new Set<string>();

  const dfsRecursive = (node: string) => {
    if (visited.has(node)) {
      return;
    }

    visited.add(node);
    result.push(node);

    for (const child of graph[node]) {
      dfsRecursive(child);
    }
  };

  dfsRecursive(start);

  return result;
};

export default dfs;