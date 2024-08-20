import { motion, useTransform, useScroll  } from "framer-motion";
import Image from "next/image";
import { useRef, useEffect, useState, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { slideUp } from "@/components/anim";

import styles from './style.module.scss';

export default function ZoomParallax({src1, src2, src3, src4, src5, src6, src7, path, text}) {

    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start start', 'end end']
    })

    const scale1 = useTransform(scrollYProgress, [0, 1], [1, 4]);
    const scale2 = useTransform(scrollYProgress, [0, 1], [1, 5]);
    const scale3 = useTransform(scrollYProgress, [0, 1], [1, 6]);
    const scale4 = useTransform(scrollYProgress, [0, 1], [1, 8]);
    const scale5 = useTransform(scrollYProgress, [0, 1], [1, 9]);

    const firstText = useRef(null);
    const secondText = useRef(null);
    const slider = useRef(null);
    let xPercent = 0;
    let direction = useRef(-1);
    const [ isLoaded, setIsLoaded ] = useState(false)
    const [ isVisible, setIsVisible ] = useState(false)
    const columnRef = useRef(null)


    const pictures = useMemo(() => 
        [
            {
                src: src1,
                path: path,
                alt: 'A beautiful landscape',
                scale: scale1,
            },
            {
                src: src2,
                alt: 'A beautiful landscape',
                scale: scale2,
            },
            {
                src: src3,
                alt: 'A beautiful landscape',
                scale: scale3,
            },
            {
                src: src4,
                alt: 'A beautiful landscape',
                scale: scale2,
            },
            {
                src: src5,
                alt: 'A beautiful landscape',
                scale: scale3,
            },
            {
                src: src6,
                alt: 'A beautiful landscape',
                scale: scale4,
            },
            {
                src: src7,
                alt: 'A beautiful landscape',
                scale: scale5,
            },
        ]
    )

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
          xPercent += 0.03 * direction.current;
        }
    }
  
    useEffect( () => {
      gsap.registerPlugin(ScrollTrigger);
      gsap.to(slider.current, {
        scrollTrigger: {
          trigger: ref.current,
          scrub: 0.25,
          start: 0,
          end: '300%',
          onUpdate: e => direction.current = e.direction * -1
        },
        x: "-500px",
        repeat: -1,
        yoyo: true
      })
      requestAnimationFrame(animate);
      
        // this useEffect will run only once, when the component is mounted, and it ensures there is no spamming warnings about the refs of texts being null, because the animate function is called only when the refs are not null
        // just helps with warnings in console and performance a bit, that's all

      if (firstText.current && secondText.current) {
            requestAnimationFrame(animate);
            }
    }, [firstText, secondText])

    // we are again looping through the videos and checking if they are in the viewport, if they are, we are setting the isLoaded to true


    useEffect( () => {
        const currentColumn = columnRef.current
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach( entry => {
                    if(entry.isIntersecting) {
                        setIsVisible(true)
                    }
                })
            },
            { threshold: 0.05 }
        )

        if (currentColumn) {
            observer.observe(currentColumn); // Observe the column
        }
        return () => {
            if (currentColumn) {
                observer.unobserve(currentColumn);
            }
        };
    }, [pictures])

    return(
        <motion.section ref={ref} className={styles.main} variants={slideUp} initial='initial' animate='enter'>
            <div className={styles.container} ref={columnRef}>
                {pictures.map((picture, i) => (
                    <motion.div
                        key={i}
                        className={styles.motionContainer}
                        style={{ scale: picture.scale }}
                    >
                        <div className={styles.imageContainer}>
                            {isLoaded && !picture.path &&
                                <Image 
                                    src={picture.src}
                                    alt={picture.alt}
                                    fill
                                    sizes="true"
                                    loading="lazy"
                                />
                            }
                            {isVisible && 
                                <video
                                    autoPlay
                                    loop
                                    muted
                                    onLoadedData={ () => setIsLoaded(true)}
                                    style={{ display: isLoaded ? "block" : "none"}}
                                >
                                    <source src={picture.path} type="video/mp4"/>
                                </video>
                            }   
                        </div>
                    </motion.div>
                ))}
            </div>
            <div className={styles.bodySlider}>
                <div className={styles.sliderContainer}>
                    <div ref={slider} className={styles.slider}>
                        <p ref={firstText}>{text}</p>
                        <p ref={secondText}>{text}</p>
                    </div>
                </div>
            </div>
            
        </motion.section>
    )
}