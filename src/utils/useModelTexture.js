import { useTexture } from "@react-three/drei";
import { useState, useEffect } from "react";

export function useModelTexture(projects) {
  const [texturePaths, setTexturePaths] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);

  // Update texture paths when projects change
  useEffect(() => {
    setTexturePaths(projects.map(project => project.src));
  }, [projects]);

  // Load textures using updated paths
  const textures = useTexture(texturePaths);

  // Check if textures are loaded
  useEffect(() => {
    if (textures.length > 0 && textures.every(texture => texture.isLoaded)) {
      setLoaded(true);
      setError(null); // Clear any previous errors if textures have loaded successfully
    } else if (textures.length !== projects.length) {
      // Handle the case where not all textures are loaded
      setError("Textures not loaded");
    }
  }, [textures, projects.length]);

  return { textures, loaded, error };
}

// maybe check for the exiting of the texture error and add a try catch block or if block to check if the texture is loaded