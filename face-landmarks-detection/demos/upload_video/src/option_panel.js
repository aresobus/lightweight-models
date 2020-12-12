/**

 * =============================================================================
 */

import { setupModelFolder } from "./shared/option_panel";

export async function setupDatGui(urlParams) {
  const gui = new dat.GUI({ width: 300 });
  gui.domElement.id = "gui";

  return setupModelFolder(gui, urlParams);
}
