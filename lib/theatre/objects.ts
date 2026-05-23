import { types } from "@theatre/core";
import { inhabitSheet } from "./project";

export const inhabitCameraObject = inhabitSheet.object("Camera", {
  position: types.compound({
    x: types.number(0, { range: [-50, 50] }),
    y: types.number(1.6, { range: [-10, 10] }),
    z: types.number(5, { range: [-50, 50] }),
  }),
  rotation: types.compound({
    x: types.number(0, { range: [-Math.PI, Math.PI] }),
    y: types.number(0, { range: [-Math.PI, Math.PI] }),
    z: types.number(0, { range: [-Math.PI, Math.PI] }),
  }),
  fov: types.number(50, { range: [10, 120] }),
});
