export function initUid(prefix) {
  let count = 0;
  return () => {
    count++;
    return prefix + count;
  };
}
