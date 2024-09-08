import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { opacity, background } from './anim';
import Nav from './nav';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Curve from './nav/Curve';
import { useMediaQuery } from 'react-responsive';


export default function Index({ isActive, setIsActive }) {
    const isTouchDevice = useMediaQuery({ query: '(max-width: 500px) and (max-height: 950px)' });
    const [disableAnimation, setDisableAnimation] = useState(false);
    const navbar = useRef(null);

    // WIP: could pass menu action to open and close the menu to the navbar component and create a button to open and close the menu there as well.

    useEffect(() => {
        if(isTouchDevice) {
            setDisableAnimation(true);
        }
    }, []);
    useEffect(() => {
        if(!disableAnimation) {
            gsap.registerPlugin(ScrollTrigger);
            gsap.to(navbar.current, {
                scrollTrigger: {
                    trigger: document.documentElement,
                    start: 0,
                    end: window.innerHeight/3 * 2,
                    onLeave: () => {
                        gsap.to(navbar.current, {opacity: 1, duration: 0.5, ease: "power1.out",}
                    )},
                    onEnterBack: () => {
                        gsap.to(navbar.current, {opacity: 0, duration: 0.5, ease: "power1.out",},
                        setIsActive(false)
                    )}
                }
            })
        }
    },[ disableAnimation,isActive, setIsActive])

    useEffect(() => {
        if(disableAnimation) {
            if(isActive) {
                gsap.to(navbar.current, {opacity: 1, duration: 0.5, ease: "power1.out",})
            } else {
                gsap.to(navbar.current, {opacity: 0, duration: 0.5, delay: 1, ease: "power1.out",})
            }   
        }
    }, [isActive, disableAnimation])

    return (
            <section ref={navbar} className="header">
                <div className="bar">
                    <div onClick={() => {setIsActive(!isActive)}} className="el" ref={navbar}>
                        <div className={`burger ${isActive ? "burgerActive" : ""}`}></div>
                        <div className="label">
                            <motion.p variants={opacity} animate={!isActive ? "open" : "closed"}>Menu</motion.p>
                            <motion.p variants={opacity} animate={isActive ? "open" : "closed"}>Close</motion.p>
                        </div>
                    </div>
                </div>
                <motion.div variants={background} initial="initial" animate={isActive ? "open" : "closed"} className="background">
                </motion.div>
                <AnimatePresence mode="wait">
                    {isActive && <Nav/>}
                </AnimatePresence>
                <Curve isActive={isActive}/>
            </section>
        
    )
}
