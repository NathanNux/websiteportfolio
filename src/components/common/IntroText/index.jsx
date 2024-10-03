import React, { Fragment, useRef } from 'react';
import { useScroll, useTransform } from 'framer-motion';
import { motion } from 'framer-motion';

export default function IntroText({ phrases }) {
  return (
    <section className="mainIntroText">
      <div className="textContainer">
        {phrases?.map((phrase, i) => {
          return <Paragraph key={i} text={phrase.text} />;
        })}
      </div>
    </section>
  );
}

// New component for handling the animation of each word
const AnimatedWord = ({ word, range, progress, isHighlighted }) => {
  const opacity = useTransform(progress, range, [0, 1]);
  return (
    <motion.span className={isHighlighted ? 'highlighted' : ''} style={{ opacity, display: 'inline-block', marginRight: '0.25em' }}>
      {word}
    </motion.span>
  );
};

const TextWithBrAndSpan = ({ text, progress }) => {
  // Split the text into lines using <br /> as the separator
  const lines = text.split('<br />');

  // Combine all words into a single array
  const allWords = [];
  lines.forEach((line, i) => {
    const parts = line.split(/<span>|<\/span>/);
    parts.forEach((part, j) => {
      const words = part.split(' ');
      words.forEach((word, k) => {
        allWords.push({ word, isHighlighted: j % 2 === 1 });
      });
      // Add a line break character if it's not the last part
      if (j < parts.length - 1) {
        allWords.push({ word: '<span>', isHighlighted: false });
      }
    });
    // Add a line break character if it's not the last line
    if (i < lines.length - 1) {
      allWords.push({ word: '<br />', isHighlighted: false });
    }
  });

  // Calculate the start and end values for each word
  const ranges = allWords.map((_, index) => {
    const start = index / allWords.length;
    const end = start + 1 / allWords.length;
    return [start, end];
  });

  return (
    <>
      {allWords.map((item, index) => {
        const range = ranges[index];
        return (
          <Fragment key={index}>
            {item.word === '<br />' ? (
              <br />
            ) : item.word === '<span>' ? (
              <span />
            ) : (
              <AnimatedWord
                word={item.word}
                range={range}
                progress={progress}
                isHighlighted={item.isHighlighted}
              />
            )}
          </Fragment>
        );
      })}
    </>
  );
};

const Paragraph = ({ text }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.65', 'start 0.3'],
  });

  return (
    <p data-scroll data-scroll-speed={0.5} ref={ref}>
      <TextWithBrAndSpan text={text} progress={scrollYProgress} />
    </p>
  );
};