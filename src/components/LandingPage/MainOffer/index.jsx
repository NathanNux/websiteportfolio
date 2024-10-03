import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import ButtonLink from '@/components/common/LinkButton/linkButton';
import CountdownTimer from './Timer';
import { useLoad } from '@/context';

export default function MainOffer() {
  const [delay, setDelay] = useState(false);
  const { isHomeCountry } = useLoad();
  const curve = useRef(null);

  const { scrollYProgress } = useScroll({
    target: curve,
    offset: ['start end', 'end start']
  });

  const height = useTransform(scrollYProgress, [0, 1], [800, 0]);

  const phrase1 = [
    {
      text: isHomeCountry
        ? "Finální nabídka - Berte, nebo nechte být"
        : "Final Offer—Take It or Leave It"
    },
    {
      text: isHomeCountry
        ? "Nepracuji s každým. Pokud nejste vážně odhodlaní růst, tohle není pro vás. Spolupracuji s těmi, kteří se nebojí dělat zásadní kroky. Pokud jste to vy, skvěle. Jsem připraven, kdykoliv budete vy."
        : "I don't work with everyone. If you're not serious about growing your business, this isn't for you. I work with action-takers, businesses ready to make serious moves. If that's you, great. I'm ready when you are."
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      setDelay(true);
    }, 1000);
  }, []);

  return (
    <section className="mainOffer__page">
      <div className='main__container'>
        <div className="textContainer" data-scroll data-scroll-speed={0.4}>
          {phrase1.map((phrase, i) => (
            <Paragraph key={i} text={phrase.text} />
          ))}
        </div>
        <div className="description">
          <p data-scroll data-scroll-speed={0.1} className="maintext">
            {isHomeCountry ? "Ale mám už jenom" : "But I've only got"}
            <br />
            <span className="specialSpan">1 {isHomeCountry ? "Místo" : "Spot"}</span>
            <br />
            <span>
              {isHomeCountry
                ? "než budu mít plný kalendář. Jakmile je plný, budete muset čekat celý rok, než dostanete další šanci."
                : "left before my calendar's full. Once I'm booked, you're going to have to wait full year to get another shot."}
            </span>
          </p>
          {delay && <CountdownTimer targetDate="2024-12-31T23:59:59" />}
          <p className="dateY">{isHomeCountry ? "Tak se zeptejte:" : "So ask yourself:"}</p>
          <p className="dateY">{isHomeCountry ? "Jak dlouho ještě budete odkládat svůj růst?" : "how much longer are you going to delay your growth?"}</p>
          <p className="text__button">{isHomeCountry ? "Klikněte níže a zajistěte si své místo a pojďme na to." : "Click below to lock in your spot, and let's get to work. "}</p>
          <div data-scroll data-scroll-speed={0.1} className="buttonContainer">
            <ButtonLink title={isHomeCountry ? 'Spojit se hned' : "Let's Connect Now"} href='/contact' className="button" />
          </div>
          <div className="textSales" data-scroll data-scroll-speed={0.1}>
            <p>
              {isHomeCountry ? "Stále váháte?" : "Still thinking?"}
              <br />
              {isHomeCountry ? "Každá minuta, kterou strávíte přemýšlením, je další prodej, který vám uniká." : "Every minute you spend debating is another sale slipping away."}
              <br />
              <br />
              <span>{isHomeCountry ? "Jak dlouho to ještě budete nechat být?" : "How long are you going to let that happen?"}</span>
            </p>
          </div>
        </div>
      </div>
        

      <motion.div ref={curve} className="svgContainer">
        <motion.div style={{ height }} className="svgDiv"></motion.div>
      </motion.div>
    </section>
  );
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
    offset: ['start 0.6', 'start 0.45']
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