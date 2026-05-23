export type WebGLVerdict = { ok: boolean; reason?: string };

const MIN_TEXTURE_SIZE = 4096;
const MIN_CORES = 4;

export function probeWebGL(): WebGLVerdict {
  if (typeof window === "undefined") return { ok: false, reason: "ssr" };

  const cores = navigator.hardwareConcurrency ?? 0;
  if (cores < MIN_CORES) return { ok: false, reason: "low-cores" };

  const canvas = document.createElement("canvas");
  const gl: WebGLRenderingContext | WebGL2RenderingContext | null =
    canvas.getContext("webgl2") ?? canvas.getContext("webgl");

  if (!gl) return { ok: false, reason: "no-webgl" };

  const maxTexture = gl.getParameter(gl.MAX_TEXTURE_SIZE) as number;

  // Release the probe context immediately so it doesn't sit in the WebGL pool.
  gl.getExtension("WEBGL_lose_context")?.loseContext();

  if (typeof maxTexture !== "number" || maxTexture < MIN_TEXTURE_SIZE) {
    return { ok: false, reason: "low-max-texture" };
  }

  return { ok: true };
}
