import Projects from './Projects'
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform} from 'framer-motion';
import { opacity, slideUp } from './anim';
import dynamic from 'next/dynamic';
import IconList from './IconList';
import ButtonClick from '@/components/common/ClickButton/clickButton';
import { useMediaQuery } from 'react-responsive';
import { useLoad } from '@/context';
const Scene = dynamic(() => import('./Scene'), { ssr: false });

export default function ProjectsList() {
    const ref = useRef(null);
    const [view, setView] = useState('list');
    const [ activeProject, setActiveProject ] = useState(null);
    const curve = useRef(null);
    const [disableScene, setDisableScene] = useState(false);
    const isTouchDevice = useMediaQuery({ query: '(hover: none) and (pointer: coarse)' });

    const { isHomeCountry } = useLoad();

    const [ selectedCategory, setSelectedCategory ] = useState('all');
    

    const handleViewChange = (newView) => {
        setView(prevView => prevView === newView ? (newView === 'list' ? 'icon' : 'list') : newView)
    }

    const { scrollYProgress } = useScroll({
        target: curve,
        offset: ['start end', 'end start']
    })

    const height = useTransform(scrollYProgress, [0, 1], [800, 0])

    useEffect(() => {
        if (window.matchMedia('(hover: none)').matches) {
            setView('icon')
        }
        if (isTouchDevice) {
            setDisableScene(true);
        }
    },[isTouchDevice])

    return (
        <motion.section className="mainAllProjectsPage" variants={slideUp} initial='initial' animate='enter'>
            <div className="barContainer">
                
                <div className="headerProjects">
                    <p>{ isHomeCountry ? "Všechny projekty" : "All My Projects"}</p>
                </div>
               
                <div className="bar">
                    <div className="buttons">
                        <ButtonClick title={ isHomeCountry ? 'Všechny' : "All"} onClick={() => setSelectedCategory('all')} trigger='all' currentView={view} filterCategory={selectedCategory}/>
                        <ButtonClick title={isHomeCountry ? 'Aplikace' : "Apps"} onClick={() => setSelectedCategory('app')} trigger='app' currentView={view} filterCategory={selectedCategory}/>
                        <ButtonClick title={isHomeCountry ? 'Webovky' : "Websites"} onClick={() => setSelectedCategory('web')} trigger='web' currentView={view} filterCategory={selectedCategory}/>
                    </div>

                    <div className="buttons">
                        <ButtonClick 
                            onClick={() => handleViewChange('list')} 
                            trigger='list' 
                            currentView={view} 
                            filterCategory={selectedCategory}
                            svgPaths={
                                [
                                    {
                                        d: "M1250 3215 l0 -35 1250 0 1250 0 0 35 0 35 -1250 0 -1250 0 0 -35z"
                                    },
                                    {
                                        d: "M1257 2763 c-4 -3 -7 -19 -7 -35 l0 -28 1251 0 1250 0 -3 33 -3 32 -1241 3 c-682 1 -1244 -1 -1247 -5z"
                                    },
                                    {
                                        d: "M1250 2255 l0 -35 1250 0 1250 0 0 35 0 35 -1250 0 -1250 0 0 -35z"
                                    },
                                    {
                                        d: "M1250 1785 l0 -35 1250 0 1250 0 0 35 0 35 -1250 0 -1250 0 0 -35z" 
                                    }
                                ]
                            }
                        />
                        <ButtonClick 
                            src='/images/projects/icon.svg' 
                            onClick={() => handleViewChange('icon')} 
                            trigger='icon' 
                            currentView={view} 
                            filterCategory={selectedCategory}
                            svgPaths={
                                [
                                    {
                                        d: "M1147 3540 c-84 -15 -159 -79 -186 -159 -17 -53 -15 -632 3 -675 19 -46 72 -104 120 -129 41 -22 47 -22 594 -25 356 -2 566 1 591 8 56 15 116 62 148 117 l28 48 3 303 c3 262 1 310 -13 353 -19 57 -66 108 -128 141 -42 23 -42 23 -577 25 -294 0 -557 -3 -583 -7z m1128 -59 c50 -22 101 -79 115 -128 8 -25 10 -135 8 -330 l-3 -291 -30 -43 c-16 -23 -50 -53 -75 -66 l-44 -24 -561 3 -562 3 -36 27 c-19 16 -46 43 -59 60 -23 33 -23 37 -26 341 -3 299 -2 310 19 353 22 47 64 85 114 102 19 7 219 11 565 11 497 1 538 -1 575 -18z"
                                    },
                                    {
                                        d: "M2755 3541 c-87 -15 -163 -80 -190 -160 -14 -43 -16 -91 -13 -353 l3 -303 28 -48 c33 -56 89 -99 149 -116 31 -9 191 -11 593 -9 544 3 550 3 591 25 48 25 101 83 120 129 11 26 14 102 14 341 0 302 -1 309 -24 358 -25 55 -67 95 -125 123 -32 15 -89 17 -571 18 -294 1 -553 -1 -575 -5z m1132 -65 c36 -17 60 -38 80 -67 l28 -43 0 -322 0 -322 -31 -39 c-16 -21 -50 -48 -74 -60 l-44 -23 -547 0 -546 0 -44 23 c-24 13 -57 43 -74 66 l-30 43 -3 291 c-4 320 -1 345 51 404 66 75 48 73 647 73 l535 0 52 -24z"
                                    },
                                    {
                                        d: "M1130 2441 c-48 -15 -87 -40 -120 -77 -59 -68 -60 -74 -60 -411 0 -302 1 -309 24 -358 25 -54 70 -98 126 -124 31 -14 103 -16 590 -16 445 0 563 3 594 14 49 17 111 73 139 125 21 40 22 51 22 361 l0 320 -28 47 c-15 26 -42 59 -60 72 -73 56 -74 56 -661 55 -297 0 -552 -4 -566 -8z m1161 -64 c24 -13 58 -43 74 -66 l30 -43 3 -296 c2 -253 1 -303 -13 -339 -18 -47 -81 -109 -122 -120 -16 -5 -274 -8 -574 -8 l-546 0 -49 30 c-28 18 -58 47 -71 70 -22 39 -23 48 -23 342 0 189 4 312 11 330 15 40 57 82 104 104 37 17 76 19 586 19 l546 0 44 -23z"
                                    },
                                    {
                                        d: "M2717 2436 c-55 -20 -103 -61 -134 -114 l-28 -47 -3 -304 c-3 -329 0 -355 52 -424 14 -19 50 -47 78 -63 l53 -29 565 0 c496 0 569 2 600 16 56 26 101 70 126 124 23 49 24 56 24 358 0 239 -3 315 -14 341 -19 46 -72 104 -120 129 -41 22 -46 22 -601 24 -450 2 -567 0 -598 -11z m1173 -58 c24 -13 58 -40 74 -61 l31 -39 3 -316 c2 -313 2 -317 -21 -357 -13 -23 -43 -52 -71 -70 l-49 -30 -546 0 c-300 0 -558 3 -574 8 -41 11 -104 73 -122 120 -14 36 -15 86 -13 339 l3 296 30 43 c17 23 50 53 74 66 l44 23 546 0 547 0 44 -22z"
                                    }
                                ]
                            }
                        />
                    </div>
                </div>
            </div>
            <AnimatePresence wait>
                {/* need to have the key in there. without it. The el with list or icon will not be recognized as list or icon => no animations */}
                {view === 'list' && (
                    <motion.div className="list" ref={ref} key='list' variants={opacity} initial="exit" animate='enter' exit='exit'>
                        <div className="options">
                            <div className="section">
                                <Projects setActiveProject={setActiveProject} selectedCategory={selectedCategory}/>
                            </div>
                        </div>
                        {!disableScene && <Scene activeProject={activeProject} containerRef={ref}/>}
                    </motion.div>
                )}

                {view === 'icon' && (
                    <motion.div className="iconList" key='icon' variants={opacity} initial='exit' animate='enter' exit='exit'>
                        <div>
                            <section className="mainIcon">
                                <div className="projects">
                                    <IconList selectedCategory={selectedCategory} />
                                </div>
                            </section>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div 
                ref={curve}
                className="svgContainer"
            >
                <motion.div style={{height}}  className="svgDiv"></motion.div>
            </motion.div>

        </motion.section>
    );
}