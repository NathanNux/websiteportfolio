import { useEffect, useState } from "react"
import { motion } from "framer-motion"
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
    }, [currentView, filterCategory, trigger]);

    const handleClick = () => {
        onClick();
    };

    return (
        <div className="barButton" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} onClick={handleClick}>
            <div className="link">
                <p className={`${active ? 'black' : ''}`}>{title}</p>
            </div>
            <motion.div className="dot" variants={scale} initial='initial' animate={active ? 'enter' : `${isHovered ? 'enter' : 'exit'}`}></motion.div>
        </div>
    );
}