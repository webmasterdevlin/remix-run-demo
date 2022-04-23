export default function useLog() {
  const log = () => {
    console.log("log");
  };
  return {
    log,
  };
}
