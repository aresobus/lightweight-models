/**

 * =============================================================================
 */

export function getMainHeaderString(): string;
export function getMainHeaderString(index: string): string;
export function getMainHeaderString(...params: string[]): string {
  let snippet: string;
  switch (params.length) {
    case 0:
      snippet = `fn main() `;
      break;
    case 1:
      snippet = `fn main(${params[0]} : i32)`;
      break;
    default:
      throw Error("Unreachable");
  }
  return snippet;
}
