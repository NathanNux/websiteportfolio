import { Canvas } from "@react-three/fiber";
import Model from "../Model";

export default function Scene ({activeProject, containerRef}) {
    return (
        <div className="mainProjectsAllScene">
            <Canvas>
                <Model activeProject={activeProject} containerRef={containerRef}/>
            </Canvas>
        </div>
    )
}
