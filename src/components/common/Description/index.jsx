import { useScroll, useTransform } from "framer-motion";
import { Fragment, useRef } from "react";
import { motion } from "framer-motion";

import styles from "./style.module.scss";
import { opacity } from "@/components/anim";

export default function Description({description}) {

    return (
        <motion.section className={styles.main} variants={opacity} initial="initial" animate="enter">
            <div>
                <h2>
                    {description.map((phrase, i) => (
                        <Paragraph key={i} text={phrase.text} />
                    ))}
                </h2>
            </div>
        </motion.section>
    )
}


const Paragraph = ({text}) => {
    const ref = useRef(null);
    const {scrollYProgress} = useScroll({
        target: ref,
        offset: ['start 0.8', 'start 0.25']
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