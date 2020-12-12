/** Whether the current environment is in web worker or not. */
export function isWebWorker(): boolean {
  return typeof window === "undefined";
}
