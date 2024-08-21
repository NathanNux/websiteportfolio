import { useCallback, useEffect, useRef, useState } from "react"

import styles from "./style.module.scss"
import Link from "next/link";
import Image from "next/image";
import { useScroll } from "framer-motion";
import { motion, useTransform } from "framer-motion";
import ButtonLink from "../LinkButton/linkButton";
import { Toaster } from "../../ui/toaster";
import PhoneButton from "../PhoneButton/phoneButton";
import { scale } from "../../anim";
import { footerLinks } from "@/constants";

export default function Footer() {
  const [timeString, setTimeString] = useState(getTimeString());
  const [isHovered, setIsHovered] = useState(null);
  const [delay, setDelay] = useState(false);
  const path = useRef(null);
  let progress = 0;
  let x = 0.5;
  let time = Math.PI / 2;
  let reqId = null;
  const section = useRef(null);

  const { scrollYProgress } = useScroll({
    target: section,
    offset: ['start end', 'end end'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-500, 0]);

  function getTimeString() {
    const date = new Date();
    const options = { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Europe/Prague', timeZoneName: 'short' };
    return date.toLocaleTimeString('en-US', options).replace('GMT+1', 'CET').replace('GMT+2', 'CEST');
  }

    const setPath = useCallback((progress) => {
    const width = window.innerWidth * 0.7;
    path.current.setAttributeNS(null, "d", `M0 250 Q${width * x} ${250 + progress}, ${width} 250`);
    }, []);

  const lerp = (x, y, z) => x * (1 - z) + y * z;

  const handleMouseEnter = () => {
    if (reqId) {
      cancelAnimationFrame(reqId);
      resetAnimation();
    }
  };

  const handleMouseMove = (e) => {
    const { movementY, clientX } = e;
    const pathBound = path.current.getBoundingClientRect();
    x = (clientX - pathBound.left) / pathBound.width;
    progress += movementY;
    setPath(progress);
  };

  const handleMouseLeave = () => animateOut();

  const animateOut = () => {
    progress = lerp(progress, 0, 0.025);
    time += 0.2;
    const newProgress = progress * Math.sin(time);
    setPath(newProgress);
    if (Math.abs(progress) > 0.75) {
      reqId = requestAnimationFrame(animateOut);
    } else {
      resetAnimation();
    }
  };

  const resetAnimation = () => {
    time = Math.PI / 2;
    progress = 0;
  };

    useEffect(() => {
        // Set initial path and delay
        setPath(progress);
        const delayTimeout = setTimeout(() => setDelay(true), 1000);

        // Update time string every minute
        const updateTime = () => setTimeString(getTimeString());
        const now = new Date();
        const msUntilNextMinute = 60000 - (now.getSeconds() * 1000 + now.getMilliseconds());
        const timeoutId = setTimeout(() => {
        updateTime();
        const intervalId = setInterval(updateTime, 60000);
        return () => clearInterval(intervalId);
        }, msUntilNextMinute);

        // Cleanup function
        return () => {
        clearTimeout(delayTimeout);
        clearTimeout(timeoutId);
        };
    }, [progress, setPath, setTimeString]);

  return (
    <motion.footer style={{ y }} className={styles.main} ref={section}>
      <div className={styles.toast}>
        <Toaster />
      </div>
      <div className={styles.animContainer}>
        <div className={styles.head}>
          <div className={styles.imgContainer} data-scroll data-scroll-speed={0.002}>
            <Image src="/images/landing/background.png" alt="photo" fill sizes="true" priority />
          </div>
          <h1 data-scroll data-scroll-speed={0.001}>Pojďme se <br /> spojit</h1>
        </div>

        <div className={styles.line}>
          <div className={styles.box}
               onMouseEnter={handleMouseEnter}
               onMouseMove={handleMouseMove}
               onMouseLeave={handleMouseLeave}
          ></div>
          <svg>
            <path ref={path} />
          </svg>
          <div data-scroll data-scroll-speed={0.1} className={styles.button}>
            <ButtonLink title='Kontaktujte mne' href='/contact' className={styles.buttonLink} />
          </div>
        </div>

        <div className={styles.bottonContainer}>
          <div className={styles.phone} data-scroll data-scroll-speed={0.05}>
            <PhoneButton />
          </div>
        </div>
      </div>

      <div className={styles.footer}>
        <div className={styles.time}>
          <p>
            Verze<br />
            <span>2024 © Edice</span>
          </p>
          <p>
            Místní čas<br />
            {delay && <span>{timeString}</span>}
          </p>
        </div>
        <div className={styles.socials}>
          <p>Socky</p>
          <div className={styles.icons}>
            {footerLinks.map(({ title, href }, i) => (
              <div className={styles.links} key={i} onMouseEnter={() => setIsHovered(i)} onMouseLeave={() => setIsHovered(null)}>
                <Link href={href}>{title}
                  <motion.div className={styles.dot} variants={scale} initial='initial' animate={isHovered === i ? "enter" : "exit"}></motion.div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
