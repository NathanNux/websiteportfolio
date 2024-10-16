import { useTexture } from "@react-three/drei";

export function useModelTexture(projects) {
    const sources = projects.map((project) => project.src);
    const textures = useTexture(sources);
    // useTexture cannot be used in project.map() that brakes the react hook rules. 

    return textures;
}

// maybe check for the exiting of the texture error and add a try catch block or if block to check if the texture is loaded