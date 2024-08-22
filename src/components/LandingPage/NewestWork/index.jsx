import Projects from './Projects'
import Scene from '@/components/LandingPage/NewestWork/Scene';
import { useRef, useState } from 'react';

export default function NewestWork () {
    const [ activeProject, setActiveProject ] = useState(null);
    const ref = useRef(null);

    return (
        <section className="mainNewestWork" ref={ref}>
            <div className="title">
                <p>Mé nejnovější | Projekty</p>
            </div>
            <div className="section">
                <Projects setActiveProject={setActiveProject}/>
            </div>
            <Scene activeProject={activeProject} containerRef={ref}/>
        </section>
    );
}