

import { InlineWidget } from 'react-calendly';
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
        <section className="mainCalendly">
            <div className="text">
                <h2>Chcete se spojit<br/> hned? </h2> 
                <div className="firstText">
                    {phrase.map((phrase, i) => (
                        <Paragraph key={i} text={phrase.text} />
                    ))}
                </div>
            </div>

            <div className="calendly">
                <InlineWidget url="https://calendly.com/forejtovic/30min" />
            </div>
        </section>
    )
}

// useTransform cannot be in callback function, because it is not a hook, need to create a new component
const CharSpan = ({char, index, totalLenght, scrollYProgress, className}) => {
  const start = index / totalLenght;
  const end = start + (1 / totalLenght);
  const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
  return <motion.span style={{opacity}} className={className}>{char}</motion.span>;
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
              return [...part].map((char, charIndex) => (
                  <CharSpan 
                      key={charIndex} 
                      char={char} 
                      index={charIndex} 
                      totalLenght={part.length} 
                      scrollYProgress={scrollYProgress} 
                  />
              ));
            } else {
              const spanPart = part.split('</span>')[0];
              return [...spanPart].map((char, charIndex) => {
                <CharSpan
                  key={charIndex}
                  char={char}
                  index={charIndex}
                  totalLenght={spanPart.length}
                  scrollYProgress={scrollYProgress}
                  className="specialSpan"
                />
              });
            }
          })}
          {lineIndex < lines.length - 1 && <br />}
        </Fragment>
      ))}
    </p>
  );
};