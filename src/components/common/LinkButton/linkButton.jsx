import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./linkButton.module.scss";
import { useEffect, useState } from "react";
import { scale } from "@/components/anim";
import { usePathname } from "next/navigation";

export default function ButtonLink({ href, title, className }) {
    const [ isHovered, setIsHovered ] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const timer = setTimeout(() => {
            window.scrollTo(0, 0);
        }, 1500)

        return () => {
            clearTimeout(timer);
        }
    }, [pathname])

    return (
        <div className={`${styles.main} ${className}`} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <Link href={href} className={styles.link}>
                <p className={styles.buttonText}>{title}</p>
            </Link>
            <motion.div className={styles.dot} variants={scale} initial='initial' animate={isHovered ? 'enter' : 'exit'}></motion.div>
        </div>
    )
}