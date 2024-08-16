import { useRef } from "react";
import Projects from "./Projects";
import { motion, useScroll, useTransform } from "framer-motion";

import styles from "./style.module.scss";

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
        <section ref={section} className={styles.main}>
            <div ref={projectsRef} className={styles.projects}>
                <Projects photos={images}/>
            </div>

            <motion.div 
                ref={curve}
                className={styles.svgContainer} 
            >
                <motion.div style={{height}}  className={styles.svgDiv}></motion.div>
            </motion.div>
        </section>
    )
}