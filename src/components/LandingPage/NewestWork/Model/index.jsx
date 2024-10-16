import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { animate, useMotionValue, useTransform } from "framer-motion";
import { useAspect } from "@react-three/drei";
import useDimensions from "@/utils/useDimensions";
import useMouse from "@/utils/useMouse"
import { fragment, vertex } from "../Shader";
import { motion } from "framer-motion-3d";
import { NewestProjects } from "@/constants";
import { useModelTexture } from "@/utils/useModelTexture";

// we have passed the activeProject as a prop to the model component and then we need to show it individually
export default function Model ({ activeProject, containerRef }) {
    // Refs
    const mesh = useRef(null); // three.js mesh component work in cartographic coordinates, so we need to convert the mouse position from pixels to cartographic coordinates
    const textures = useModelTexture(NewestProjects) // creating a texture for the component - need to access the project images

    // Utils
    const lerp = (x, y, a) => x * (1 - a) + y * a; // create the linear interpolation for the mouse position to make it smooth

    // Hooks
    const { viewport } = useThree(); // this hook will give us access to the width and height context of our window, that leaves us with measuring the min and max values the scene can go to. so width/2 and * -1 for the other side
    const dimension = useDimensions();
    const mouse = useMouse(containerRef);
    const opacity = useMotionValue(0);
    const { width, height } = textures[0].image;

    // Textures
    // const textures = NewestProjects.map((project, i)=> useTexture(project.src)); // creating a texture for the component - need to access the project images
    // Motion values
    const smoothMouse = {
        x: useMotionValue(0),
        y: useMotionValue(0),
    };

    // Uniforms
    const uniforms = useRef({
        uTexture: { value: textures[0] }, // for using the texture I need to set up uniforms in the shader material
        uDelta: {value: {x: 0, y: 0} }, // now we need to create the effect
        uAmplitude: { value: 0.0005 },
        uAlpha: { value: 1},
    });

    // Aspect ratio
    const scale = useAspect(
        width,
        height,
        0.3
    );

    // Effects
    useEffect(() => { // now I need to create useEffect for the texture change manually
        if(mesh.current && mesh.current.material) {
            if(activeProject != null) {
                animate(opacity, 1, { duration: 0.5, onUpdate: progress => mesh.current.material.uniforms.uAlpha.value = progress})
                mesh.current.material.uniforms.uAlpha.value = 1;
                mesh.current.material.uniforms.uTexture.value = textures[activeProject];
            }
            else{
                animate(opacity, 0, { duration: 0.5, onUpdate: progress => mesh.current.material.uniforms.uAlpha.value = progress})
                mesh.current.material.uniforms.uAlpha.value = 0;
            }
        }
    }, [activeProject, opacity, textures]);

    useFrame(() => { // this effect works that you have 2 values of the mouse, the real and the smooth
        const { x, y } = mouse;
        const smoothX = smoothMouse.x.get();
        const smoothY = smoothMouse.y.get();   
        smoothMouse.x.set(lerp(smoothX, x.get(), 0.15)); // the smooth is calculate as the position that is behind to real one to the x and y and then we are updating the smooth position with the real one by the set %
        smoothMouse.y.set(lerp(smoothY, y.get(), 0.15));
        mesh.current.material.uniforms.uDelta.value = {
            x: x.get() - smoothX,
            y: -1 * (y.get() - smoothY),
        }
    });

    // Transforms
    const x = useTransform(smoothMouse.x, [0, dimension.width], [-1 * viewport.width / 2, viewport.width / 2]); // we can't use window.innerWidth because we are in next.js and it will be undefined - ssr
    const y = useTransform(smoothMouse.y, [0, dimension.height], [viewport.height / 2, -1 * viewport.height / 2]);

    // Render
    return(
        <motion.mesh scale={scale} position-x={x} position-y={y} ref={mesh}>
            <planeGeometry args={[1, 1, 55, 55]}/> {/* first is height and widht of the plane and then how much detailed we want it to be */}
            <shaderMaterial 
                vertexShader={vertex} // we need 2 things for the photo vertex shader and fragment shader, they can be custom
                fragmentShader={fragment}
                uniforms={uniforms.current}
                transparent={true}
            />
        </motion.mesh>
    )
}