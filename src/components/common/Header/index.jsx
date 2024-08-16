import styles from './style.module.scss';
import Link from 'next/link';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { opacity, background } from './anim';
import Nav from './nav';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Curve from './nav/Curve';


export default function Index() {

    const [isActive, setIsActive] = useState(false);
    const navbar = useRef(null);

    useLayoutEffect(() => {
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
            <section ref={navbar} className={styles.header}>
                <div className={styles.bar}>
                    <div onClick={() => {setIsActive(!isActive)}} className={styles.el}ref={navbar}>
                        <div className={`${styles.burger} ${isActive ? styles.burgerActive : ""}`}></div>
                        <div className={styles.label}>
                            <motion.p variants={opacity} animate={!isActive ? "open" : "closed"}>Menu</motion.p>
                            <motion.p variants={opacity} animate={isActive ? "open" : "closed"}>Close</motion.p>
                        </div>
                    </div>
                </div>
                <motion.div variants={background} initial="initial" animate={isActive ? "open" : "closed"} className={styles.background}>
                </motion.div>
                <AnimatePresence mode="wait">
                    {isActive && <Nav/>}
                </AnimatePresence>
                <Curve isActive={isActive}/>
            </section>
        
    )
}

// import styles from './style.module.scss';
// import { useLayoutEffect, useRef, useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { opacity, background } from './anim';
// import Nav from './nav';
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
// import Curve from './nav/Curve';



// export default function Index() {

//     const [isActive, setIsActive] = useState(false);
//     const navbar = useRef(null);
//     const [bgColor, setBgColor] = useState("transparent");

//     useLayoutEffect(() => {
//         gsap.registerPlugin(ScrollTrigger);
//         gsap.to(navbar.current, {
//             scrollTrigger: {
//                 trigger: document.documentElement,
//                 start: 0,
//                 end: window.innerHeight/3 * 2,
//                 onLeave: () => {
//                     gsap.to(navbar.current, { opacity: 1, duration: 0.5, ease: "power1.out"});
//                 },
//                 onEnterBack: () => {
//                     gsap.to(navbar.current, { opacity: 0, duration: 0.5, ease: "power1.out"});
//                     setIsActive(false);
//                     setTimeout(() => setBgColor('transparent'), 950);
//                 }
//             }
//         });
//     },[isActive, setIsActive]);


//     return (
//         <motion.section ref={navbar} className={styles.header} style={{ backgroundColor: bgColor }} transition={{ duration: 0.5 }}>                
//             <div className={styles.bar}>
//                 <div onClick={() => {
//                     setIsActive(!isActive);
//                     if (!isActive) {
//                         setBgColor('#d7d7d7');
//                     } else {
//                         setTimeout(() => setBgColor('transparent'), 950);
//                     }
//                 }} className={styles.el}>
//                     <div className={`${styles.burger} ${isActive ? styles.burgerActive : ""}`}></div>
//                     <div className={styles.label}>
//                         <motion.p variants={opacity} animate={!isActive ? "open" : "closed"}>Menu</motion.p>
//                         <motion.p variants={opacity} animate={isActive ? "open" : "closed"}>Close</motion.p>
//                     </div>
//                 </div>
//             </div>
//             <motion.div variants={background} initial="initial" animate={isActive ? "open" : "closed"} className={styles.background}>
//             </motion.div>
//             <AnimatePresence mode="wait">
//                 {isActive && <Nav/>}
//             </AnimatePresence>
//             <Curve isActive={isActive}/>
//         </motion.section>
        
//     )
// }

