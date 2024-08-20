import Image from 'next/image'
import styles from './style.module.scss'
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { motion } from 'framer-motion';
import { FirstSlideUp, slideUp } from '@/components/anim';
import { useLoad } from '@/context';

export default function Index() {
  const firstText = useRef(null);
  const secondText = useRef(null);
  const slider = useRef(null);
  let xPercent = 0;
  let direction = useRef(-1);

  const { delayAnim, setDelayAnim } = useLoad();

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
      <motion.main variants={ delayAnim ? FirstSlideUp : slideUp } initial="initial" animate='enter' className={styles.landing}>
        <Image 
          src="/images/landing/background.png"
          fill
          sizes="true"
          alt="background"
          priority
        />
        <div className={styles.sliderContainer}>
          <div ref={slider} className={styles.slider}>
            <p ref={firstText}>Freelance Web Designer - Freelance Fullstack Dev - Freelance Web Designer - Freelance Fullstack Dev -</p>
            <p ref={secondText}>Freelance Web Designer - Freelance Fullstack Dev - Freelance Web Designer - Freelance Fullstack Dev -</p>
          </div>
        </div>

        <div data-scroll data-scroll-speed={0.08} className={styles.description}>
              <p>Jmenuji se <br /> Matěj Forejt</p>
              <p>Vítejte u mě v Centru</p>
          </div>
      </motion.main>
  )
}