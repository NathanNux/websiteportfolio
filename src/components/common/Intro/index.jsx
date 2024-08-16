import { useScroll, useTransform } from "framer-motion";
import { Fragment, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

import styles from "./style.module.scss";

export default function Intro({src, phrase1, phrase2, phrase3}) {

    const section = useRef(null);
    const { scrollYProgress } = useScroll({
        target: section,
        offset: ['start end', 'end start']
    })

    const y = useTransform(scrollYProgress, [0, 1], ["-50%", "50%"]);

    return (
        <motion.section ref={section} className={styles.main} style={{y}} >
            <Image 
              src={src}
              fill
              sizes="true"
              alt="background"
              priority
            />

            <div className={styles.textContainer}>
                <div className={styles.firstText}>
                    {phrase1?.map((phrase, i) => (
                        <Paragraph key={i} text={phrase.text} />
                    ))}
                </div>

                <div className={styles.secondText}>
                    {phrase2?.map((phrase, i) => (
                        <Paragraph key={i} text={phrase.text} />
                    ))}
                </div>

                <div className={styles.mainText}>
                    {phrase3?.map((phrase, i) => (
                        <Paragraph key={i} text={phrase.text} />
                    ))}
                </div>
            </div>
        </motion.section>
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