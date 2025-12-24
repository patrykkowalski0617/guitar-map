export const extendArray = (arr, count) => {
  const elementsToAppend = arr.slice(0, count);
  return [...arr, ...elementsToAppend];
};
