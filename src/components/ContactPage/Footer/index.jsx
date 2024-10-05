import { useEffect, useState } from "react"

import Link from "next/link";
import { scale } from "@/components/anim";
import { motion } from "framer-motion";
import { footerLinks } from "@/constants";
import { useLoad } from "@/context";
import TimeComponent from "@/components/common/TimeComponent";

export default function Footer () {
    const [ isHovered, setIsHovered ] = useState(null)
    const [ delay, setDelay ] = useState(false);
    const { isHomeCountry } = useLoad();

    useEffect(() => {
        setTimeout(() => {
            setDelay(true);
        }, 1000);
    }, []);

    return (
        <footer className="mainFooterr">
            <div className="footer">
                <div className="time">
                    { isHomeCountry ? (
                        <p>
                            Verze:<br />
                            <span>2024 © Edice</span>
                        </p>
                    ) : (
                        <p>
                            Version:<br />
                            <span>2024 © Edition</span>
                        </p>
                    )}
                    <p>
                        { isHomeCountry ? "Místní čas" : "Current time"}<br />
                        {delay && <TimeComponent isHomeCountry={isHomeCountry} />}
                    </p>
                </div>
                <div className="socials">
                    <p>{ isHomeCountry ? "Socky" : "Socials"}</p>
                    <div className="icons">
                        {footerLinks.map(({ title, href }, i) => (
                            <div className="links" key={i} onMouseEnter={() => setIsHovered(i)} onMouseLeave={() => setIsHovered(null)}>
                                <Link href={href}>{title}
                                    <motion.div layout className="dot" variants={scale} initial='initial' animate={ isHovered === i ? "enter" : "exit"}></motion.div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    )
}