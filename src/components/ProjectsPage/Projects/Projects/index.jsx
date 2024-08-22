import Link from 'next/link';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { slide } from '../anim';
import { projects } from '@/constants';

export default function Index ({setActiveProject, selectedCategory}) {

    const fileteredProjects = projects.filter(project => selectedCategory === 'all' || project.type === selectedCategory);

    function debounce(fn, delay) {
        let timerId;
        return function(...args) {
            if(timerId) {
                clearTimeout(timerId);
            }
            timerId = setTimeout(() => {
                fn(...args);
                timerId = null;
            }, delay);
        }
    }

    return (
        <div className="mainProjectsAll" > 
            <LayoutGroup>
                <ul onMouseLeave={debounce(() => {setActiveProject(null)}, 50)}>
                    <AnimatePresence>
                        {fileteredProjects.map((project, i) => {
                            const { title, date, href, index } = project;
                            return (
                                <motion.li 
                                    key={index} 
                                    onMouseOver={debounce(() => {setActiveProject(index)}, 50)}
                                    layout // This prop tells Framer Motion to animate this component's layout
                                    variants={slide}
                                    initial="initial"
                                    animate="enter"
                                    exit="exit"
                                >
                                    <Link href={href}>
                                        <h2>{title}</h2>
                                        <p>{date}</p>
                                    </Link>
                                </motion.li>
                            )
                        })}
                    </AnimatePresence>
                </ul>
            </LayoutGroup>
        </div>
    );
}