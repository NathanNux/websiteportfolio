import { useScroll, useTransform } from "framer-motion";
import { Fragment, useRef } from "react";
import { motion } from "framer-motion";

import ButtonLink from "@/components/common/LinkButton/linkButton";
import { useLoad } from "@/context";


export default function Services() {
    const { isHomeCountry } = useLoad();

    const services = [
        {
            title: isHomeCountry ? 'Prodeje | vytvoření vaši nebídky i s výzkumem' : 'Sales | creating your offer with research',
            content: isHomeCountry ? 'Ukážu Vám postupy a proč fungují, abychom mohli vytvořit nabídku, u které se budou vaši zákazníci cítit hloupě, když ji nepřijmou.<br/><br/> A budu se tomu věnovat, dokud nenajdu tu nejlepší variaci, která bude fungovat.' : 'I will show you the principles and why they work, so we can create an offer that will make your customers feel stupid if they don\'t accept it.<br/><br/> And I will focus on it until I find the best variation that will work.'
        },
        {
            title: isHomeCountry ? 'Vývoj Webu | od návrhu po realizaci' : 'Web Development | from design to implementation',
            content: isHomeCountry ? 'Vyvinu a vytvořím Vám autentickou a profesionální Online Vizitku.<br/><br/> Strávím s Vámi několik hodin, abych dostal pochopení jak funugujete o čem jste a co děláte.' : 'I will develop and create you an authentic and professional Online Business Card.<br/><br/> And spend a few hours with you to get an understanding of how you work, what you are about and what you do.'
        },
        {
            title: isHomeCountry ? 'SEO | ne pouze managament, ale i analýza' : 'SEO | not only management, but also analysis',
            content: isHomeCountry ? 'Všechnu údržbu webu a i týdenní nebo měsíční informace dělám Zdarma jako součástí mého ekosystému.<br/><br/> Za účelem zlepšení metrik vašeho webu alespoň nad 90% 3 hlavních kvalit. Pouze perfektní kvalita je dostatečná.<br/><br/> Aby byl váš web rychlý a efektivní a vybraný internetovými prohlížeči.' : 'I do all the website maintenance and weekly or monthly report for Free as part of my ecosystem.<br/><br/> And have your website metrics atleast at 90% in all 3 main qualities. Only the perfect quality is good enough.<br/><br/> So your website is fast and effective and chosen by internet browsers.'
        }
    ]
    
    const header1 = [
        {
            text: isHomeCountry ? "Mohu Vám pomoci s..." : "I can help you with..."
        },
    ];

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