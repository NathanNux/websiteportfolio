import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

import styles from './style.module.scss';
import { useMousePosition } from '@/utils/useMousePosition';
import ButtonLink from '@/components/common/LinkButton/linkButton';
import { textOpacity, textSlideUp } from '@/components/anim';

export default function Index () {

    const phrase = 'Pomáhám značkám a firmám růst v digitálním světě. Společně nastavíme nový standard pro webové projekty. Vždy s nejnovější technologií, kvalitou a s ověřenými systémy...  žádné nesmysly.'
    const phraseHidden = 'Visuální desinger + Fullstack Dev, který má schopnosti a zkušenosti dělat díla, které (ještě) nebyla a nebudou nahrazena umělou inteligencí - Odvádím skvělou práci, když je cena stejně tak skvělá.'
    const description = useRef(null);
    const isInView = useInView(description)

    const [ isHovered, setIsHovered ] = useState(false);
    const elRef = useRef(null);
    const { x, y } = useMousePosition(elRef);
    const size = isHovered ? 300 : 20;

    return (
        <section className={styles.description} >
            <div className={styles.body}>
                <div className={styles.main} ref={elRef}>
                    <motion.div className={styles.mask} animate={{
                        WebkitMaskPosition: `${x - (size / 2)}px ${y - (size / 2)}px`,
                        WebkitMaskSize: `${size}px`,
                        }}
                        transition={{ type: 'tween', ease: 'backOut', duration: 0.5 }}
                        >
                        <p onMouseEnter={() => {setIsHovered(true)}} onMouseLeave={() => {setIsHovered(false)}}>
                            {phraseHidden}
                        </p>
                    </motion.div>
                    <div className={styles.bodyHidden}>
                       <p>
                        {
                            phrase.split(' ').map((word, index) => {
                                return (
                                    <span key={index} className={styles.maskText} ref={description}><motion.span variants={textSlideUp} custom={index} animate={isInView ? "open" : "closed"} key={index}>{word}</motion.span></span>
                                )
                            })
                        }
                    </p>
                    </div>
                    
                </div>
                
                <div className={styles.about}>
                    <motion.p
                        variants={textOpacity} animate={isInView ? "open" : "closed"}
                        className={styles.text}
                    >
                        Kombinace vášně pro design, programování a kreativita mě posunula do unikátního pozice v životě.
                    </motion.p>
                    <div data-scroll data-scroll-speed={0.08}>
                        <ButtonLink title='Více o mně' href='/about' className={styles.button}/>
                    </div>
                </div>
            </div>
        </section>
    )
}