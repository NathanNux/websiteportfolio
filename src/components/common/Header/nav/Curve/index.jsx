import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap';
import { motion } from 'framer-motion';

export default function Index({ isActive }) {
    const pathRef = useRef(null);
    const tl = useRef(gsap.timeline({ paused: true }));

    useEffect(() => {
        function resize () {
            const width = window.innerWidth;
            const initialPath = `M0,0 Q${width/2},0 ${width},0`;
            if (pathRef.current) {
                pathRef.current.setAttribute('d', initialPath);
            }
        };
        resize();
        window.addEventListener('resize', resize);
        return () => {
            window.removeEventListener('resize', resize);
        }
    }, []);
    // I needed to ask copilot to help me with the svg path, because it re-renders the path on every resize, so I needed to make it dynamic.
    // he suggested to not use state for the dimensions, but to use the window.innerWidth directly in the resize function.
    // this will run everytime the window is resized, and it will set the path to the initial path, so it will be always the same as the window width.
    // and the anim that way will not with a bug on resize.
    // now the path is set on client and will be same on every sesize, so the anim will work as expected. 
    // I don't expect ppl to play the anim and resize at the same time, so it should be fine.
    // this should also make the anim more performant, because it will not re-render the path on every resize, but only set the path to the initial path.


    useEffect(() => {
        if (!pathRef.current ) return;
        const width = window.innerWidth;
        const initialPath = `M0,0 Q${width/2},0 ${width},0`;
        const targetPath = `M0,0 Q${width/2},200 ${width},0`;

        tl.current.clear()
            .to(pathRef.current, { attr: { d: targetPath }, duration: 0.4, ease: [0.76, 0, 0.24, 1] })
            .to(pathRef.current, { attr: { d: initialPath }, duration: 0.3, ease: [0.76, 0, 0.24, 1], delay: 0.2 });

        if (isActive) {
            tl.current.play();
        } else if (tl.current.progress() === 1) {
            tl.current.reverse();
        }
    }, [isActive]);

    //we are just checking if the isActive prop is true or false.
    //But we need to check if the timeline played to the end, so we can reverse it. --> progess() === 1
    //oterwise it will not work.

    return (
        <motion.svg className="svgCurveHeader">
            <motion.path ref={pathRef}></motion.path>
        </motion.svg>
    )
}