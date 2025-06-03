
import "./scripts";
import {
  AssetType, Scene, WebGLEngine, Loader, Logger, WebGLEngineConfiguration,
} from "@galacean/engine";


import { PhysXPhysics } from "@galacean/engine-physics-physx";


import { ShaderLab } from "@galacean/engine-shaderlab";
import { registerIncludes } from "@galacean/engine-shader-shaderlab";


import projectInfo from "../project.json";


export async function init(canvas: HTMLCanvasElement) {
  const config: WebGLEngineConfiguration = {
    canvas,
    physics: undefined,
    shaderLab: undefined,
    graphicDeviceOptions: projectInfo.runtimeOptions.webGLRendererOptions
  };

  config.shaderLab = new ShaderLab();
  Logger.enable();
  registerIncludes();
  config.physics = new PhysXPhysics();

  const engine = await WebGLEngine.create(config);
  document.oncontextmenu = (e) => {
    e.preventDefault();
  };
  engine.canvas.resizeByClientSize(projectInfo.runtimeOptions.devicePixelRatioMode === "Fixed" ? projectInfo.runtimeOptions.devicePixelRatio : undefined);


  await engine.resourceManager
    .load({
      url: projectInfo.url,
      type: AssetType.Project,
    })
    .catch((e) => {
      throw e;
    });





  engine.run();
  return engine;
};