

import { InlineWidget } from 'react-calendly';
import styles from './style.module.scss';
import { useScroll, useTransform } from 'framer-motion';
import { Fragment, useRef } from 'react';
import { motion } from 'framer-motion';


const phrase = [
    {
        text: "Vyberte si termín, který mám volný a Vám vyhovuje. "
    },
];

export default function Calendly() {

    return (
        <section className={styles.main}>
            <div className={styles.text}>
                <h2>Chcete se spojit<br/> hned? </h2> 
                <div className={styles.firstText}>
                    {phrase.map((phrase, i) => (
                        <Paragraph key={i} text={phrase.text} />
                    ))}
                </div>
            </div>

            <div className={styles.calendly}>
                <InlineWidget url="https://calendly.com/forejtovic/30min" />
            </div>
        </section>
    )
}

const Paragraph = ({text}) => {
    const ref = useRef(null);
    const {scrollYProgress} = useScroll({
        target: ref,
        offset: ['start 0.9', 'start 0.5']
    });

    // Split the text into lines using <br/> as the separator
    const lines = text.split('<br/>');

    return (
      <p ref={ref}>
        {lines.map((line, lineIndex) => (
          <Fragment key={lineIndex}>
            {line.split('<span>').map((part, partIndex) => {
              if (partIndex % 2 === 0) {
                return [...part].map((char, charIndex) => {
                  const start = charIndex / part.length;
                  const end = start + (1 / part.length);
                  const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
                  return <motion.span key={charIndex} style={{opacity}}>{char}</motion.span>;
                });
              } else {
                const spanPart = part.split('</span>')[0];
                return [...spanPart].map((char, charIndex) => {
                  const start = charIndex / spanPart.length;
                  const end = start + (1 / spanPart.length);
                  const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
                  return <motion.span key={charIndex} style={{opacity}} className={styles.specialSpan}>{char}</motion.span>;
                });
              }
            })}
            {lineIndex < lines.length - 1 && <br />}
          </Fragment>
        ))}
      </p>
    );
};