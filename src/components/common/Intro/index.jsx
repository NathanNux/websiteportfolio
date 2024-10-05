import { useScroll, useTransform } from "framer-motion";
import { Fragment, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Intro({src, phrase1, phrase2, phrase3}) {

    const section = useRef(null);
    const { scrollYProgress } = useScroll({
        target: section,
        offset: ['start end', 'end start']
    })

    const y = useTransform(scrollYProgress, [0, 1], ["-50%", "50%"]);

    return (
        <motion.section ref={section} layout className="mainIntro" style={{y}} >
            <Image 
              src={src}
              fill={true}
              sizes="100vw"
              alt="background"
              priority={true}
              quality={80}
            />

            <div className="textContainer">
                <div className="firstText">
                    {phrase1?.map((phrase, i) => (
                        <Paragraph key={i} text={phrase.text} />
                    ))}
                </div>

                <div className="secondText">
                    {phrase2?.map((phrase, i) => (
                        <Paragraph key={i} text={phrase.text} />
                    ))}
                </div>

                <div className="mainText">
                    {phrase3?.map((phrase, i) => (
                        <Paragraph key={i} text={phrase.text} />
                    ))}
                </div>
            </div>
        </motion.section>
    )
}





// useTransform cannot be in callback function, because it is not a hook, need to create a new component
const CharSpan = ({char, index, totalLenght, scrollYProgress}) => {
  const start = index / totalLenght;
  const end = start + (1 / totalLenght);
  const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
  return <motion.span style={{opacity}} layout>{char}</motion.span>;
}


const Paragraph = ({text}) => {
  const ref = useRef(null);
  const {scrollYProgress} = useScroll({
      target: ref,
      offset: ['start 0.8', 'start 0.5']
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