import { useEffect, useState } from "react"

import styles from "./style.module.scss"
import Link from "next/link";
import { scale } from "@/components/anim";
import { motion } from "framer-motion";
import { footerLinks } from "@/constants";

export default function Footer () {

    const [timeString, setTimeString] = useState(getTimeString());
    const [ isHovered, setIsHovered ] = useState(null);
    const [ delay, setDelay ] = useState(false);

    function getTimeString() {
        const date = new Date();
        const options = { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Europe/Prague', timeZoneName: 'short' };
        let time = date.toLocaleTimeString('en-US', options);
        return time.replace('GMT+1', 'CET').replace('GMT+2', 'CEST');
    }

    useEffect(() => {
        // Function to update time immediately
        const updateTime = () => {
            setTimeString(getTimeString());
        };

        // Calculate the remaining time until the next minute
        const now = new Date();
        const msUntilNextMinute = 60000 - (now.getSeconds() * 1000 + now.getMilliseconds());

        // Update time immediately for the first time
        updateTime();

        // Set a timeout to update the time at the start of the next minute
        const timeoutId = setTimeout(() => {
            updateTime();
            // After the first update, continue updating every minute
            const intervalId = setInterval(updateTime, 60000);

            // Cleanup function to clear the interval and timeout when the component unmounts
            return () => {
                clearInterval(intervalId);
                clearTimeout(timeoutId);
            };
        }, msUntilNextMinute);
    }, []);

    useEffect(() => {
        setTimeout(() => {
            setDelay(true);
        }, 1000);
    }, []);

    return (
        <footer className={styles.main}>
            <div className={styles.footer}>
                <div className={styles.time}>
                    <p>
                        Verze<br />
                        <span>2024 © Edice</span>
                    </p>
                    <p>
                        Místní čas<br />
                        { delay &&<span>{timeString}</span>}
                    </p>
                </div>
                <div className={styles.socials}>
                    <p>Socky</p>
                    <div className={styles.icons}>
                        {footerLinks.map(({ title, href }, i) => (
                            <div className={styles.links} key={i} onMouseEnter={() => setIsHovered(i)} onMouseLeave={() => setIsHovered(null)}>
                                <Link href={href}>{title}
                                    <motion.div className={styles.dot} variants={scale} initial='initial' animate={ isHovered === i ? "enter" : "exit"}></motion.div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    )
}