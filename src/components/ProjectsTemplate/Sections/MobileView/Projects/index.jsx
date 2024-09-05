import { motion } from 'framer-motion';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { textTranslate } from '@/components/anim';
import { useMediaQuery } from 'react-responsive';

export default function Projects ({photos}) {

    const [selectedProject, setSelectedProject] = useState({isActive: false, index: 0});
    const [disableAnimation, setDisableAnimation] = useState(false);
    const isTouchDevice = useMediaQuery({ query: '(hover: none) and (pointer: coarse)' });

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

    const splitText = (text) => {
        return text.split(' ').map((word, index) => (
            <span key={index} className='splitTitle'>{word}</span>
        ));
    };

    useEffect(() => {
        if (isTouchDevice) {
            setDisableAnimation(true);
        }
    }, [selectedProject]);
    
    return (
        <section>
            <div className="bodyMobileView">
                {
                    photos.map((project, index) => {
                        const { title, src, alt, href } = project;
                        return (
                            <div
                                key={`l_${index}`} 
                                href={href} 
                                className="project"
                                data-scroll data-scroll-speed={0.05 * (index + 1)}
                                onMouseOver={() => {setSelectedProject({isActive: true, index})}} 
                                onMouseLeave={() => {setSelectedProject({isActive: false, index})}} 
                            >
                                <motion.div>
                                    <Image 
                                        src={src} 
                                        alt={alt} 
                                        fill={true}
                                        sizes="true"
                                    />
                                </motion.div>
                                <motion.p>
                                    { disableAnimation ? splitText(title) : getWords(title, index)}
                                </motion.p>
                            </div>
                        );
                    })
                }
            </div>
        </section>
    )
}