import { useEffect, useRef, useState } from "react"

import styles from "./style.module.scss"
import Link from "next/link";
import Image from "next/image";
import { useScroll } from "framer-motion";
import { motion, useTransform } from "framer-motion";
import ButtonLink from "../../ui/linkButton";
import { Toaster } from "../../ui/toaster";
import PhoneButton from "../../ui/phoneButton";
import { scale } from "../../anim";
import { footerLinks } from "@/constants";

export default function Footer () {

    const [ timeString, setTimeString ] = useState(getTimeString());
    const [ isHovered, setIsHovered ] = useState(null);
    const [ delay, setDelay ] = useState(false);

    // Reference to the SVG path that will be animated
    const path = useRef(null);

    // Current progress of the animation, starts at 0
    let progress = 0;

    // Current x-coordinate of the mouse, starts at the middle of the screen
    let x = 0.5;

    // Current time in the animation, used to create a sine wave effect
    let time = Math.PI / 2;

    // ID of the current animation frame, used to cancel the animation
    let reqId = null;

    const section = useRef(null)

    // On component mount, set the initial path
    useEffect(() => {
        setPath(progress);

        setTimeout(() => {
          setDelay(true);
        }, 1000);
    }, []);

    function getTimeString() {
        const date = new Date();
        const options = { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Europe/Prague', timeZoneName: 'short' };
        let time = date.toLocaleTimeString('en-US', options);
        return time.replace('GMT+1', 'CET').replace('GMT+2', 'CEST');
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeString(getTimeString());
        }, 60000); // Updates every minute

        // Cleanup function to clear the timer when the component unmounts
        return () => clearInterval(timer);
    }, []);

    const { scrollYProgress } = useScroll({
        target: section,
        offset: ['start end', 'end end']
    })

    const y = useTransform(scrollYProgress, [0, 1], [-500, 0])

    // Function to update the SVG path
    const setPath = (progress) => {
        // Calculate the width of the path based on the window width
        const width = window.innerWidth * 0.7;

        // Set the 'd' attribute of the path to create a quadratic Bézier curve
        // The curve starts at (0, 250), has a control point at (width * x, 250 * progress), and ends at (width, 250)
        path.current.setAttributeNS(null, "d", `M0 250 Q${width * x} ${250 + progress}, ${width} 250`)    
    }

    // Linear interpolation function, used to smoothly transition values
    const lerp = (x, y, z) => x * (1 - z) + y * z;

    // Function to handle the mouse enter event
    const handleMouseEnter = () => {
        // If an animation is currently running, cancel it
        if (reqId) {
            cancelAnimationFrame(reqId);
            // Reset the animation variables
            resetAnimation()   
        }
    }

    // Function to handle the mouse move event
    const handleMouseMove = (e) => {
        const { movementY, clientX } = e;
        // Get the bounding box of the path
        const pathBound = path.current.getBoundingClientRect();

        // Calculate the x-coordinate of the mouse relative to the path
        x = (clientX - pathBound.left) / pathBound.width;

        // Increment the progress based on the vertical mouse movement
        progress += movementY

        // Update the path
        setPath(progress);
    }

    // Function to handle the mouse leave event
    const handleMouseLeave = () => {
        // Start the animate out animation
        animateOut();
    }

    // Function to animate the path back to its original shape
    const animateOut = () => {
        // Calculate the new progress based on a sine wave
        const newProgress = progress * Math.sin(time);

        // Smoothly transition the progress back to 0
        progress = lerp(progress, 0, 0.025);

        // Increment the time
        time += 0.2;

        // Update the path
        setPath(newProgress);

        // If the progress is not close to 0, request another animation frame
        if(Math.abs(progress) > 0.75){
            reqId = requestAnimationFrame(animateOut);
        }
        // If the progress is close to 0, reset the animation variables
        else {
            resetAnimation();
        }
    }

    // Function to reset the animation variables
    const resetAnimation = () => {
        time = Math.PI / 2;
        progress = 0;
    }

    useEffect(() => {
        // Function to update time immediately
        const updateTime = () => {
            setTimeString(getTimeString());
        };

        // Calculate the remaining time until the next minute
        const now = new Date();
        const msUntilNextMinute = 60000 - (now.getSeconds() * 1000 + now.getMilliseconds());

        // Update time immediately for the first time
        updateTime();

        // Set a timeout to update the time at the start of the next minute
        const timeoutId = setTimeout(() => {
            updateTime();
            // After the first update, continue updating every minute
            const intervalId = setInterval(updateTime, 60000);

            // Cleanup function to clear the interval and timeout when the component unmounts
            return () => {
                clearInterval(intervalId);
                clearTimeout(timeoutId);
            };
        }, msUntilNextMinute);
    }, []);

    // this anim works like this, we have svg path. we set it so it has quadratic bezier curve, that is controlled by the y position of the mouse
    // when the mouse enters the path, it stops the animation and when it leaves it starts the animation out => the path goes back to its original shape
    // the animation out is controlled by the sine wave, so it creates a smooth transition back to the original shape
    // so esencially we are trackign 4 things, the path, the mouse position, the progress of the animation and the time to create a slingshot effect
    return (
        <motion.footer style={{ y }} className={styles.main} ref={section}>
            <div className={styles.toast}>
                <Toaster />
            </div>
            <div className={styles.animContainer}>
                <div className={styles.head}>
                    <div className={styles.imgContainer} data-scroll data-scroll-speed={0.002}>
                        <Image src="/images/landing/background.png" alt="photo" fill  sizes="true" priority //don't use loading="lazy" if priority is true
                        />
                    </div>
                    <h1 data-scroll data-scroll-speed={0.001}>Pojďme se <br /> spojit</h1>
                </div>

                <div className={styles.line}>
                    <div className={styles.box}
                        onMouseEnter={() => {handleMouseEnter()}}
                        onMouseMove={(e) => {handleMouseMove(e)}}
                        onMouseLeave={() => {handleMouseLeave()}}
                    ></div> 
                    <svg>
                        <path ref={path} />
                    </svg>
                    <div data-scroll data-scroll-speed={0.1} className={styles.button}>
                        <ButtonLink title='Kontaktujte mne' href='/contact' className={styles.buttonLink}/>
                    </div>
                </div>

                <div className={styles.bottonContainer}> 
                    <div className={styles.phone} data-scroll data-scroll-speed={0.05}>
                        {/* This is now a button that either opens the calling app on mobile or lets them copy the phone number on a click */}
                        <PhoneButton />
                    </div>
                </div>
            </div>

            <div className={styles.footer}>
                <div className={styles.time}>
                    <p>
                        Verze<br />
                        <span>2024 © Edice</span>
                    </p>
                    <p>
                        Místní čas<br />
                        { delay &&<span>{timeString}</span>}
                    </p>
                </div>
                <div className={styles.socials}>
                    <p>Socky</p>
                    <div className={styles.icons}>
                        {footerLinks.map(({ title, href }, i) => (
                            <div className={styles.links} key={i} onMouseEnter={() => setIsHovered(i)} onMouseLeave={() => setIsHovered(null)}>
                                <Link href={href}>{title}
                                    <motion.div className={styles.dot} variants={scale} initial='initial' animate={ isHovered === i ? "enter" : "exit"}></motion.div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.footer>
    )
}