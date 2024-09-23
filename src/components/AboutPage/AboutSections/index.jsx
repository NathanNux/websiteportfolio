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
                    text: isHomeCountry ? "Architetuře a lidskému vnímání se věnuji už přes půl dekády.<br /><br /> A to ne jenom díky učivu na střední a vysoký škole, ale i díky knihám od tich největších architektů svých dob, protože školní učivo mi prostě nestačilo." : "I have been studying architecture and human perception for over half a decade.<br /><br /> And not only thanks to the curriculum at high school and university, but also thanks to books from the greatest architects of their time, because the school curriculum was simply not enough for me."
                },
                {
                    text: isHomeCountry ? "Zároveň studováním životů těchto obrů <br /><br />mi dalo odhodlání a perspektivu, jak se<br />umělec může prosadit a najít v sobě tu duši, která ho dělá unikátním a nezaměnitelným." : "At the same time, studying the lives of these giants <br /><br />gave me determination and perspective on how an artist can succeed and find in himself the soul that makes him unique and unforgettable."
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
                    text: isHomeCountry ? "Od svých 14 let se učím o investování i makroekonomii.<br /><br /> I když to nesouvysí ani s web designem ani s architekturou, umění PRODEJE je prostě základ všeho v životě<br /><br /> A i přes to, že teď studuji 2 školy najednou, mám principy, které mi umožňují dělat všechny tyto věci najednou a stíhat je." : "Since I was 14, I have been learning about investing and macroeconomics.<br /><br /> Although it has nothing to do with web design or architecture, the art of SALES is simply the basis of everything in life.<br /><br /> And even though I am now studying 2 schools at once, I have principles that allow me to do all these things at once and keep up with them."
                },
                {
                    text: isHomeCountry ? "A ať si to z nás nikdo nechceme přiznat, zbydou po nás 2 věci: <br /><br />Naše Jméno a to jsme vybudovali pro ostatní.<br /><br />Tím si nás svět pamatuje a to je to, co nás dělá nezapomenutelnými." : "And let's not admit it, there are 2 things left of us: <br /><br />Our Name and what we have built for others.<br /><br />That's how the world remembers us and that's what makes us unforgettable."
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
                    text: isHomeCountry ? "Mým cílem je se věnovat náročným animacím pro výtvoření, unikátnosti ale jednoduchosti tvorby,<br /> kterou AI nikdy nebude schopno nahradit.<br /><br />Autenticita a vysoká úroveň kvality je to, co bude vždy mým cílem." : "My goal is to create complex animations for creation, uniqueness but simplicity of creation,<br /> which AI will never be able to replace.<br /><br />Authenticity and high quality is what will always be my goal."
                },
                {
                    text: isHomeCountry ? "I když se nezdá, umět psát účinné texty a vytvořit skvělou nabídku<br /> je mnohem těžší než tohle vše.<br /><br />Jména jako Sabri Suby nebo<br />  Alex Hormozi <br />mě naučily, jak dělat nabídky a texty, které pomáhají lidem a firem růst." : "Although it may not seem so, knowing how to write effective<br /> texts and create a great offer is much harder than all this.<br /><br />Names like Sabri Suby or<br />  Alex Hormozi <br />taught me how to make offers and texts that help people and companies grow."
                }
            ]
        }
    ]



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
