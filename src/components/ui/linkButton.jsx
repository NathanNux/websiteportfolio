import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./linkButton.module.scss";
import { useState } from "react";
import { scale } from "@/components/anim";

export default function ButtonLink({ href, title, className }) {
    const [ isHovered, setIsHovered ] = useState(false);
    return (
        <div className={`${styles.main} ${className}`} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <Link href={href} className={styles.link}>
                <p className={styles.buttonText}>{title}</p>
            </Link>
            <motion.div className={styles.dot} variants={scale} initial='initial' animate={isHovered ? 'enter' : 'exit'}></motion.div>
        </div>
    )
}