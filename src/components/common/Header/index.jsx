import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { opacity, background } from './anim';
import Nav from './nav';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Curve from './nav/Curve';


export default function Index() {

    const [isActive, setIsActive] = useState(false);
    const navbar = useRef(null);

    useEffect(() => {
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
    },[isActive, setIsActive])

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
