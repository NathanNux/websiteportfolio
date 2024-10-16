import { useScroll, useTransform } from "framer-motion";
import { Fragment, useRef } from "react";
import { motion } from "framer-motion";
import { opacity } from "@/components/anim";

export default function Description({description}) {

    return (
        <motion.section layout className="mainDesc" variants={opacity} initial="initial" animate="enter">
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


// useTransform cannot be in callback function, because it is not a hook, need to create a new component
const CharSpan = ({char, index, totalLenght, scrollYProgress}) => {
  const start = index / totalLenght;
  const end = start + (1 / totalLenght);
  const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
  return <motion.span style={{opacity}}>{char}</motion.span>;
}


const Paragraph = ({text}) => {
  const ref = useRef(null);
  const {scrollYProgress} = useScroll({
      target: ref,
      offset: ['start 0.8', 'start 0.2']
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