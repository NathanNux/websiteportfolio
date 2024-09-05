import { motion, useTransform, useScroll  } from "framer-motion";
import Image from "next/image";
import { useRef, useLayoutEffect, useEffect, useState, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { slideUp } from "@/components/anim";
import { usePathname } from "next/navigation";

export default function ZoomParallax({src2, src3, src4, src5, src6, src7, path, text}) {

    const ref = useRef(null);
    const videoRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start start', 'end end']
    })
    
    const pathname = usePathname()

    const scale1 = useTransform(scrollYProgress, [0, 1], [1, 4]);
    const scale2 = useTransform(scrollYProgress, [0, 1], [1, 5]);
    const scale3 = useTransform(scrollYProgress, [0, 1], [1, 6]);
    const scale4 = useTransform(scrollYProgress, [0, 1], [1, 8]);
    const scale5 = useTransform(scrollYProgress, [0, 1], [1, 9]);

    const firstText = useRef(null);
    const secondText = useRef(null);
    const slider = useRef(null);
    let xPercent = 0;
    let direction = -1;
    const [ isLoaded, setIsLoaded ] = useState(false)

    const videos = useMemo(() => 
        [
            {
                path: path,
                alt: 'A beautiful landscape',
                scale: scale1,
            },
        ]
    )

    const pictures = useMemo(() => 
        [
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
          xPercent += 0.03 * direction;
        }
    }
  
    useLayoutEffect( () => {
      gsap.registerPlugin(ScrollTrigger);
      gsap.to(slider.current, {
        scrollTrigger: {
          trigger: ref.current,
          scrub: 0.25,
          start: 0,
          end: '300%',
          onUpdate: e => direction = e.direction * -1
        },
        x: "-500px",
        repeat: -1,
        yoyo: true
      })
      requestAnimationFrame(animate);
    }, [])
  
    // this useEffect will run only once, when the component is mounted, and it ensures there is no spamming warnings about the refs of texts being null, because the animate function is called only when the refs are not null
    // just helps with warnings in console and performance a bit, that's all
    useEffect(() => {
      if (firstText.current && secondText.current) {
          requestAnimationFrame(animate);
      }
    }, [firstText, secondText]);

    useEffect(() => {
        if(pathname === "/") {
            const timer = setTimeout(() => {
                setIsLoaded(true)
            },5000)

            return () => clearTimeout(timer)
        } else {
            const timer = setTimeout(() => {
                setIsLoaded(true)
            },500)

            return () => clearTimeout(timer)
        }
    }, [])

    useEffect(() => {
        const video = videoRef.current;
        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                if(entry.isIntersecting) {
                    video.play();
                } else {
                    video.pause();
                }
            }, 
            {
                threshold: 0.25
            }
        );

        if(video) {
            observer.observe(video);
        }

        return () => {
            if(video){
                video.pause();
                observer.unobserve(video)
            }
        }
    }, [videoRef])

    // we are again looping through the videos and checking if they are in the viewport, if they are, we are setting the isLoaded to true

    return(
        <motion.section ref={ref} className="mainParallaxZoom" variants={slideUp} initial='initial' animate='enter'>
            <div className="container">
                {videos.map((video, i) => (
                    <motion.div
                        key={i}
                        className="motionContainer"
                        style={{ scale: video.scale }}
                    >
                        <div className="imageContainer">
                            {isLoaded && 
                                <video
                                    ref={videoRef}
                                    autoPlay={true}
                                    playsInline={true}
                                    loop={true}
                                    muted={true}
                                    style={{ display: "block"}}
                                >
                                    <source src={video.path} type="video/webm"/>
                                </video>
                            }   
                        </div>
                    </motion.div>
                ))}
                {pictures.map((picture, i) => (
                    <motion.div
                        key={i}
                        className="motionContainer"
                        style={{ scale: picture.scale }}
                    >
                        <div className="imageContainer">
                            <Image 
                                src={picture.src}
                                alt={picture.alt}
                                fill={true}
                                sizes="(min-width: 500px) 30vw, 40vh"
                                priority={true}
                                quality={80}
                            />   
                        </div>
                    </motion.div>
                ))}
            </div>
            <div className="bodySlider">
                <div className="sliderContainer">
                    <div ref={slider} className="slider">
                        <p ref={firstText}>{text}</p>
                        <p ref={secondText}>{text}</p>
                    </div>
                </div>
            </div>
            
        </motion.section>
    )
}