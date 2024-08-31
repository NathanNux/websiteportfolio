import Link from 'next/link';
import { motion } from 'framer-motion';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { shade, textTranslate } from '@/components/anim';
import { freeProjects } from '@/constants';
import { useMediaQuery } from 'react-responsive';

export default function Projects () {

    const [selectedProject, setSelectedProject] = useState({isActive: false, index: 0});
    const videoRefs = useRef([]);
    const [disableAnimation, setDisableAnimation] = useState(false);
    const isTouchDevice = useMediaQuery({ query: '(hover: none) and (pointer: coarse)' });

    const handleProjectInteraction = (index) => {
        setSelectedProject({isActive: true, index});
        // Play the video related to the project
        const videoElement = videoRefs.current[index];
        if (videoElement) {
            videoElement.play();
        } 
    };

    const handleProjectLeave = (index) => {
        setSelectedProject({isActive: false, index});
        // Stop the video related to the project
        const videoElement = videoRefs.current[index];
        if (videoElement) {
            videoElement.pause(); // Pause the video
            videoElement.currentTime = 0; // Optionally, reset the video to the start
        }
    };

    const getWords = (title, index) => {
        let words = [];
        title.split(" ").forEach((word, i) => {
            words.push(
                <motion.span 
                    custom={[i * 0.02, (title.split(" ").length - i) * 0.01]} 
                    animate={
                        selectedProject.isActive && selectedProject.index === index
                            ? 'enter'
                            : 'exit'
                    }
                    variants={textTranslate}
                    key={word + i}>
                    {word}
                </motion.span>
            );
            // Add a space after each word except the last one
            if (i < title.split(" ").length - 1) {
                words.push(' ');
            }
        });
        return words;
    }

    useEffect(() => {
        if(isTouchDevice) {
            setDisableAnimation(true);
        }
    }, []);

    const devidedTitle = (title) => {
        const texts = title.split(":");

        return texts.map((text, index) => (
            <span key={`text_${index}`} className='titleText'>
                {text}
            </span>
        ));
    } 
    
    return (
        <section>
            <div className="bodyFreeProjects">
                {
                    freeProjects.map((project, index) => {
                        const { title, src, alt, href, path } = project;
                        return (
                            <Link
                                key={`l_${index}`} 
                                href={href} 
                                className="project"
                                data-scroll data-scroll-speed={0.05 * (index + 1)}
                                onMouseOver={() => handleProjectInteraction(index)} 
                                onTouchStart={() => handleProjectInteraction(index)}
                                onMouseLeave={() => handleProjectLeave(index)}
                            >
                                <motion.div
                                    variants={shade} 
                                    animate={selectedProject.isActive && selectedProject.index != index ? "open" : "closed"}
                                >
                                    <Image 
                                        src={src} 
                                        alt={alt} 
                                        fill
                                        sizes="true"
                                        loading='lazy'
                                    />
                                    <div className='overlay'/>
                                    {!disableAnimation && <video
                                        ref={el => videoRefs.current[index] = el} // Assign ref to the video element
                                        loop={true}
                                        muted={true}
                                        playsInline={true}
                                    >
                                        <source src={path} type="video/webm" />
                                    </video>}
                                </motion.div>
                                <motion.p>
                                    {disableAnimation ? devidedTitle(title) : getWords(title, index)}
                                </motion.p>
                            </Link>
                        );
                    })
                }
            </div>
        </section>
    );
}