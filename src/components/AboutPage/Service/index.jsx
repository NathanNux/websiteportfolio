import { useScroll, useTransform } from "framer-motion";
import { Fragment, useRef } from "react";
import { motion } from "framer-motion";

import styles from "./style.module.scss";
import ButtonLink from "@/components/ui/linkButton";


export default function Services() {

    return (
        <section className={styles.main}>
            <div className={styles.serviceContainer}>
                <div className={styles.mainText}>
                    {header1.map((header, i) => (
                        <Paragraph key={i} text={header.text} />
                    ))}
                </div>

                <div className={styles.services}>
                    {services.map((service, i) => (
                        <Service key={i} index={i} title={service.title} content={service.content}/>
                    ))}
                </div>

                <div className={styles.button} data-scroll data-scroll-speed={0.5}>
                    <ButtonLink title='Spojme se' href='/contact' className={styles.buttonLink}/>
                </div>
            </div>
        </section>
    )
}

const Service = ({title, content, index}) => {

    const section = useRef(null);
    const { scrollYProgress } = useScroll({
        target: section,
        offset: ['start 0.8', 'start 0.2']
    })
    const width = useTransform(scrollYProgress, [0, 1], ['0%', '80%'])

    return (
        <div className={styles.contentContainer} data-scroll data-scroll-speed={0.1 * (index + 5)}>
            <div className={styles.title}>
                <Paragraph text={title} />
            </div>

            <div className={styles.content} ref={section}>
                <motion.div className={styles.braker} style={{width}}></motion.div>
                <Paragraph text={content} />
            </div>
        </div>
    )
}

const services = [
    {
        title: 'SEO | ne pouze managament, ale i analýza',
        content: ' Správými praktiky, aby váš web byl co nejvýše na žebříčku. <br/><br/>A i konzultace a správa vašeho blogu,<br/> abyste se mohli pouze soustředit na to důležité, to co date vašim zákazníkům'
    },
    {
        title: 'Vývoj Webu | od návrhu po realizaci',
        content: 'Přijdu k vám a provnímám si Váš podnik. <br/><br/> To mi dá všechno co potřebuji Vám udělat autentický a unikátní Projekt.<br/> A i navázat nejen s Vámi dlouholetý vztahy s pořádnými benefity'
    },
    {
        title: 'Prodeje | vytvoření vaši nebídky i s výzkumem',
        content: 'Prodej je jedna z nedůležitějších aspektů Vůbec. <br/><br/> Vytvořím, umístím CTA a Vaši nabídku, pomůžu vám s průzkumem<br/> a vysvětlím Vám plán i strategii, pro ty Vaše nevyšší konverční poměry'
    }
]

const header1 = [
    {
        text: "Mohu Vám pomoci s..."
    },
];

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