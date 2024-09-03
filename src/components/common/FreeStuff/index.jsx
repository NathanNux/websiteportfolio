import { useEffect, useRef, useState } from "react";
import Projects from "./Projects";
import { motion, useScroll, useTransform } from "framer-motion";

import gsap from "gsap";
import { scaleAnim } from "@/components/anim";

export default function FreeOffers ({text}) {
    const [modal, setModal] = useState(false)

    const cursor = useRef(null); 
    const label = useRef(null);
    const section = useRef(null);
    const projectsRef = useRef(null);
    const curve = useRef(null);

    const { scrollYProgress } = useScroll({
        target: curve,
        offset: ['start end', 'end start']
    })

    const height = useTransform(scrollYProgress, [0, 1], [800, 0])

    // Debounce function
    const debounce = (func, delay) => {
        let debounceTimer;
        return function() {
            const context = this;
            const args = arguments;
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => func.apply(context, args), delay);
        }
    }

    useEffect(() => {
        const projectsElement = projectsRef.current;
        const sectionElement = section.current;

        let scrollY = window.scrollY;

        const handleScroll = () => {
            scrollY = window.scrollY;
        };

        const handleMouseEnter = () => setModal(true);
        const handleMouseLeave = () => setModal(false);

        const handleMouseMove = (e) => {
            const {clientX, clientY} = e;
            const rect = sectionElement.getBoundingClientRect();

            const x = clientX - rect.left;
            const y = clientY - rect.top;

            if (modal) {
                gsap.to(cursor.current, {left: x, top: y, duration: 0.8, ease: 'power3'});
                gsap.to(label.current, {left: x, top: y, duration: 0.8, ease: 'power3'});
            }
        };

        window.addEventListener("scroll", handleScroll, debounce(100));
        projectsElement.addEventListener("mouseenter", handleMouseEnter);
        projectsElement.addEventListener("mouseleave", handleMouseLeave);
        sectionElement.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("scroll", handleScroll, debounce(1));
            projectsElement.removeEventListener("mouseenter", handleMouseEnter);
            projectsElement.removeEventListener("mouseleave", handleMouseLeave);
            sectionElement.removeEventListener("mousemove", handleMouseMove);
        }
    },[modal])

                //LOREM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISCING ELIT. PROIN IN ERAT LIGULA. VESTIBULUM ELEMENTUM EX ET TELLUS MALESUADA, QUIS CONSECTETUR ORCI CONSECTETUR. VESTIBULUM VOLUTPAT, EST SOLICITUDIN POSUERE CONGUE, AUGUE AUGUE DAPIBUS ENIM, A MAXIMUS NUNC EX EGET DUI. PRAESENT ID VENENATIS QUAM, A EFFICITUR LEO. QUISQUE MAURIS MAGNA, MOLLIS A PHARETRA SED, PLACERAT AUCTOR NISI. ETIAM BIBENDUM NEQUE SIT AMET MI TEMPUS, ID ULLAMCORPER URNA ULTRICIES. PELLENTESQUE VOLUTPAT MASSA AT TORTOR MATTIS, ID SAGITTIS EST FEUGIAT.
                //Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin in erat ligula. Vestibulum elementum ex et tellus malesuada, quis consectetur orci consectetur. Vestibulum volutpat, est sollicitudin posuere congue, augue augue dapibus enim, a maximus nunc ex eget dui. Praesent id venenatis quam, a efficitur leo. Quisque mauris magna, mollis a pharetra sed, placerat auctor nisi. Etiam bibendum neque sit amet mi tempus, id ullamcorper urna ultricies. Pellentesque volutpat massa at tortor mattis, id sagittis est feugiat.
    return (
        <section ref={section} className="mainFreeStuff">
            { text && <div className="text">
                 <h1>Chcete začít první sami?</h1>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin in 
                    erat ligula. Vestibulum elementum ex et tellus malesuada, quis consectetur<br /><br />

                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin in erat ligula. Vestibulum elementum ex et tellus malesuada, quis consectetur
                    orci consectetur. Vestibulum volutpat, est sollicitudin posuere congue,<br /><br />

                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Proin in erat ligula. Vestibulum elementum ex et tellus malesuada, quis consectetur orci consectetur. Vestibulum volutpat,</p>
            </div>}

            <div ref={projectsRef} className="projects">
                <Projects/>
            </div>

            <motion.div ref={cursor} className="cursor" variants={scaleAnim} animate={modal ? 'enter': 'exit'}></motion.div>
            <motion.div ref={label} className="label" variants={scaleAnim} animate={modal ? 'enter': 'exit'}>
                <p>Získat</p>
            </motion.div>

            <motion.div 
                ref={curve}
                className="svgContainer"
            >
                <motion.div style={{height}}  className="svgDiv"></motion.div>
            </motion.div>
        </section>
    )
}