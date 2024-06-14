'use client'
import Image from 'next/image'
import styles from './style.module.scss'
import { useRef, useLayoutEffect, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { slideUp } from './animation';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Index() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect( () => {
        setIsLoading(false);
    }, [])

  const container = useRef(null)
  const firstText = useRef(null);
  const secondText = useRef(null);
  const slider = useRef(null);
  let xPercent = 0;
  let direction = -1;

  useLayoutEffect( () => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(slider.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        scrub: 0.25,
        start: 0,
        end: window.innerHeight,
        onUpdate: e => direction = e.direction * -1
      },
      x: "-500px",
      repeat: -1,
      yoyo: true
    })
    requestAnimationFrame(animate);
  }, [])

  const animate = () => {
    if(xPercent < -100){
      xPercent = 0;
    }
    else if(xPercent > 0){
      xPercent = -100;
    }
    gsap.set(firstText.current, {xPercent: xPercent})
    gsap.set(secondText.current, {xPercent: xPercent})
    requestAnimationFrame(animate);
    xPercent += 0.1 * direction;
  }

  useEffect(() => {
    const targers = container.current.querySelectorAll('h1, p')
    gsap.fromTo(targers, {y: 30, opacity: 0}, {y: 0, opacity: 1, delay: 0.65, stagger: 0.15})
    window.scrollTo(0, 0)
  }, [])


    return (
        <motion.main variants={slideUp} initial="initial" animate='enter' className={styles.landing}>
          <Image 
            src="/images/background.png"
            fill={true}
            alt="background"
          />
          <div className={styles.sliderContainer}>
            <div ref={slider} className={styles.slider}>
              <p ref={firstText}> Freelance Web Designer -</p>
              <p ref={secondText}>Freelance Fullstack Dev -</p>
            </div>
          </div>

          <div data-scroll data-scroll-speed={0.08} className={styles.description} ref={container}>
                <p>Jmenuji se <br /> Matěj Forejt</p>
                <p>Vítejte u mě v Centru</p>
            </div>
        </motion.main>
    )
}