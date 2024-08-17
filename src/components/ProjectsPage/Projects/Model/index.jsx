import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { animate, useMotionValue, useTransform } from "framer-motion";
import { useAspect, useTexture } from "@react-three/drei";
import useMouse from "@/utils/useMouse"
import { fragment, vertex } from "../Shader";
import { motion } from "framer-motion-3d";
import { projects } from "@/constants";

// const is causing erro because the images are not loaded yet and the useTexture is used in callback function.
function useProjectTextures(projects) {
    const textures = projects.map((project, i) => useTexture(project.src));
    return textures;    
}

// we have passed the activeProject as a prop to the model component and then we need to show it individually
export default function Model ({ activeProject, containerRef }) {
    // Refs
    const mesh = useRef(null); // three.js mesh component work in cartographic coordinates, so we need to convert the mouse position from pixels to cartographic coordinates

    // Utils
    const lerp = (x, y, a) => x * (1 - a) + y * a; // create the linear interpolation for the mouse position to make it smooth

    // Hooks
    const { viewport, camera } = useThree(); // this hook will give us access to the width and height context of our window, that leaves us with measuring the min and max values the scene can go to. so width/2 and * -1 for the other side
    const dimension = containerRef.current.getBoundingClientRect(); // if the parrent compoment (the scene) is bigger than the viewport, we need to get the dimension of the container to make the mouse move correctly and creates no offset
    const mouse = useMouse(containerRef);
    const opacity = useMotionValue(0);

    // Motion values
    const smoothMouse = {
        x: useMotionValue(0),
        y: useMotionValue(0),
    };


    // Textures
    // const textures = projects.map((project, i)=> useTexture(project.src)); // creating a texture for the component - need to access the project images
    const textures = useProjectTextures(projects);

    // Uniforms
    const uniforms = useRef({
        uTexture: { value: textures[0] }, // for using the texture I need to set up uniforms in the shader material
        uDelta: {value: {x: 0, y: 0} }, // now we need to create the effect
        uAmplitude: { value: 0.0005 },
        uAlpha: { value: 1},
    });

    const baseWidth = 1920;
    const baseHeight = 1080;

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

    const scale = useAspect(
        16,
        10,
        0.125
    )

    // Transforms
    const x = useTransform(smoothMouse.x, [0, dimension.width], [-1 * viewport.width / 2, viewport.width / 2]); // we can't use window.innerWidth because we are in next.js and it will be undefined - ssr
    const y = useTransform(smoothMouse.y, [0, dimension.height], [viewport.height / 2, -1 * viewport.height / 2]);

    // Render
    return(
        <motion.mesh scale={scale} position-x={x} position-y={y} ref={mesh}>
            <planeGeometry args={[1, 1.15, 100, 100]}/> {/* first is height and widht of the plane and then how much detailed we want it to be */}
            <shaderMaterial 
                vertexShader={vertex} // we need 2 things for the photo vertex shader and fragment shader, they can be custom
                fragmentShader={fragment}
                uniforms={uniforms.current}
                transparent={true}
            />
        </motion.mesh>
    )
}