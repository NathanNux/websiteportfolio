import Link from "next/link";
import styles from './style.module.scss'
import { useEffect, useRef } from "react";
import gsap from "gsap";


export default function Index () {
    const container = useRef(null)

    useEffect(() => {
      gsap.fromTo(container.current, {y: 30, opacity: 0}, {y: 0, opacity: 1, delay: 0.8,})
        window.scrollTo(0, 0)
    }, [])

  return (
    <nav ref={container} className={styles.navbar}>
        <Link href='/' className={styles.logo}>
                <p className={styles.copyright}>©</p>
                <div className={styles.name}>
                    <p className={styles.codeBy}>Kód od</p>
                    <p className={styles.dennis}>Matěje</p>
                    <p className={styles.snellenberg}>Forejta</p>
                </div>
            </Link>
            <div className={styles.nav}>
                <div className={styles.el}>
                    <Link href='/projects' className={styles.Link}>Projekty</Link>
                    <div className={styles.indicator}></div>
                </div>
            
                <div className={styles.el}>
                    <Link href='/about' className={styles.Link}>O mně</Link>
                    <div className={styles.indicator}></div>
                </div>
            
                <div className={styles.el}>
                    <Link href='/contact' className={styles.Link}>Kontakt</Link>
                    <div className={styles.indicator}></div>
                </div>

                <div className={styles.el}>
                    <Link href='/materials' className={styles.Link}>Materiály</Link>
                    <div className={styles.indicator}></div>
                </div>
            </div>
    </nav>
  )
}