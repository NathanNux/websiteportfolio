import dynamic from 'next/dynamic';
import Projects from './Projects'
const Scene = dynamic(() => import('@/components/LandingPage/NewestWork/Scene'), { ssr: false });
import styles from './styles.module.scss';
import { useRef, useState } from 'react';

export default function () {
    const [ activeProject, setActiveProject ] = useState(null);
    const ref = useRef(null);

    return (
        <section className={styles.main} ref={ref}>
            <div className={styles.title}>
                <p>Mé nejnovější | Projekty</p>
            </div>
            <div className={styles.section}>
                <Projects setActiveProject={setActiveProject}/>
            </div>
            <Scene activeProject={activeProject} containerRef={ref}/>
        </section>
    );
}