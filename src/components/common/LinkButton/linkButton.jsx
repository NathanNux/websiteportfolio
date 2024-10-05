import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { scale } from "@/components/anim";

export default function ButtonLink({ href, title, className }) {
    const [ isHovered, setIsHovered ] = useState(false);

    return (
        <div className={`linkButton ${className}`} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <Link href={href} className="link">
                <p className="buttonText">{title}</p>
            </Link>
            <motion.div layout className="dot" variants={scale} initial='initial' animate={isHovered ? 'enter' : 'exit'}></motion.div>
        </div>
    )
}