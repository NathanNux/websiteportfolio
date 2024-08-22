import React, { useEffect, useState, useRef } from 'react'
import { gsap } from 'gsap';

export default function Index({ isActive }) {

    const [windowWidth, setWindowWidth] = useState(0);
    const pathRef = useRef(null);
    const tl = useRef(gsap.timeline({ paused: true }));

    useEffect(() => {
        setWindowWidth(window.innerWidth);
    }, []);

    useEffect(() => {
        const initialPath = `M0,0 Q${windowWidth/2},0 ${windowWidth},0`;
        const targetPath = `M0,0 Q${windowWidth/2},200 ${windowWidth},0`;

        tl.current.clear()
            .to(pathRef.current, { attr: { d: targetPath }, duration: 0.4, ease: [0.76, 0, 0.24, 1] })
            .to(pathRef.current, { attr: { d: initialPath }, duration: 0.3, ease: [0.76, 0, 0.24, 1], delay: 0.2 });

        if (isActive) {
            tl.current.play();
        } else if (tl.current.progress() === 1) {
            tl.current.reverse();
        }
    }, [isActive, windowWidth]);

    const initialPath = `M0,0 Q${windowWidth/2},0 ${windowWidth},0`;

    //we are just checking if the isActive prop is true or false.
    //But we need to check if the timeline playd to the end, so we can reverse it. --> progess() === 1
    //oterwise it will not work.

    return (
        <svg className="svgCurveHeader">
            <path ref={pathRef} d={initialPath}></path>
        </svg>
    )
}