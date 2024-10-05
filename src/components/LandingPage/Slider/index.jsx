import { useEffect, useRef, useState } from "react"

import Image from "next/image"
import { useScroll, useTransform, motion } from "framer-motion"
import Lenis from "@studio-freight/lenis"

const assets = [
    {  
        src: "/assets/images/projects/components.webp",
        path: "/assets/b-footage/bc1.webm",
        alt: "website_1"
    },
    {
        src: "/assets/images/projects/3dpc.webp",
        path: "/assets/a-footage/3dpc.webm",
        alt: "website_2"
    },
    {
        src: "/assets/images/projects/3dtshirt.webp",
        path: "/assets/a-footage/3dtshirt.webm",
        alt: "website_3"
    },
    {
        src: "/assets/images/projects/bank.webp",
        path: "/assets/a-footage/bank.webm",
        alt: "website_4"
    },
    {
        src: "/assets/images/projects/components.webp",
        path: "/assets/a-footage/beginner-components-1.webm",
        alt: "website_5"
    },
    {
        src: "/assets/images/projects/components.webp",
        path: "/assets/a-footage/beginner-components-2.webm",
        alt: "website_6"
    },
    {
        src: "/assets/images/projects/denisclone.webp",
        path:  "/assets/a-footage/denis-clone.webm",
        alt: "website_7"
    },
    {
        src: "/assets/images/projects/apple-site.webp",
        path: "/assets/a-footage/applesite.webm",
        alt: "website_8"
    },
    {
        src: "/assets/images/projects/framer.webp",
        path: "/assets/a-footage/framerscroll.webm",
        alt: "website_9"
    },
    {
        src: "/assets/images/projects/components.webp",
        path: "/assets/a-footage/gsap-all.webm",
        alt: "website_10"
    },
    {
        src: "/assets/images/projects/nft.webp",
        path: "/assets/a-footage/nft-site.webm",
        alt: "website_11"
    },
    {
        src: "/assets/images/projects/smoothscroll.webp",
        path: "/assets/a-footage/smooth-scroll.webm",
        alt: "website_12"
    },
    {
        src: "/assets/images/projects/brainwave.webp",
        path: "/assets/a-footage/brainwave-site.webm",
        alt: "website_13"
    },
    {
        src: "/assets/images/projects/3dwindmill.webp",
        path: "/assets/a-footage/windmill.webm",
        alt: "website_14"
    },
    {
        src: "/assets/images/projects/components.webp",
        path: "/assets/b-footage/bc7.webm",
        alt: "website_15"
    },
]


export default function Index (){
    const [dimension, setDimension] = useState({width:0, height:0});
    const { height } = dimension
    const slider = useRef(null)

    const { scrollYProgress } = useScroll({
        targer: slider,
        offset: ['start end', 'end start' ] // when the anim will play (start on the container and end of the window (top, bottom) and then when i want to stop (bottom of the container, start of the window))
    })

    const y1 = useTransform(scrollYProgress, [ 0, 1], [ 0, height * 1.5])
    const y2 = useTransform(scrollYProgress, [ 0, 1], [ 0, height * 5.5])
    const y3 = useTransform(scrollYProgress, [ 0, 1], [ 0, height * 10])
    const y4 = useTransform(scrollYProgress, [ 0, 1], [ 0, height * 7])
    const y5 = useTransform(scrollYProgress, [ 0, 1], [ 0, height * 20])

    useEffect( () => {
        const lenis = new Lenis()
    
        const raf = (time) => {
          lenis.raf(time)
          requestAnimationFrame(raf)
        }
    
        const resize = () => {
          setDimension({width: window.innerWidth, height: window.innerHeight})
        }
    
        window.addEventListener("resize", resize)
        requestAnimationFrame(raf);
        resize();
    
        return () => {
          window.removeEventListener("resize", resize);
        }
    }, [])


    return ( 
        <section className="mainSlider">
            <div className="body">
                <div ref={slider} className="slider">
                    <Column assets={assets.slice(0,5)} y={y1} />
                    <Column assets={assets.slice(5,10)} y={y2} />
                    <Column assets={assets.slice(10,15)} y={y3} />
                    <Column assets={assets.slice(0,5)} y={y4} />
                    <Column assets={assets.slice(5,10)} y={y5} />
                </div>
            </div>
        </section>
    )
}

const Column = ({ assets, y }) => {
    const [isLoaded, setIsLoaded] = useState(assets.map(() => false));
    const containerRefs = useRef([]);

    // I have cut all of the observer function and the useEffect function, because it was too complicated
    // this version now just waits to the videos to load with a 2 second delay and then displays them
    // this will load each object video and image separetly, so the page will look better and smoother

    // it lags the main loading phase, need an observer useEffect
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const index  = containerRefs.current.indexOf(entry.target);
                        if (index !== -1) {
                            setTimeout(() => {
                                setIsLoaded(currentLoaded => {
                                    const newIsLoaded = [...currentLoaded];
                                    newIsLoaded[index] = true;
                                    return newIsLoaded;
                                });
                            }, 2000);
                        }
                    }
                })
            },
            {
                rootMargin: "0px",
                threshold: 0.05
            }
        );

        containerRefs.current.forEach((ref) => {
            if(ref) observer.observe(ref);
        });
        return () => {
            containerRefs.current.forEach((ref) => {
                if(ref) observer.unobserve(ref);
            });
        }
    },[assets])

    return (
        <motion.section className="column" style={{ y }}>
            {assets.map((asset, index) => {
                const { src, alt, path } = asset;
                return (
                    <div ref={el => containerRefs.current[index] = el} key={index} className="imageContainer">
                        {isLoaded[index] && (
                            <video autoPlay={true} playsInline={true} loop={true} muted={true} preload="metadata" style={{ display: "block" }}>
                                <source src={path} type="video/webm" />
                            </video>
                        )}
                        {!isLoaded[index] && (
                            <Image src={src} alt={alt} fill={true} sizes="(min-width: 500px) 35vw, 40vh" quality={60} loading="lazy" />
                        )}
                    </div>
                );
            })}
        </motion.section>
    );
};