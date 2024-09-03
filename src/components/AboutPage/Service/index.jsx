import { useScroll, useTransform } from "framer-motion";
import { Fragment, useRef } from "react";
import { motion } from "framer-motion";

import ButtonLink from "@/components/common/LinkButton/linkButton";


export default function Services() {

    return (
        <section className="mainServiceAbout">
            <div className="serviceContainer">
                <div className="mainText">
                    {header1.map((header, i) => (
                        <Paragraph key={i} text={header.text} />
                    ))}
                </div>

                <div className="services">
                    {services.map((service, i) => (
                        <Service key={i} index={i} title={service.title} content={service.content}/>
                    ))}
                </div>

                <div className="button" data-scroll data-scroll-speed={0.5}>
                    <ButtonLink title='Spojme se' href='/contact' className="buttonLink"/>
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
        <div className="contentContainer" data-scroll data-scroll-speed={0.1 * (index + 5)}>
            <div className="title">
                <Paragraph text={title} />
            </div>

            <div className="content" ref={section}>
                <motion.div className="braker" style={{width}}></motion.div>
                <Paragraph text={content} />
            </div>
        </div>
    )
}

const services = [
    //LOREM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISCING ELIT. PROIN IN ERAT LIGULA. VESTIBULUM ELEMENTUM EX ET TELLUS MALESUADA, QUIS CONSECTETUR ORCI CONSECTETUR. VESTIBULUM VOLUTPAT, EST SOLICITUDIN POSUERE CONGUE, AUGUE AUGUE DAPIBUS ENIM, A MAXIMUS NUNC EX EGET DUI. PRAESENT ID VENENATIS QUAM, A EFFICITUR LEO. QUISQUE MAURIS MAGNA, MOLLIS A PHARETRA SED, PLACERAT AUCTOR NISI. ETIAM BIBENDUM NEQUE SIT AMET MI TEMPUS, ID ULLAMCORPER URNA ULTRICIES. PELLENTESQUE VOLUTPAT MASSA AT TORTOR MATTIS, ID SAGITTIS EST FEUGIAT.
//Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin in erat ligula. Vestibulum elementum ex et tellus malesuada, quis consectetur orci consectetur. Vestibulum volutpat, est sollicitudin posuere congue, augue augue dapibus enim, a maximus nunc ex eget dui. Praesent id venenatis quam, a efficitur leo. Quisque mauris magna, mollis a pharetra sed, placerat auctor nisi. Etiam bibendum neque sit amet mi tempus, id ullamcorper urna ultricies. Pellentesque volutpat massa at tortor mattis, id sagittis est feugiat.
    {
        title: 'Prodeje | vytvoření vaši nebídky i s výzkumem',
        content: 'Ukážu Vám postupy a proč fungují, abychom mohli vytvořit nabídku, u které se budou vaši zákazníci cítit hloupě, když ji nepřijmou.<br/><br/> A budu se tomu věnovat, dokud nenajdu tu nejlepší variaci, která bude fungovat.'
    },
    {
        title: 'Vývoj Webu | od návrhu po realizaci',
        content: 'Vyvinu a vytvořím Vám autentickou a profesionální Online Vizitku.<br/><br/> Strávím s Vámi několik hodin, abych dostal pochopení jak funugujete o čem jste a co děláte.'
    },
    {
        title: 'SEO | ne pouze managament, ale i analýza',
        content: 'Všechnu údržbu webu a i týdenní nebo měsíční informace dělám Zdarma jako součástí mého ekosystému.<br/><br/> Za účelem zlepšení metrik vašeho webu alespoň nad 90% u všech kvalit.<br/><br/> Aby byl váš web rychlý a efektivní a vybraný internetovými prohlížeči.'
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