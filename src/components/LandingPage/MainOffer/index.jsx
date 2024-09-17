import React, { Fragment, useEffect, useRef, useState } from 'react'
import { useScroll, useTransform, motion } from 'framer-motion';
import ButtonLink from '@/components/common/LinkButton/linkButton';
import CountdownTimer from './Timer';
import { useLoad } from '@/context';


export default function MainOffer () {
  const [ delay, setDelay ] = useState(false);
  const { isHomeCountry } = useLoad();

  const phrase1 = [
    {
        text: isHomeCountry 
        ? "Můj čas je limitovaný, a mohu přinést tu nejlepší kvalitu <br/> jen pár z Vás každým rokem. <br/><br/>Kontaktujte mě proto hned teď. Je možný, že se na Vás potom, <br/> co odejdete, už nedostane."
        : "My time is limited, and I can bring the best quality to only a few of you every year. <br/><br/>Contact me right now. It is possible that after you leave, <br/> I won't be available anymore."
    },
];

  useEffect(() => {
    setTimeout(() => {
      setDelay(true);
    }, 1000);
  }, []);

  return (
    <section className="mainOffer">
        <div className="textContainer" data-scroll data-scroll-speed={0.4}>
            {phrase1.map((phrase, i) => (
                <Paragraph key={i} text={phrase.text} />
            ))}
        </div>
        <div className="description">
            <p data-scroll data-scroll-speed={0.1} className="maintext">{ isHomeCountry ? "Mohu přijmout ještě" : "I can take in"}<br/><span className="specialSpan">1</span><br/><span>{isHomeCountry ? "Nového Klienta" : "New Client"}</span></p>
            <p className="dateY">{ isHomeCountry ? "Do roku 2025" : "Untill 2025"}</p>
            {/* there was an issue with the time on the server side and client side -> weren't same*/}
           { delay && <CountdownTimer targetDate="2024-12-31T23:59:59"/>}
            <div data-scroll data-scroll-speed={0.1} className="buttonContainer">
              <ButtonLink title='Chci se Spojit Ihned' href='/contact' className="button"/>
            </div>
            
            <div className="textSales" data-scroll data-scroll-speed={0.1}>
                <p>{ isHomeCountry ? "Proč tak málo projektů ročně?" : "Why such a small number?"}<br/> { isHomeCountry ?"Protože Vám chci dát opravdovou hodnotu z toho," : "Because I want to give you a true value"}<br/> { isHomeCountry ? "co umím a to bez žádných limitací." : "of what I can do without any limitation"} <br/><br/> <span > { isHomeCountry ? "Kvalita před kvantitou" : "Quality over Quantity"}</span></p>
            </div>
            {/* WIP: Corrent the text here, make it different */}
        </div>
    </section>
  )
}

const CharSpan = ({ char, index, totalLength, scrollYProgress, className }) => {
  const start = index / totalLength;
  const end = start + (1 / totalLength);
  const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
  return <motion.span style={{ opacity }} className={className}>{char}</motion.span>;
};

const Paragraph = ({ text }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.5', 'start 0.25']
  });

  const lines = text.split('<br/>');

  return (
    <p ref={ref}>
      {lines.map((line, lineIndex) => (
        <Fragment key={lineIndex}>
          {line.split('<span>').map((part, partIndex) => {
            if (partIndex % 2 === 0) {
              return [...part].map((char, charIndex) => (
                <CharSpan 
                  key={`${lineIndex}-${charIndex}`} 
                  char={char} 
                  index={charIndex} 
                  totalLength={part.length} 
                  scrollYProgress={scrollYProgress}
                  // remember to apply correct key and don't forget about the return
                />
              ));
            } else {
              const spanPart = part.split('</span>')[0];
              return [...spanPart].map((char, charIndex) => (
                <CharSpan 
                  key={`${lineIndex}-${charIndex}`}
                  char={char}
                  index={charIndex}
                  totalLength={spanPart.length}
                  scrollYProgress={scrollYProgress}
                  className="specialSpan"
                />
              ));
            }
          })}
          {lineIndex < lines.length - 1 && <br />}
        </Fragment>
      ))}
    </p>
  );
};