import Image from 'next/image'
import styles from './style.module.scss'
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useState } from 'react';
import { slideUp } from '@/components/anim';

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

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end start']
  })
  const y = useTransform(scrollYProgress, [0, 1], ['0vh', '100vh'])

  useEffect( () => {
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
      xPercent += 0.015 * direction;
    }
  }

  // this useEffect will run only once, when the component is mounted, and it ensures there is no spamming warnings about the refs of texts being null, because the animate function is called only when the refs are not null
  // just helps with warnings in console and performance a bit, that's all
  useEffect(() => {
    if (firstText.current && secondText.current) {
        requestAnimationFrame(animate);
    }
  }, [firstText, secondText]);


    return (
        <motion.main variants={slideUp} style={{y}}  initial="initial" animate='enter' className={styles.landing} ref={container}>
          <Image 
            src="/images/about/background.png"
            fill
            sizes="true"
            alt="background_aboutPage"
            priority
          />
          <div className={styles.sliderContainer}>
            <motion.div ref={slider} className={styles.slider}>
              <p ref={firstText}>AETHER - O MÉ DUŠI - CENTRUM - AETHER - O MÉ DUŠI - CENTRUM -</p>
              <p ref={secondText}>AETHER - O MÉ DUŠI - CENTRUM - AETHER - O MÉ DUŠI - CENTRUM -</p>
            </motion.div>
          </div>
        </motion.main>
    )
}