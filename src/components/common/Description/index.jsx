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
const CharSpan = ({char, index, totalLength, scrollYProgress}) => {
  const start = index / totalLength;
  const end = start + (1 / totalLength);
  const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
  return <motion.span style={{opacity}} layout>{char}</motion.span>;
}

const Paragraph = ({text}) => {
  const ref = useRef(null);
  const {scrollYProgress} = useScroll({
      target: ref,
      offset: ['start 0.8', 'start 0']
  });

  // Split the text into lines using <br/> as the separator
  const lines = text.split('<br/>');

  // Calculate the total length of the text without <br/> tags
  const totalLength = lines.reduce((acc, line) => acc + line.length, 0);

  let charIndex = 0;

  return (
    <p ref={ref}>
      {lines.map((line, lineIndex) => (
        <Fragment key={lineIndex}>
          {[...line].map((char, index) => (
            <CharSpan 
              key={charIndex} 
              char={char} 
              index={charIndex++} 
              totalLength={totalLength} 
              scrollYProgress={scrollYProgress} 
            />
          ))}
          {lineIndex < lines.length - 1 && <br />}
        </Fragment>
      ))}
    </p>
  );
};