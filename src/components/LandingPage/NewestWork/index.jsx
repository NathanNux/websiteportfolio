import Projects from './Projects'
import Scene from '@/components/LandingPage/NewestWork/Scene';
import { useLoad } from '@/context';
import useGetLocation from '@/utils/useGetLocation';
import { useEffect, useRef, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

export default function NewestWork () {
    const [ activeProject, setActiveProject ] = useState(null);
    const ref = useRef(null);
    const [disableScene, setDisableScene] = useState(false);
    const isTouchDevice = useMediaQuery({ query: '(hover: none) and (pointer: coarse)' });

    useGetLocation();
    const { isHomeCountry } = useLoad();

    useEffect(() => {
        if (isTouchDevice) {
            setDisableScene(true);
        }
    }, [isTouchDevice]);

    return (
        <section className="mainNewestWork" ref={ref}>
            <div className="title">
                <p>{ isHomeCountry ? "Mé Nejnovější | Projekty" : "My Newest | Projects"}</p>
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