import React from "react";
import { WebGLEngine } from "@galacean/engine";

import { init } from "./index";

interface AppProps {
  onLoad?: (engine: WebGLEngine) => void;
  onError?: (e: any) => void;
}

function App(props: AppProps) {
  React.useEffect(() => {
    init(document.getElementById("canvas") as HTMLCanvasElement)
      .then((engine) => {
        props.onLoad && props.onLoad(engine);
      })
      .catch((e) => {
        props.onError && props.onError(e);
      });
  }, []);

  return (
    <canvas id="canvas" style={{ width: "100%", height: "100%" }} />
  );
}

export default App;
