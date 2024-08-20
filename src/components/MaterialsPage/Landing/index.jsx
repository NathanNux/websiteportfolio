import { motion } from 'framer-motion';

import styles from './style.module.scss';
import Image from 'next/image';
import { scale, slideUp } from './anim';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';



export default function Landing() {

  const firstText = useRef(null);
  const secondText = useRef(null);
  const slider = useRef(null);
  let xPercent = 0;
  let direction = useRef(-1);

  useEffect( () => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(slider.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        scrub: 0.25,
        start: 0,
        end: window.innerHeight,
        onUpdate: e => direction.current = e.direction * -1
      },
      x: "-500px",
      repeat: -1,
      yoyo: true
    })
    requestAnimationFrame(animate);
  }, [animate])

  const animate = () => {
    if(firstText.current && secondText.current) {
      if(xPercent < -100){
        xPercent = 0;
      }
      else if(xPercent > 0){
        xPercent = -100;
      }
      gsap.set(firstText.current, {xPercent: xPercent})
      gsap.set(secondText.current, {xPercent: xPercent})
      requestAnimationFrame(animate);
      xPercent += 0.01 * direction.current;
    }
  }

  // this useEffect will run only once, when the component is mounted, and it ensures there is no spamming warnings about the refs of texts being null, because the animate function is called only when the refs are not null
  // just helps with warnings in console and performance a bit, that's all
  useEffect(() => {
    if (firstText.current && secondText.current) {
        requestAnimationFrame(animate);
    }
  }, [firstText, secondText, animate]);



  return (
    <section className={styles.main}>
        <motion.div className={styles.sliderContainer} variants={slideUp} initial="initial" animate="enter">
            <motion.div ref={slider} className={styles.slider}>
                <p ref={firstText}>Materiály - Pro Vás - Materiály - Pro Vás -</p>
                <p ref={secondText}>Materiály - Pro Vás - Materiály - Pro Vás -</p>
            </motion.div>
        </motion.div>
        
        <motion.div className={styles.background} variants={scale} initial="initial" animate="enter">
            <Image 
                src='/images/materials/background.png'
                alt='background'
                fill
                sizes="true"
                priority
            />
        </motion.div>
        <div className={styles.imageContainer} data-scroll data-scroll-speed={0.1}>
            <Image 
                src='/images/landing/7.jpg'
                alt='materials'
                fill
                sizes="true"
                priority
                //WIP: add here Images for Material Page
            />
        </div>
    </section>
  )
};