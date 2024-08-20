import Link from "next/link";
import styles from './style.module.scss'
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { scale } from "../../anim";
import { navbarLinks } from "@/constants";


export default function Index () {
  const container = useRef(null)
  const pathname = usePathname();
  const [delayedPathname, setDelayedPathname] = useState(pathname);
  const isContactPage = delayedPathname === '/contact' || delayedPathname.startsWith('/projects');
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [ active, setActive ] = useState(null);

  useEffect(() => {
    const activeIndex = navbarLinks.findIndex(({ href }) => href === delayedPathname);
    setActive(activeIndex);
  }, [pathname]);

  // I needed to set a delay to the classes to make it seemless and better in terms of UX
  //this does it nicelly
  useEffect(() => {
    const timer = setTimeout(() => {
      setDelayedPathname(pathname);
    }, 500);

    // Clear the timeout when the component unmounts
    return () => clearTimeout(timer);
  }, [pathname, delayedPathname]);

  return (
    <nav ref={container} className={`${isContactPage ? styles.navbarBlack : styles.navbarWhite }`}>
        <Link href='/' className={styles.logo}>
            <p className={styles.copyright}>©</p>
            <div className={styles.name}>
                <p className={styles.codeBy}>Kód od</p>
                <p className={styles.dennis}>Matěje</p>
                <p className={styles.snellenberg}>Forejta</p>
            </div>
        </Link>
        <div className={styles.nav}>
            {navbarLinks.map(({ href, title }, i) => (
              <div className={styles.el} key={i} onMouseEnter={() => setHoveredIndex(i)} onMouseLeave={() => setHoveredIndex(null)}>
                <Link href={href} className={styles.Link}>{title}</Link>
                <motion.div variants={scale} initial='initial' animate={active === i ? (hoveredIndex !== null && hoveredIndex !== i ? 'exit' : 'enter') : (hoveredIndex === i ? 'enter' : 'exit')} className={styles.indicator}></motion.div>
              </div>
            ))}
        </div>
    </nav>
  )
}