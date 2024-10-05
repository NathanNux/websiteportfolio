import { useRef } from "react";
import Projects from "./Projects";
import { motion, useScroll, useTransform } from "framer-motion";

export default function MobileView ({images}) {
    const section = useRef(null);
    const projectsRef = useRef(null);
    const curve = useRef(null);

    const { scrollYProgress } = useScroll({
        target: curve,
        offset: ['start end', 'end start']
    })

    const height = useTransform(scrollYProgress, [0, 1], [800, 0])



    return (
        <section ref={section} className="mainMobileView">
            <div ref={projectsRef} className="projects">
                <Projects photos={images}/>
            </div>

            <motion.div 
                ref={curve}
                className="svgContainer"
                layout
            >
                <motion.div layout style={{height}}  className="svgDiv"></motion.div>
            </motion.div>
        </section>
    )
}