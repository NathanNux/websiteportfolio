import Link from 'next/link';
import { motion } from 'framer-motion';


import styles from './style.module.scss'
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { scaleAnim, shade, textTranslate } from '@/components/anim';
import { useRouter } from 'next/navigation';
import { projects } from '@/constants';
import { useMediaQuery } from 'react-responsive';

export default function Projects () {

    const [modal, setModal] = useState(false)
    const [disableAnimation, setDisableAnimation] = useState(false);
    const isPhoneDevice = useMediaQuery({ query: '(max-width: 450px) and (max-height: 950px)' });

    const cursor = useRef(null); 
    const label = useRef(null);
    const section = useRef(null);
    const projectsRef = useRef([]);

    const [selectedProject, setSelectedProject] = useState({isActive: false, index: 0});

    // function that find out what the previous and next projects are based on the current project

    const currentProject = projects.find(project => project.href === pathname);

    // had issue while unmouting, that the index was undefined as "index"
    // so had to add a check for that, an modular arithemtic to get the next and previous projects
    // simplified: If the currentprojects is 3 its like this: 3 - 1 + (length of projects) % (length of projects) = 2
    // the % is there to make sure that the index is always within the bounds of the array, so if there was no umouting issue, I could have just done -1 and +1, but that is not the case
    const nextProjects = [
        projects[((currentProject?.index ?? 0) - 1 + projects.length) % projects.length],
        projects[((currentProject?.index ?? 0) + 1) % projects.length],
    ]
    // using modulo operator "%" and index array calculatio will prevent out of bounds array access errors

    const router = useRouter();

    const handleClick = (href) => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })

        router.push(href);
    }

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

    // Debounce function
    const debounce = (func, delay) => {
        let debounceTimer;
        return function() {
            const context = this;
            const args = arguments;
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => func.apply(context, args), delay);
        }
    }

    useEffect(() => {
        const projectsElement = projectsRef.current;
        const sectionElement = section.current;

        let scrollY = window.scrollY;

        const handleScroll = () => {
            scrollY = window.scrollY;
        };
        
        // need to use a function to return a function to be able to pass the index
        // so the index is not lost when the event listener is added through the setSelectProject function
        const handleMouseEnter = (index) => () => { 
            setModal(true)
            setSelectedProject({isActive: true, index})
        };
        const handleMouseLeave = (index) => () => {
            setModal(false)
            setSelectedProject({isActive: false, index})
        };

        const handleMouseMove = (e) => {
            const {clientX, clientY} = e;
            const rect = sectionElement.getBoundingClientRect();

            const x = clientX - rect.left;
            const y = clientY - rect.top;

            if (modal) {
                gsap.to(cursor.current, {left: x, top: y, duration: 0.8, ease: 'power3'});
                gsap.to(label.current, {left: x, top: y, duration: 0.8, ease: 'power3'});
            }
        };

        window.addEventListener("scroll", handleScroll, debounce(100));
        // then we need to add the event listeners to each project
        projectsElement.forEach((project, index) => {
            if(project !== null) {
                project.addEventListener("mouseenter", handleMouseEnter(index));
                project.addEventListener("mouseleave", handleMouseLeave(index));
            }
        });
        sectionElement.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("scroll", handleScroll, debounce(1));
            projectsElement.forEach((project, index) => {
                if(project !== null) {
                    project.removeEventListener("mouseenter", handleMouseEnter(index));
                    project.removeEventListener("mouseleave", handleMouseLeave(index));
                }
            });
            sectionElement.removeEventListener("mousemove", handleMouseMove);
        }
    },[modal])
    useEffect(() => {
        setDisableAnimation(isPhoneDevice);
    }, [isPhoneDevice]);



    
    return (
        <section ref={section} className={styles.main}>
            <div className={styles.body}>
                {
                    nextProjects.map((project, index) => {
                        const { title, src, alt, href } = project;
                        return (
                            <Link
                                key={`l_${index}`} 
                                href={href} 
                                className={styles.project} 
                                data-scroll data-scroll-speed={0.05 * (index + 1)}
                                onMouseOver={() => {setSelectedProject({isActive: true, index})}} 
                                onMouseLeave={() => {setSelectedProject({isActive: false, index})}}
                                onClick={() => handleClick(href)} 
                                // we need to set multiple refs to the same element
                                ref={el => projectsRef.current[index] = el}
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
                                    />
                                </motion.div>
                                <motion.p>
                                    { disableAnimation ? title:  getWords(title, index)}
                                </motion.p>
                            </Link>
                        );
                    })
                }
            </div>
            <motion.div ref={cursor} className={styles.cursor} variants={scaleAnim} animate={modal ? 'enter': 'exit'}></motion.div>
            <motion.div ref={label} className={styles.label} variants={scaleAnim} animate={modal ? 'enter': 'exit'}>
                <p>Zobrazit</p>
            </motion.div>
        </section>
    )
    
}


