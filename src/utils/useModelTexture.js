import { useTexture } from "@react-three/drei";

export function useModelTexture(projects) {
  const texture = projects.map((project, i) => useTexture(project.src));
  return texture;
}

// maybe check for the exiting of the texture error and add a try catch block or if block to check if the texture is loaded