import styles from './style.module.scss';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { opacity, slideUp } from './anim';
import Head from 'next/head';

const words = [ "Dobrý den","Hello", "Bonjour", "Ciao", "Olà", "やあ", "Hallå", "Guten tag", "Hallo"]

export default function Preloader() {
    const [index, setIndex] = useState(0);
    const [dimension, setDimension] = useState({width: 0, height:0});

    useEffect( () => {
        setDimension({width: window.innerWidth, height: window.innerHeight})
    }, [])

    useEffect( () => {
        if(index == words.length - 1) return;
        setTimeout( () => {
            setIndex(index + 1)
        }, index == 0 ? 1000 : 150)
    }, [index])

    const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width/2} ${dimension.height + 300} 0 ${dimension.height}  L0 0`
    const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width/2} ${dimension.height} 0 ${dimension.height}  L0 0`

    const videoPath = {
        initial: {
            // Approximating the initial curve with a polygon. This is a rough approximation.
            clipPath: `polygon(0% 0%, 100% 0%, 100% 100%, 50% 110%, 0% 100%)`, //  0 0 {top left corner}, 100% 0 {top right corner}, 100% 100% {bottom right corner}, 50% 110% {curve control point} (at half and it makes it 10% more height to do the curve), 0% 100% {bottom left corner}
            transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } // easing function [bezier curve]
        },
        exit: {
            // Direct translation of the target path to a polygon, as it aligns with the bottom edge.
            clipPath: `polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)`, // 0 0 {top left corner}, 100% 0 {top right corner}, 100% 100% {bottom right corner}, 0% 100% {bottom left corner}
            transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.3 }
        }
    };

    // I have used Copilot to translate the svg due to lack of my knowledge in polygons. the only thing is that the curve is not exact but still do the thing. 

    const curve = {
        initial: {
            d: initialPath,
            transition: {duration: 0.7, ease: [0.76, 0, 0.24, 1]}
        },
        exit: {
            d: targetPath,
            transition: {duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.3}
        }
    }

    return (
        <>
            <Head>
                <link rel="preload" href="/assets/preloader/0819.mp4" type="video/mp4" />
            </Head>
            <motion.div variants={slideUp} initial="initial" exit="exit" className={styles.introduction}>
                {dimension.width > 0 && 
                <>
                    <motion.div variants={videoPath} initial="initial" exit="exit" className={styles.videoContainer}>
                        <video src="/assets/preloader/0819.mp4" autoPlay muted loop className={styles.mainVideo} ></video>
                    </motion.div>
                    <motion.p variants={opacity} initial="initial" animate="enter"><span></span>{words[index]}</motion.p>
                    <svg>
                        <motion.path variants={curve} initial="initial" exit="exit"></motion.path>
                    </svg>
                </>
            }
        </motion.div>
        </>
    )
}