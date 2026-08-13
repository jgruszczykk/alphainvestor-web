import { Composition } from "remotion";
import { AD, AdVideo } from "./AdVideo";
import { ProductVideo, VIDEO } from "./ProductVideo";

export function RemotionRoot() {
  return (
    <>
      <Composition id="AdVideo" component={AdVideo} durationInFrames={AD.durationInFrames} fps={AD.fps} width={AD.width} height={AD.height} />
      <Composition id="ProductVideo" component={ProductVideo} durationInFrames={VIDEO.durationInFrames} fps={VIDEO.fps} width={VIDEO.width} height={VIDEO.height} />
    </>
  );
}
