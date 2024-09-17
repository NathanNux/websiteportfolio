import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

import { useMousePosition } from '@/utils/useMousePosition';
import ButtonLink from '@/components/common/LinkButton/linkButton';
import { textOpacity, textSlideUp } from '@/components/anim';
import { useMediaQuery } from 'react-responsive';
import useGetLocation from '@/utils/useGetLocation';
import { useLoad } from '@/context';

export default function Index () {
    useGetLocation();
    const { isHomeCountry } = useLoad();

    const phrase = isHomeCountry ? 'Pomáhám značkám a firmám růst v digitálním světě. Společně nastavíme nový standard pro webové projekty. Vždy s nejnovější technologií, kvalitou a s ověřenými systémy...  žádné nesmysly.' : 'I help brands and companies grow in the digital world. Together we set a new standard for web projects. Always with the latest technology, quality and proven systems... no nonsense.';
    const phraseHidden =  isHomeCountry ? 'Visuální desinger + Fullstack Dev, který má schopnosti a zkušenosti dělat díla, které (ještě) nebyla a nebudou nahrazena umělou inteligencí - Odvádím skvělou práci, když je cena stejně tak skvělá.' : 'Visual designer + Fullstack Dev, who has the skills and experience to create works that have not yet been and will not be replaced by artificial intelligence - I do great shit when the price is equally right.';
    const aboutText = isHomeCountry ? "Kombinace vášně pro design, programování a kreativita mě posunula do unikátního pozice v životě." : "The combination of passion for design, coding and creativity got me to unique position in life."
    const description = useRef(null);
    const isInView = useInView(description)
    

    const [ isHovered, setIsHovered ] = useState(false);
    const elRef = useRef(null);
    const { x, y } = useMousePosition(elRef);
    const size = isHovered ? 300 : 20;

    const [disableScene, setDisableScene] = useState(false);
    const isTouchDevice = useMediaQuery({ query: '(hover: none) and (pointer: coarse)' });

    useEffect(() => {
        if (isTouchDevice) {
            setDisableScene(true);
        }
    }, [isTouchDevice]);

    return (
        <section className="descriptionLanding" >
            <div className="body">
                <div className="main" ref={elRef}>
                    {!disableScene && <motion.div className="mask" animate={{
                        WebkitMaskPosition: `${x - (size / 2)}px ${y - (size / 2)}px`,
                        WebkitMaskSize: `${size}px`,
                        }}
                        transition={{ type: 'tween', ease: 'backOut', duration: 0.5 }}
                        >
                        <p onMouseEnter={() => {setIsHovered(true)}} onMouseLeave={() => {setIsHovered(false)}}>
                            {phraseHidden}
                        </p>
                    </motion.div>}
                    <div className="bodyHidden">
                       <p>
                        {
                            phrase.split(' ').map((word, index) => {
                                return (
                                    <span key={index} className="maskText" ref={description}><motion.span variants={textSlideUp} custom={index} animate={isInView ? "open" : "closed"} key={index}>{word}</motion.span></span>
                                )
                            })
                        }
                    </p>
                    </div>
                    
                </div>
                
                <div className="about">
                    <motion.p
                        variants={textOpacity} animate={isInView ? "open" : "closed"}
                        className="text"
                    >
                        {aboutText}
                    </motion.p>
                    <div data-scroll data-scroll-speed={0.08}>
                        <ButtonLink title={ isHomeCountry ? 'Více o mně' : 'About'} href='/about' className="button"/>
                    </div>
                </div>
            </div>
        </section>
    )
}