import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useScroll } from "framer-motion";
import { motion, useTransform } from "framer-motion";
import ButtonLink from "../LinkButton/linkButton";
import { Toaster } from "../../ui/toaster";
import PhoneButton from "../PhoneButton/phoneButton";
import { scale } from "../../anim";
import { footerLinks } from "@/constants";
import { useLoad } from "@/context";

import dynamic from 'next/dynamic';
const TimeComponent = dynamic(() => import('../TimeComponent'), { ssr: false });



export default function Footer() {
  const [isHovered, setIsHovered] = useState(null);
  const [delay, setDelay] = useState(false);
  const path = useRef(null);
  let progress = 0;
  let x = 0.5;
  let time = Math.PI / 2;
  let reqId = null;
  const section = useRef(null);

  const { isHomeCountry } = useLoad();

  const { scrollYProgress } = useScroll({
    target: section,
    offset: ['start end', 'end end'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-500, 0]);

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

    // Cleanup function
    return () => clearTimeout(delayTimeout);
  }, [progress, setPath]);

  return (
    <motion.footer layout style={{ y }} className="mainFooter" ref={section}>
      <div className="toast">
        <Toaster />
      </div>
      <div className="animContainer">
        <div className="head">
          <div className="imgContainer" data-scroll data-scroll-speed={0.002}>
            <Image
              src="/images/done/small.webp"
              alt="photo"
              fill={true}
              sizes="(max-width: 500px) 25vw, (max-width: 950px) 20vw, (max-width: 1350px) 15vw, 10vw"
              loading="lazy"
              quality={100}
            />
          </div>
          <h1 data-scroll data-scroll-speed={0.001}>{ isHomeCountry ? "Pojďme se ": "Let's Work"}<br /> { isHomeCountry ? "spojit": "Together"}</h1>
        </div>

        <div className="line">
          <div className="box"
               onMouseEnter={handleMouseEnter}
               onMouseMove={handleMouseMove}
               onMouseLeave={handleMouseLeave}
          ></div>
          <motion.svg layout>
            <motion.path ref={path} layout/>
          </motion.svg>
          <div data-scroll data-scroll-speed={0.1} className="button">
            <ButtonLink title={ isHomeCountry ? 'Kontaktujte mne' : "Get in Touch"} href='/contact' className="buttonLink" />
          </div>
        </div>

        <div className="bottonContainer">
          <div className="phone" data-scroll data-scroll-speed={0.05}>
            <PhoneButton />
          </div>
        </div>
      </div>

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
           { isHomeCountry ? "Místní čas" : "Current Time"}<br />
            {delay && <TimeComponent isHomeCountry={isHomeCountry} />}
          </p>
        </div>
        <div className="socials">
          <p>{ isHomeCountry ? "Socky" : "Socials"}</p>
          <div className="icons">
            {footerLinks.map(({ title, href }, i) => (
              <div className="links" key={i} onMouseEnter={() => setIsHovered(i)} onMouseLeave={() => setIsHovered(null)}>
                <Link href={href}>{title}
                  <motion.div layout className="dot" variants={scale} initial='initial' animate={isHovered === i ? "enter" : "exit"}></motion.div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.footer>
  );
}