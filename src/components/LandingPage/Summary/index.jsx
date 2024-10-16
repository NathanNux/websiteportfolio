import { Fragment, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Points from "./Points";
import { useLoad } from "@/context";

export default function Summary ({images}) {
    const section = useRef(null);
    const projectsRef = useRef(null);
    const curve = useRef(null);

    const { isHomeCountry } = useLoad();

    const { scrollYProgress } = useScroll({
        target: curve,
        offset: ['start end', 'end start']
    })

    const height = useTransform(scrollYProgress, [0, 1], [800, 0])



  return (
    <section ref={section} className="summary">
      <div className="backgroundSummary">
        <div className="text">
            <Paragraph text={ isHomeCountry ? "Takže shrnuto: co dostanete..." : "So In short, you'll get..."}/>
        </div>


        <div ref={projectsRef} className="points">
            <Points photos={images}/>
        </div>

        <div className="budget">
            <h1>{ isHomeCountry ? "Rozpočet" : "Budget"}</h1>
            <p>{ isHomeCountry ? "60 000 - 120 000 ,-" :"$3000 - $6000"}</p>
        </div>
        <div 
            ref={curve}
            className="svgContainer"
        >
            <motion.div layout style={{height}}  className="svgDiv"></motion.div>
        </div>
      </div>
    </section>
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