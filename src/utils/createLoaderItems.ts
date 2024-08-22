export const createLoaderItems = (count: number) => {
  const data = [];
  for (let i = 0; i < count; i++) {
    data.push({id: i});
  }
  return data;
};
