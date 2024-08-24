import Image from 'next/image'
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { motion } from 'framer-motion';
import { slideUp } from '@/components/anim';
import { scale } from './anim';

export default function Index() {
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
      xPercent += 0.01 * direction.current;
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
    <motion.main variants={slideUp} initial="initial" animate='enter' className="landingMaterialsPage">
      <Image 
        src='/images/materials/background.webp'
        fill
        sizes="true"
        alt="background"
        priority
      />
      <motion.main variants={scale} initial="initial" animate='enter' className="imageContainer" data-scroll data-scroll-speed={0.1}>
        <Image 
            src='/images/landing/7.webp'
            alt='materials'
            fill
            sizes="true"
            priority
            //WIP: add here Images for Material Page
        />
      </motion.main>
      <div className="sliderContainer">
        <div ref={slider} className="slider">
          <p ref={firstText}>Freelance Web Designer - Freelance Fullstack Dev - Freelance Web Designer - Freelance Fullstack Dev -</p>
          <p ref={secondText}>Freelance Web Designer - Freelance Fullstack Dev - Freelance Web Designer - Freelance Fullstack Dev -</p>
        </div>
      </div>
    </motion.main>
  )
}