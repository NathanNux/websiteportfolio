import Link from 'next/link';
import { motion } from 'framer-motion';

import styles from './style.module.scss'
import { useState } from 'react';
import Image from 'next/image';
import { shade, textTranslate } from '@/components/anim';
import { freeProjects } from '@/constants';

export default function Projects () {

    const [selectedProject, setSelectedProject] = useState({isActive: false, index: 0});
    

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
    
    return (
        <section>
            <div className={styles.body}>
                {
                    freeProjects.map((project, index) => {
                        const { title, src, alt, href } = project;
                        return (
                            <Link
                                key={`l_${index}`} 
                                href={href} 
                                className={styles.project} 
                                data-scroll data-scroll-speed={0.05 * (index + 1)}
                                onMouseOver={() => {setSelectedProject({isActive: true, index})}} 
                                onMouseLeave={() => {setSelectedProject({isActive: false, index})}} 
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
                                </motion.div>
                                <motion.p>
                                    {getWords(title, index)}
                                </motion.p>
                            </Link>
                        );
                    })
                }
            </div>
        </section>
    )
}