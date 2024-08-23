import { useEffect, useRef, useState } from "react"

import Image from "next/image"
import { useScroll, useTransform, motion } from "framer-motion"
import Lenis from "@studio-freight/lenis"

const videos = [
    {
        src: "/assets/a-footage/applesite.webm",
        alt: "website_1"
    },
    {
        src: "/assets/a-footage/3dpc.webm",
        alt: "website_2"
    },
    {
        src: "/assets/a-footage/3dtshirt.webm",
        alt: "website_3"
    },
    {
        src: "/assets/a-footage/bank.webm",
        alt: "website_4"
    },
    {
        src: "/assets/a-footage/beginner-components-1.webm",
        alt: "website_5"
    },
    {
        src: "/assets/a-footage/beginner-components-2.webm",
        alt: "website_6"
    },
    {
        src: "/assets/a-footage/brainwave-site.webm",
        alt: "website_7"
    },
    {
        src: "/assets/a-footage/denis-clone.webm",
        alt: "website_8"
    },
    {
        src: "/assets/a-footage/framerscroll.webm",
        alt: "website_9"
    },
    {
        src: "/assets/a-footage/gsap-all.webm",
        alt: "website_10"
    },
    {
        src: "/assets/a-footage/nft-site.webm",
        alt: "website_11"
    },
    {
        src: "/assets/a-footage/smooth-scroll.webm",
        alt: "website_12"
    },
    {
        src: "/assets/b-footage/bc1.webm",
        alt: "website_13"
    },
    {
        src: "/assets/a-footage/windmill.webm",
        alt: "website_14"
    },
    {
        src: "/assets/b-footage/bc7.webm",
        alt: "website_15"
    },
]

const images = [
    {
        src: "/assets/images/projects/3dtshirt.webp",
        alt: "website_1"
    },
    {
        src: "/assets/images/projects/3dpc.webp",
        alt: "website_2"
    },
    {
        src: "/assets/images/projects/apple-site.webp",
        alt: "website_3"
    },
    {
        src: "/assets/images/projects/bank.webp",
        alt: "website_4"
    },
    {
        src: "/assets/images/projects/components.webp",
        alt: "website_5"
    },
    {
        src: "/assets/images/projects/agency.webp",
        alt: "website_6"
    },
    {
        src: "/assets/images/projects/brainwave.webp",
        alt: "website_7"
    },
    {
        src: "/assets/images/projects/denisclone.webp",
        alt: "website_8"
    },
    {
        src: "/assets/images/projects/framer.webp",
        alt: "website_9"
    },
    {
        src: "/assets/images/projects/components.webp",
        alt: "website_10"
    },
    {
        src: "/assets/images/projects/nft.webp",
        alt: "website_11"
    },
    {
        src: "/assets/images/projects/smoothscroll.webp",
        alt: "website_12"
    },
    {
        src: "/assets/images/projects/sushi.webp",
        alt: "website_13"
    },
    {
        src: "/assets/images/projects/3dwindmill.webp",
        alt: "website_14"
    },
    {
        src: "/assets/images/projects/apple-site.webp",
        alt: "website_15"
    }
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
                <Column videos={videos.slice(0,5)} images={images.slice(0,5)} y={y1}/>
                <Column videos={videos.slice(6,10)} images={images.slice(6, 10)} y={y2}/>
                <Column videos={videos.slice(11,15)} images={images.slice(11,15)} y={y3}/>
                <Column videos={videos.slice(0,5)} images={images.slice(0,5)} y={y4}/>
                <Column videos={videos.slice(6,10)} images={images.slice(6,10)} y={y5}/>
            </div>
            </div>

            
        </section>
    )
}

const Column = ({videos, images, y }) => {
    const [ isLoaded, setIsLoaded ] = useState(videos.map(() => false))
    const [ isVisible, setIsVisible ] = useState(false)
    const columnRef = useRef(null)

    // this is created to minimise the video load time consuption
    // observer function is ther to check every video if its in the viewport, if not, it will not load the video


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
            { threshold: 0.1 }
        )

        if (currentColumn) {
            observer.observe(currentColumn); // Observe the column
        }
        return () => {
            if (currentColumn) {
                observer.unobserve(currentColumn);
            }
        };
    }, [videos])

    return (
        <motion.section ref={columnRef} className="column" style={{y}}>
            { !isLoaded && images.map((image, index) => {
                const { src, alt } = image
                return (
                    <div key={index} className="imageContainer">
                        <Image 
                            src={src}
                            alt={alt}
                            fill
                            sizes="true"
                            loading="lazy"
                        />
                    </div>
                )
            })}
            
            {videos.map((video, index) => {
                const { src } = video
                return (
                    <div key={index} className="imageContainer">
                        {isVisible && (
                            <video 
                                autoPlay 
                                loop 
                                muted
                                preload="metadata"
                                style={{ display: isLoaded ? "block" : "none"}}
                                onLoadedData={ () => {
                                    const newIsLoaded = [...isLoaded]
                                    newIsLoaded[index] = true
                                    setIsLoaded(newIsLoaded)
                                }}
                            >
                                <source src={src} type="video/webm"/>
                            </video>
                        )}
                    </div>
                )
            })}
        </motion.section>
    )
}