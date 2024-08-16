import { Canvas } from "@react-three/fiber";
import Model from "../Model";

import styles from "./style.module.scss";

export default function Scene ({activeProject, containerRef}) {
    return (
        <div className={styles.main}>
            <Canvas>
                <Model activeProject={activeProject} containerRef={containerRef}/>
            </Canvas>
        </div>
    )
}
