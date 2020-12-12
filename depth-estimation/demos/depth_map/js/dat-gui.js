async function setupDatGui() {
  const gui = new dat.GUI({ width: 300 });
  gui.domElement.id = "gui";

  // The shader folder contains parameters for the shader.
  const shaderFolder = gui.addFolder("Shader");

  showShaderConfigs(shaderFolder);

  shaderFolder.open();

  const modelFolder = gui.addFolder("Model");

  modelFolder.add(STATE, "DepthCachedFrames", 1, 60).step(1);

  modelFolder.open();

  return gui;
}

async function showShaderConfigs(folderController) {
  // Clean up shader configs for the previous model.
  const fixedSelectionCount = 0;
  while (folderController.__controllers.length > fixedSelectionCount) {
    folderController.remove(
      folderController.__controllers[folderController.__controllers.length - 1]
    );
  }

  for (const uniform of shaderUniforms) {
    folderController.add(STATE, uniform[0], uniform[1], uniform[2]);
  }
}
