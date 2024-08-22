import { Canvas } from "@react-three/fiber";
import Model from "../Model";

export default function Scene ({activeProject, containerRef}) {
    return (
        <div className="mainLandingScene">
            <Canvas>
                <Model activeProject={activeProject} containerRef={containerRef}/>
            </Canvas>
        </div>
    )
}

// Note: When you want the canvas have the full width and height of the component, like image
// it needs to be inside a div to take th divs width and height