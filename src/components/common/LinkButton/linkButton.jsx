import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./linkButton.module.scss";
import { useState } from "react";
import { scale } from "@/components/anim";
import { useRouter } from "next/navigation";

export default function ButtonLink({ href, title, className }) {
    const [ isHovered, setIsHovered ] = useState(false);

    const router = useRouter();

    const scrollBack = () => {
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 2500);
        router.push(href);
    }
    return (
        <div className={`${styles.main} ${className}`} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} onClick={scrollBack}>
            <Link href={href} className={styles.link}>
                <p className={styles.buttonText}>{title}</p>
            </Link>
            <motion.div className={styles.dot} variants={scale} initial='initial' animate={isHovered ? 'enter' : 'exit'}></motion.div>
        </div>
    )
}