import { useScroll, useTransform, motion } from "framer-motion";
import { Fragment, useRef } from "react";
import ButtonLink from "@/components/common/LinkButton/linkButton";
import { useLoad } from "@/context";


export default function Services() {
    const { isHomeCountry } = useLoad();
    const curve = useRef(null);

    const { scrollYProgress } = useScroll({
      target: curve,
      offset: ['start end', 'end start']
    });
  
    const height = useTransform(scrollYProgress, [0, 1], [800, 0]);

    const services = [
        {
            title: isHomeCountry ? 'Prodeje | Tvorba neodolatelné nabídky s výzkumem' : 'Sales | Crafting an Irresistible Offer with Research',
            content: isHomeCountry ? 'Provedu vás postupy, které skutečně fungují, abychom vytvořili nabídku, u které vaši zákazníci budou mít pocit, že by byli hloupí, kdyby ji odmítli.<br/><br/> A budu se tomu věnovat, dokud nenajdu tu nejlepší verzi, která bude přinášet výsledky.' : "I'll guide you through the strategies that actually work so we can craft an offer your customers will feel foolish to turn down.<br/><br/> I won't stop until we land on the winning variation that drives results."
        },
        {
            title: isHomeCountry ? 'Vývoj Webu | Od nápadu po hotový produkt' : 'Web Development | From Concept to Completion',
            content: isHomeCountry ? 'Navrhnu a vytvořím vám autentický, profesionální web, který bude reprezentovat to, kdo jste a co děláte.<br/><br/> Strávím s vámi potřebný čas, abych opravdu pochopil vaši značku a potřeby.' : "I'll design and build an authentic, professional website that truly reflects who you are and what you do.<br/><br/> I'll spend the necessary time with you to fully understand your brand and needs."
        },
        {
            title: isHomeCountry ? 'SEO | Nejen správa, ale i detailní analýza' : 'SEO | More Than Just Management – Detailed Analysis Included',
            content: isHomeCountry ? 'Veškerou údržbu a reporty ohledně webu dostanete jako součást mého ekosystému Zdarma.<br/><br/> Zajistím, aby vaše metriky byly alespoň na 90 % ve třech klíčových oblastech. Dokonalost je standard.' : "You'll get all site maintenance and reports free as part of my ecosystem.<br/><br/> I'll ensure your website metrics hit at least 90% in all three key areas. Excellence is the baseline."
        }
    ]
    
    const header1 = [
        {
            text: isHomeCountry ? "Mohu Vám pomoci s..." : "Here's How I Can Help..."
        }
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
            <motion.div ref={curve} layout className="svgContainer">
                <motion.div style={{ height }} layout className="svgDiv"></motion.div>
            </motion.div>
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
                <motion.div className="braker" style={{width}} layout></motion.div>
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
    return <motion.span style={{opacity}} layout>{char}</motion.span>;
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