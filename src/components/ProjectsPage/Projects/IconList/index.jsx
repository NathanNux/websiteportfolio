import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import gsap from "gsap";
import { useMediaQuery } from 'react-responsive';


import { scaleAnim, textTranslate } from "@/components/anim";
import { slide } from "../anim";
import { projects } from "@/constants";

export default function IconList({ selectedCategory}) {
    const [selectedProject, setSelectedProject] = useState({isActive: false, index: 0});
    const [modal, setModal] = useState(false)
    const [disableAnimation, setDisableAnimation] = useState(false);
    const isTouchDevice = useMediaQuery({ query: '(hover: none) and (pointer: coarse)' });


    const cursor = useRef(null); 
    const label = useRef(null);
    const section = useRef(null);
    const projectsRef = useRef([]);

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

    const fileteredProjects = projects.filter(project => selectedCategory === 'all' || project.type === selectedCategory);

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

        // when it's removed from the DOM the project is null which causes an error with the remove event listener

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
    },[modal]);

    useEffect(() => {
        setDisableAnimation(isTouchDevice);
    }, [isTouchDevice]);
        
    return (
        <section className="mainIconList" ref={section}>
            <motion.div ref={cursor} className="cursor" variants={scaleAnim} animate={modal ? 'enter': 'exit'}></motion.div>
            <motion.div ref={label} className="label" variants={scaleAnim} animate={modal ? 'enter': 'exit'}>
                <p>Zobrazit</p>
            </motion.div>

            <LayoutGroup>
                <div className="body">
                    <AnimatePresence wait>
                        {
                            fileteredProjects.map((project, index) => {
                                const { title, src, alt, href } = project;
                                return (
                                    <motion.div
                                        key={title}
                                        layout
                                        variants={slide}
                                        initial="initial"
                                        animate="enter"
                                        exit="exit"
                                    >
                                        <Link
                                        key={`l_${index}`} 
                                        href={href} 
                                        className="project"
                                        onMouseOver={() => {setSelectedProject({isActive: true, index})}} 
                                        onMouseLeave={() => {setSelectedProject({isActive: false, index})}} 
                                        ref={el => projectsRef.current[index] = el}
                                        >
                                            <motion.div className="imageContainer">
                                                <div>
                                                    <Image 
                                                        src={src} 
                                                        alt={alt} 
                                                        fill
                                                        sizes="true"
                                                    />
                                                </div>
                                            </motion.div>
                                            
                                            <motion.p>
                                                {disableAnimation ? title:  getWords(title, index)}
                                            </motion.p>
                                        </Link>
                                    </motion.div>
                                    
                                );
                            })
                        }
                    </AnimatePresence>
                    
                </div>
            </LayoutGroup>
        </section>
    )
}