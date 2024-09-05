import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { opacity, slideUp } from './anim';
import Head from 'next/head';

const words = ["Dobrý den", "Hello", "Bonjour", "Ciao", "Olà", "やあ", "Vítejte", "V Centru"];

export default function Preloader() {
    const [index, setIndex] = useState(0);
    const [dimension, setDimension] = useState({ width: 0, height: 0 });

    // Resize function to track screen dimensions
    useEffect(() => {
        function resize() {
            setDimension({
                width: window.innerWidth,
                height: window.innerHeight
            });
        }
        resize();
        window.addEventListener('resize', resize);
        return () => {
            window.removeEventListener('resize', resize);
        };
    }, []);

    // Automatic word transition every 150ms, longer delay for the first word (1000ms)
    useEffect(() => {
        if (index === words.length - 1) return;
        const timeout = setTimeout(() => {
            setIndex(index + 1);
        }, index === 0 ? 1000 : 150);

        return () => clearTimeout(timeout);
    }, [index]);

    // Paths for the curve SVG animations
    const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height + 300} 0 ${dimension.height} L0 0`;
    const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height} L0 0`;

    // Motion variants for the video container's clip path
    const videoPath = {
        initial: {
            clipPath: `polygon(0% 0%, 100% 0%, 100% 100%, 50% 110%, 0% 100%)`,
            transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] }
        },
        exit: {
            clipPath: `polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)`,
            transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.3 }
        }
    };

    // Curve animations
    const curve = {
        initial: {
            d: initialPath,
            transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] }
        },
        exit: {
            d: targetPath,
            transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.3 }
        }
    };

    return (
        <>
            {/* Main preloader wrapper with fixed dimensions to avoid layout shifts */}
            <motion.div
                variants={slideUp}
                initial="initial"
                exit="exit"
                className="introductionPreloader"
                style={{ position: 'fixed', width: dimension.width, height: dimension.height }}
            >
                {dimension.width > 0 && (
                    <>
                        {/* Ensuring the video container has a fixed size to prevent shifts */}
                        <motion.div variants={videoPath} initial="initial" exit="exit" className="videoContainer" style={{ width: '100%', height: '100%' }}>
                            <video
                                src="/assets/preloader/0819.webm"
                                autoPlay={true}
                                playsInline={true}
                                muted={true}
                                loop={true}
                                className="mainVideo"
                                style={{ width: '120%', height: '120%', objectFit: 'cover' }} // Setting object-fit to avoid layout shifts
                            ></video>
                        </motion.div>

                        {/* Text animation */}
                        <motion.p variants={opacity} initial="initial" animate="enter">
                            <span></span>
                            {words[index]}
                        </motion.p>

                        {/* SVG animation with pre-defined paths to prevent shifts */}
                        <svg>
                            <motion.path variants={curve} initial="initial" exit="exit"></motion.path>
                        </svg>
                    </>
                )}
            </motion.div>
        </>
    );
}
