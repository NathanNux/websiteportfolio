import React, { Fragment, useRef } from 'react'
import styles from './style.module.scss'
import { useScroll, useTransform } from 'framer-motion';
import {motion} from 'framer-motion';


export default function IntroText ({phrases}) {
    // I have declared the scrollYProgress, now add style and then motion. to the elements

  return (
    <section className={styles.main}>
        <div className={styles.textContainer}>
            {phrases?.map((phrase, i) => {
                return (
                    <Paragraph key={i} text={phrase.text} />
                )
            })}
        </div>
    </section>
  )
}

// New component for handling the animation of each character
const AnimatedChar = ({ char, range, progress, isHighlighted }) => {
  const opacity = useTransform(progress, range, [0, 1]);
  return (
    <motion.span className={isHighlighted ? styles.highLighted : ''} style={{ opacity }}>
      {char}
    </motion.span>
  );
};

const TextWithBrAndSpan = ({ text, progress }) => {
  // Split the text into lines using <br /> as the separator
  const lines = text.split('<br />');

  // Calculate the start and end values for each character
  const ranges = lines.map(line => {
    const parts = line.split(/<span>|<\/span>/);
    return parts.map(part => {
      const chars = part.split('');
      return chars.map((char, k) => {
        const start = k / chars.length;
        const end = start + (1 / chars.length);
        return [start, end];
      });
    });
  });

  // I used copilot to help me with this code
  // Im declaring the lines by splitting the text into lines using <br /> as the separator
  // then because of next js hiarchy I need to calculate the start and end values for each character

  // then targeting the span in the second phrase by using if statement by checking if the index is odd
  // then mapping the span and the char inside the span
  // and then mapping the char in the overall text

  // this was done by accident, but it works, and its super dope, so I will keep it :D

  return (
    <>
      {lines.map((line, i) => {
        // Split the line into parts using <span> and </span> as the separators
        const parts = line.split(/<span>|<\/span>/);

        return (
          <Fragment key={i}>
            {parts.map((part, j) => {
              // If the part is at an odd index, it was inside a <span>
              const chars = part.split('');

              return chars.map((char, k) => {
                const range = ranges[i][j][k];
                const isHighlighted = j % 2 === 1;
                return <AnimatedChar key={k} char={char} range={range} progress={progress} isHighlighted={isHighlighted} />;
              });
            })}
            {i < lines.length - 1 && <br />}
          </Fragment>
        );
      })}
    </>
  );
};

const Paragraph = ({text}) => {
    const ref = useRef(null);
    const {scrollYProgress} = useScroll({
        target: ref,
        offset: ['start 0.4', 'start 0.25']
    });

    return (
      <p data-scroll data-scroll-speed={0.5} ref={ref}>
        <TextWithBrAndSpan text={text} progress={scrollYProgress}/>
      </p>
    );
};
