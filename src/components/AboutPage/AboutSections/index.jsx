import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

import Section from '@/components/common/Sections'
import { useLoad } from '@/context'


export default function OfferSection () {
    const section = useRef(null)
    const { scrollYProgress } = useScroll({
        target: section,
        offset: ['start end', 'end start']
    }) 
    const { isHomeCountry } = useLoad();

    const height = useTransform(scrollYProgress, [0, 1], [30, 0])

    const sections = [
        {
          images: [
            {
              src:'/images/done/casual.webp',
              alt: "A beautiful landscape",
              app: "A beautiful landscape"
            },
            {
              src:'/assets/images/slider-la/coding.webp',
              path: '/assets/about-footage/finished-projects-footage.webm',
              alt: "A beautiful landscape",
              app: "A beautiful landscape"
            },
            {
              src:"/images/about/sections/main-Sketch-Low.webp",
              alt: "A beautiful landscape"
            },
          ],
          phrases:[
            {
              text: isHomeCountry
                ? "Architektura a lidské vnímání mě přitahují už více než pět let.<br /><br /> Nejen díky škole, ale hlavně díky knihám od největších architektů historie. Škola mi prostě nestačila."
                : "I've been fascinated by architecture and human perception for over half a decade.<br /><br /> Not just through formal education, but also from diving deep into books by the greatest architects in history. School alone was never enough for me."
            },
            {
              text: isHomeCountry
                ? "Studium života těchto velikánů mi otevřelo oči. Naučil jsem se, jak prorazit a najít v sobě tu esenci, která tě dělá jedinečným a nezapomenutelným."
                : "Studying the lives of these giants gave me the drive and a fresh perspective on how to stand out and find that unique spark that makes you truly unforgettable."
            }
          ]
        },
        {
          images: [
            {
              src: "/images/done/chill.webp",
              alt: "A beautiful landscape",
              app: "A beautiful landscape"
            },
            {
              src:"/images/about/sections/bd-photo-1.webp",
              alt: "A beautiful landscape"
            },
            {
              path: '/assets/about-footage/archicad-drawing-session.webm',
              src: "/images/about/sections/first-floor.webp",
              alt: "A beautiful landscape",
              app: 'A beautiful landscape'
            }
          ],
          phrases: [
            {
              text: isHomeCountry
                ? "Od 14 let se věnuji investicím a makroekonomii.<br /><br /> I když to nesouvisí přímo s web designem nebo architekturou, umění prodeje je základem úspěchu.<br /><br /> I když studuji dvě školy najednou, díky zavedeným principům zvládám všechno."
                : "Since the age of 14, I’ve been learning about investing and macroeconomics.<br /><br /> While it doesn’t directly tie into web design or architecture, the art of sales is the foundation of success.<br /><br /> Even though I’m juggling two schools, I’ve developed principles that allow me to handle everything."
            },
            {
              text: isHomeCountry
                ? "Po každém z nás zůstanou dvě věci: naše jméno a to, co jsme vybudovali pro druhé.<br /><br /> To je to, co po nás svět bude pamatovat a co nás činí nezapomenutelnými."
                : "We leave behind two things: our Name and what we’ve built for others.<br /><br /> That’s how the world remembers us. That’s what makes us unforgettable."
            }
          ]
        },
        {
          images: [
            {
              src: "/assets/images/slider-la/seo.webp",
              path: '/assets/a-footage/gsap-all.webm',
              alt: "A beautiful landscape",
              app: 'A beautiful landscape'
            },
            {
              path: 'assets/about-footage/programing-session-mid.webm',
              src: "/assets/images/slider-la/performance.webp",
              alt: "A beautiful landscape",
              app: "A beautiful landscape"
            },
            {
              src: "/images/done/thoughts.webp",
              alt: "A beautiful landscape"
            }
          ],
          phrases: [
            {
              text: isHomeCountry
                ? "Mým cílem je vytvářet složité animace, které přináší jedinečnost a jednoduchost tvorby.<br /> To je něco, co AI nikdy nebude schopno nahradit.<br /><br /> Autenticita a vysoká kvalita jsou mé priority."
                : "My goal is to create intricate animations that bring both uniqueness and simplicity to the creative process.<br /> This is something AI will never fully replicate.<br /><br /> Authenticity and high quality will always be my goals."
            },
            {
              text: isHomeCountry
                ? "Psaní efektivních textů a tvorba skvělých nabídek je často náročnější než samotná technická práce.<br /><br /> Jména jako Sabri Suby a Alex Hormozi mě naučily, jak tvořit nabídky, které pomáhají růst firmám i jednotlivcům."
                : "Writing effective copy and crafting great offers is often tougher than any technical work.<br /><br /> Influencers like Sabri Suby and Alex Hormozi have taught me how to create offers and content that help people and companies grow."
            }
          ]
        }
    ];      



    return (
        <section ref={section} className="offersAbout">
            <div className="mainSections">
                <div className="main">
                    {sections.map((section, i) => (
                        <Section key={i} images={section.images} phrases={section.phrases}/>
                    ))}
                </div>
            </div>

            <motion.div style={{height}} className="svgContainer">
                <div className="svgDiv"></div>
            </motion.div>
        </section>
    )
} 



// const sections = [
//     {
//         images: [
//             {   
//                 src:'/images/about/sections/main-Sketch-Low.webp',
//                 alt: "A beautiful landscape",
//                 app: "A beautiful landscape"
//             },
//             {
//                 src:'/assets/images/slider-la/coding.webp',
//                 path: '/assets/about-footage/finished-projects-footage.webm',
//                 alt: "A beautiful landscape",
//                 app: "A beautiful landscape"
//             },
//             {
//                 src:"/images/about/sections/slider-code.webp",
//                 alt: "A beautiful landscape"
//             },
//         ],
//         phrases:[
//             {
//                 text: "Sport je co mi dalo spolehlivost, stres management, disciplínu, dochvilnost a vytrvalost.<br /><br />Už od svých 5ti letech jsem byl součástí basketu, to se se mnou držeho až na střední, kde jsem sport proměnil v kondiční a fyzické cvičení. Krátce Posilovna :)"
//             },
//             {
//                 text: "Koukat za hranice běžného myšlení. <br /><br />Má hlavní idea, vše je spojeno i netradičním pohledem na zónu komfortu,<br /> které se tedy opravdu nedržím a to mi umožňuje mít unikátní pohled a nápady."
//             }
//         ]
//     },
//     {
//         images: [
//             {   
//                 src: "/images/about/sections/mid-Sketch-Low.webp",
//                 alt: "A beautiful landscape",
//                 app: "A beautiful landscape"
//             },
//             {
//                 src:"/images/about/sections/bd-photo-1.webp",
//                 alt: "A beautiful landscape"
//             },
//             {
//                 path: '/assets/about-footage/archicad-drawing-session.webm',
//                 src: "/images/about/sections/first-floor.webp",
//                 alt: "A beautiful landscape",
//                 app: 'A beautiful landscape'
//             }
//         ],
//         phrases: [
//             {
//                 text: "Má Láska pro kreativitu se prvně probudila až na střední škole. <br /><br />Jednoduché skeče se proměnily v dlouhé hodiny studie lidského vnímání a nespočet půjčených knih o kompozici a psychologii. <br /><br />Cit pro barvy a tvary byly pak jen součástí, společně s větším klidem v mysli, číst chování a charakter lidí pro mě začalo být automatický. "
//             },
//             {
//                 text: "S hlubší pochopením, po čem lidé touží a to jak většina nás přemýšlí jsem začal pozorovat i to ,co většina bere za automatické návyky, jak špatné, tak i ty správné. <br /><br />Jsme takový datasety pro lidi s vyšším zájmem ultímátního pochopení. V margetingu se tohle pěkně hodí."
//             }
//         ]
//     },
//     {
//         images: [
//             {
//                 src: "/images/about/sections/slider-code.webp",
//                 alt: "A beautiful landscape"
//             },  
//             {   
//                 path: 'assets/about-footage/programing-session-mid.webm',
//                 src: "/assets/images/slider-la/performance.webp",
//                 alt: "A beautiful landscape",
//                 app: "A beautiful landscape"
//             },
//             {
//                 src: "/assets/images/slider-la/seo.webp",
//                 path: '/assets/a-footage/gsap-all.webm',
//                 alt: "A beautiful landscape",
//                 app: 'A beautiful landscape'
//             }
//         ],
//         phrases: [
//             {
//                 text: "Narozdíl od kreslícího prkna, programování mi dává svobodu svoji kreaci vidět ihned.<br /> Má ale svou cenu, je to náročný a komplexní jazyk, podobný tomu, kterým mluvíme. <br /><br />A hodně matematiky při vývoji animací a spoustu logického myšlení s kopou představivosti"
//             },
//             {
//                 text: "To se tak stalo mým zájmem, dělat tento jazyk jednoduchý i pro ostatní,<br /> aby mohli spolu se mnou prožívat to, co jsem vytvořil a co jim mohu dát. <br /><br />Toto je můj Plán a Můj Příběh...<br /> Teď něco co Pro Vás mohu udělat."
//             }
//         ]
//     }
// ]
