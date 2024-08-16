import { useEffect, useRef, useState } from "react";
import Projects from "./Projects";
import { motion, useScroll, useTransform } from "framer-motion";

import styles from "./style.module.scss";
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

    return (
        <section ref={section} className={styles.main}>
            { text && <div className={styles.text}>
                 <h1>Nejste si jisti?</h1>
                <p>Vím, že proces webových stránkej je náročný a těžký, ale i drahý. 
                    doporučuji všem Vám s malými nebo začínajícími podniky začít sami.<br /><br />

                    Ale abych Vám mohl pomoci alespoň nějak od stovkách náročných hodin, ne-li tísíce (v mém případě) při výtvory vašeho díla, 
                    mám pro Vás tekuté zlato z mé cesty vytváření skvělých webů.<br /><br />

                    Abyste nedělali stejné chyby, kterých jsem se dopustil,
                    projdu společně s Vámi každý krok za krokem jednodychými postupy, které Vám přinesou skvělý začátek už během pár hodin práce, ne déle</p>
            </div>}

            <div ref={projectsRef} className={styles.projects}>
                <Projects/>
            </div>

            <motion.div ref={cursor} className={styles.cursor} variants={scaleAnim} animate={modal ? 'enter': 'exit'}></motion.div>
            <motion.div ref={label} className={styles.label} variants={scaleAnim} animate={modal ? 'enter': 'exit'}>
                <p>Získat</p>
            </motion.div>

            <motion.div 
                ref={curve}
                className={styles.svgContainer} 
            >
                <motion.div style={{height}}  className={styles.svgDiv}></motion.div>
            </motion.div>
        </section>
    )
}