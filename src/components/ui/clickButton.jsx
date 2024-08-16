import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import styles from "./clickButton.module.scss"
import { scale } from "@/components/anim";

export default function ButtonClick({ title, onClick, currentView, filterCategory, trigger, svgPaths }) {
    const [isHovered, setIsHovered] = useState(false);
    const [active, setActive] = useState(false);

    useEffect(() => {
        if ((currentView === trigger)) {
            setActive(true);
        } else if ((filterCategory === trigger)) {
            setActive(true);
        } else {
            setActive(false);
        }
    }, [currentView, filterCategory]);

    const handleClick = () => {
        setActive(!active);
        onClick();
    };

    return (
        <div className={styles.barButton} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} onClick={handleClick}>
            <div className={styles.link}>
                <p className={`${active ? styles.black : ''}`}>{title}</p>
                {svgPaths && 
                    <div className={styles.svgContainer}>
                        <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                            width="500.000000pt" height="500.000000pt" viewBox="0 0 500.000000 500.000000"
                            preserveAspectRatio="xMidYMid meet"
                        >
                            <g transform="translate(0.000000,500.000000) scale(0.100000,-0.100000)"
                                fill="#000000" stroke="none"
                            >
                                {svgPaths.map((pathData, i) => (
                                    <path key={i} d={pathData.d} className={`${active ? styles.blackSVG : ''}`}/>
                                ))}
                            </g>
                        </svg> 
                    </div>
                }
            </div>
            <motion.div className={styles.dot} variants={scale} initial='initial' animate={active ? 'enter' : `${isHovered ? 'enter' : 'exit'}`}></motion.div>
        </div>
    );
}