import Projects from './Projects'
import Scene from '@/components/LandingPage/NewestWork/Scene';
import { useEffect, useRef, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

export default function NewestWork () {
    const [ activeProject, setActiveProject ] = useState(null);
    const ref = useRef(null);
    const [disableScene, setDisableScene] = useState(false);
    const isTouchDevice = useMediaQuery({ query: '(hover: none) and (pointer: coarse)' });

    useEffect(() => {
        if (isTouchDevice) {
            setDisableScene(true);
        }
    }, [isTouchDevice]);

    return (
        <section className="mainNewestWork" ref={ref}>
            <div className="title">
                <p>Mé nejnovější | Projekty</p>
            </div>
            <div className="section">
                <Projects setActiveProject={setActiveProject}/>
            </div>
            { !disableScene && 
                <Scene activeProject={activeProject} containerRef={ref}/>
            }
        </section>
    );
}