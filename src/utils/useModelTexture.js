import { useTexture } from "@react-three/drei";

export function useModelTexture(projects) {
    const textures = projects.map((project) => useTexture(project.src));

    return textures;
}

// maybe check for the exiting of the texture error and add a try catch block or if block to check if the texture is loaded