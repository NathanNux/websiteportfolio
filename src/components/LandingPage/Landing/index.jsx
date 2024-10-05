import Image from 'next/image'
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { motion } from 'framer-motion';
import { FirstSlideUp, slideUp } from '@/components/anim';
import { useLoad } from '@/context';
import { FirstSliderSlideUp, FirstTextSlideUp, SliderSlideUp, TextSlideUp } from './anim';
import useGetLocation from '@/utils/useGetLocation';

export default function Index({ src }) {
  const firstText = useRef(null);
  const secondText = useRef(null);
  const slider = useRef(null);
  let xPercent = 0;
  let direction = useRef(-1);

  useGetLocation();
  const { isHomeCountry } = useLoad();

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
    <motion.main layout variants={ delayAnim ? FirstSlideUp : slideUp } initial="initial" animate='enter' className="landingPage">
      <div className='backgroundDiv' data-scroll data-scroll-speed={-0.85}>
        <Image 
          src={src}
          fill={true}
          sizes='100vw'
          alt="background"
          priority={true}
          quality={80}
        />
      </div>

      <motion.div variants={ delayAnim ? FirstSliderSlideUp: SliderSlideUp } initial="initial" animate='enter' className="sliderContainer">
        <div ref={slider} className="slider">
          <p ref={firstText}>Freelancer - Web Designer - Fullstack Dev - Freelancer - Web Designer - Fullstack Dev - Freelancer -</p>
          <p ref={secondText}>Freelancer - Web Designer - Fullstack Dev - Freelancer - Web Designer -  Fullstack Dev - Freelancer -</p>
        </div>
      </motion.div>

      <motion.div variants={ delayAnim ? FirstTextSlideUp : TextSlideUp } initial="initial" animate='enter' data-scroll data-scroll-speed={-0.15} className="description">
          <p> {isHomeCountry ?  "Jmenuji se" : "Name's"} <br /> Matěj Forejt</p>
          <p>{ isHomeCountry ?  "Vítejte u mě v Centru" : "Welcome at my Center"}</p>
      </motion.div>
    </motion.main>
  )
}