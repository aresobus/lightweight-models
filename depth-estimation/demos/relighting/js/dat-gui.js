async function setupDatGui() {
  const gui = new dat.GUI({ width: 300 });
  gui.domElement.id = "gui";

  const shaderType = gui.addFolder("ShaderType");
  const selectedShaderType = new URLSearchParams(window.location.search).get(
    "shader_type"
  );
  const controller = shaderType.add(STATE, "shaderType", [
    "Point lights",
    "Sunbeam",
  ]);

  controller.setValue(
    selectedShaderType === "point" ? "Point lights" : "Sunbeam"
  );
  controller.onChange((type) => {
    const param = type === "Sunbeam" ? "sunbeam" : "point";
    window.location.search = `shader_type=${param}`;
  });

  shaderType.open();
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
    if (
      uniform[uniform.length - 1] === "both" ||
      uniform[uniform.length - 1] === STATE.shaderType
    ) {
      if (uniform.length === 4) {
        folderController.add(STATE, uniform[0], uniform[1], uniform[2]);
      } else {
        folderController.addColor(STATE, uniform[0]);
      }
    }
  }
}
