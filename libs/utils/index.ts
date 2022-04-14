export * from './exception';
export const getTimeExecution = (now = 0) => {
  const execTime = Date.now() - now;
  const seconds = ((execTime % 60000) / 1000).toFixed(3);
  return `${(Number(seconds) < 10 ? '0' : '') + seconds}ms`;
};
