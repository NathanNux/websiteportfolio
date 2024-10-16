import { useRef } from "react";
import Projects from "./Projects";
import { motion, useScroll, useTransform } from "framer-motion";

export default function NextProjects ({projects}) {
    const section = useRef(null);
    const projectsRef = useRef(null);
    const curve = useRef(null);

    const { scrollYProgress } = useScroll({
        target: curve,
        offset: ['start end', 'end start']
    })

    const height = useTransform(scrollYProgress, [0, 1], [800, 0])



    return (
        <section ref={section} className="mainNextProjectComponent">
            <div className="text">
                <p>Podívejte se na další <span>Unikátní</span> Projekty</p>
            </div>
            <div ref={projectsRef} className="projects">
                <Projects projects={projects}/>
            </div>

            <div 
                ref={curve}
                className="svgContainer" 
            >
                <motion.div layout style={{height}}  className="svgDiv"></motion.div>
            </div>
        </section>
    )
}