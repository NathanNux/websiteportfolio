import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { textTranslate } from '@/components/anim';
import { useMediaQuery } from 'react-responsive';
import { cards, cardsEN } from '@/constants';
import { useLoad } from '@/context';

export default function Points() {
    const [selectedProject, setSelectedProject] = useState({ isActive: false, index: 0 });
    const [disableAnimation, setDisableAnimation] = useState(false);
    const isTouchDevice = useMediaQuery({ query: '(hover: none) and (pointer: coarse)' });
    const { isHomeCountry } = useLoad();

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
                    key={word + i}
                >
                    {word}
                </motion.span>
            );
            // Add a space after each word except the last one
            if (i < title.split(" ").length - 1) {
                words.push(' ');
            }
        });
        return words;
    };

    const splitText = (text) => {
        return text.split(' ').map((word, index) => (
            <span key={index} className='splitTitle'>{word}</span>
        ));
    };

    useEffect(() => {
        if (isTouchDevice) {
            setDisableAnimation(true);
        }
    }, [isTouchDevice]);

    // WIP: might do a on scroll anim individual points text in the cards to make it more interesting

    return (
        <section>
            <div className="bodySummary">
                { isHomeCountry ?
                    (
                        cards.map((card, index) => {
                            const { title, points, quarentees, text } = card;
                            return (
                                <div
                                    key={`card_${index}`}
                                    className="card"
                                    data-scroll
                                    data-scroll-speed={0.05 * (index + 1)}
                                    onMouseOver={() => {
                                        setSelectedProject({ isActive: true, index });
                                    }}
                                    onMouseLeave={() => {
                                        setSelectedProject({ isActive: false, index });
                                    }}
                                >
                                    <ul>
                                        {points.map((point, pointIndex) => (
                                            <li key={`point_${pointIndex}`}>
                                                <div className='dot'/>
                                                <p>{point}</p>
                                            </li>
                                        ))}
                                    </ul>
                                    <p className='devider'>{text}</p>
                                    <ul>
                                        {quarentees.map((quarentee, quarenteeIndex) => (
                                            <li key={`point_${quarenteeIndex}`}>
                                                <div className='dot'/>
                                                <p>{quarentee}</p>
                                            </li>
                                        ))}
                                    </ul>
                                    <motion.p className='title'>
                                        {disableAnimation ? splitText(title) : getWords(title, index)}
                                    </motion.p>
                                </div>
                            );
                        })
                    ) : (
                        cardsEN.map((card, index) => {
                            const { title, points, quarentees, text } = card;
                            return (
                                <div
                                    key={`card_${index}`}
                                    className="card"
                                    data-scroll
                                    data-scroll-speed={0.05 * (index + 1)}
                                    onMouseOver={() => {
                                        setSelectedProject({ isActive: true, index });
                                    }}
                                    onMouseLeave={() => {
                                        setSelectedProject({ isActive: false, index });
                                    }}
                                >
                                    <ul>
                                        {points.map((point, pointIndex) => (
                                            <li key={`point_${pointIndex}`}>
                                                <div className='dot'/>
                                                <p>{point}</p>
                                            </li>
                                        ))}
                                    </ul>
                                    <p className='devider'>{text}</p>
                                    <ul>
                                        {quarentees.map((quarentee, quarenteeIndex) => (
                                            <li key={`point_${quarenteeIndex}`}>
                                                <div className='dot'/>
                                                <p>{quarentee}</p>
                                            </li>
                                        ))}
                                    </ul>
                                    <motion.p className='title'>
                                        {disableAnimation ? splitText(title) : getWords(title, index)}
                                    </motion.p>
                                </div>
                            );
                        }) 
                    )
                }
            </div>
        </section>
    );
}