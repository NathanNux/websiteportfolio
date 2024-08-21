import React, { Fragment, use, useEffect, useRef, useState } from 'react'
import styles from './style.module.scss'
import { useScroll, useTransform, motion } from 'framer-motion';
import ButtonLink from '@/components/common/LinkButton/linkButton';
import CountdownTimer from './Timer';

const phrase1 = [
    {
        text: "Můj čas je limitovaný, a mohu přinést tu nejlepší kvalitu <br/> jen pár z Vás každým rokem. <br/><br/>Kontaktujte mě proto hned teď. Je možný, že se na Vás potom, <br/> co odejdete, už nedostane."
    },
];


export default function MainOffer () {
  const [ delay, setDelay ] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setDelay(true);
    }, 1000);
  }, []);

  return (
    <section className={styles.main}>
        <div className={styles.textContainer} data-scroll data-scroll-speed={0.4}>
            {phrase1.map((phrase, i) => (
                <Paragraph key={i} text={phrase.text} />
            ))}
        </div>
        <div className={styles.description}>
            <p data-scroll data-scroll-speed={0.1} className={styles.maintext}>Mohu přijmout ještě<br/><span className={styles.specialSpan}>3</span><br/><span>Nové klienty</span></p>
            <p className={styles.dateY}>Do roku 2025</p>
            {/* there was an issue with the time on the server side and client side -> weren't same*/}
           { delay && <CountdownTimer targetDate="2024-12-31T23:59:59"/>}
            <div data-scroll data-scroll-speed={0.1} className={styles.buttonContainer}>
              <ButtonLink title='Chci se Spojit Ihned' href='/contact' className={styles.button}/>
            </div>
            
            <div className={styles.textSales} data-scroll data-scroll-speed={0.1}>
                <p>A když má práce nesplní Vaše požadavky, <br/> vrátím Vám všechny peníze do poslední kačky.<br/> A nechám Vám navíc celý projekt zdarma. <br/><br/> <span > Bez žádných otázek.</span></p>
            </div>
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
        <React.Fragment key={lineIndex}>
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
                  className={styles.specialSpan}
                />
              ));
            }
          })}
          {lineIndex < lines.length - 1 && <br />}
        </React.Fragment>
      ))}
    </p>
  );
};