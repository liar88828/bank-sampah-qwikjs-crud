export const testTime = (fun: () => void) => {
  console.time();
  const data = fun();
  console.time();
  return data;
};
