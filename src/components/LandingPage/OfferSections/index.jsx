import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Section from '@/components/common/Sections'

//LOREM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISCING ELIT. PROIN IN ERAT LIGULA. VESTIBULUM ELEMENTUM EX ET TELLUS MALESUADA, QUIS CONSECTETUR ORCI CONSECTETUR. VESTIBULUM VOLUTPAT, EST SOLICITUDIN POSUERE CONGUE, AUGUE AUGUE DAPIBUS ENIM, A MAXIMUS NUNC EX EGET DUI. PRAESENT ID VENENATIS QUAM, A EFFICITUR LEO. QUISQUE MAURIS MAGNA, MOLLIS A PHARETRA SED, PLACERAT AUCTOR NISI. ETIAM BIBENDUM NEQUE SIT AMET MI TEMPUS, ID ULLAMCORPER URNA ULTRICIES. PELLENTESQUE VOLUTPAT MASSA AT TORTOR MATTIS, ID SAGITTIS EST FEUGIAT.
//Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin in erat ligula. Vestibulum elementum ex et tellus malesuada, quis consectetur orci consectetur. Vestibulum volutpat, est sollicitudin posuere congue, augue augue dapibus enim, a maximus nunc ex eget dui. Praesent id venenatis quam, a efficitur leo. Quisque mauris magna, mollis a pharetra sed, placerat auctor nisi. Etiam bibendum neque sit amet mi tempus, id ullamcorper urna ultricies. Pellentesque volutpat massa at tortor mattis, id sagittis est feugiat.

const sections = [
    {
        images: [
            {   
                src:'/assets/images/slider-la/color-pallet.webp',
                path: '/assets/images/slider-la/videos/color.webm',
                alt: "A beautiful landscape",
                app: "A beautiful landscape"
            },
            {
                src:"/assets/images/projects/smoothscroll.webp",
                alt: "A beautiful landscape"
            },
            {
                src:'/assets/images/slider-la/coding.webp',
                path: '/assets/a-footage/gsap-all.webm',
                alt: "A beautiful landscape",
                app: "A beautiful landscape"
            }
        ],
        phrases:[
            {
                //LOREM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISCING ELIT. PROIN IN ERAT LIGULA. VESTIBULUM ELEMENTUM EX ET TELLUS MALESUADA, QUIS CONSECTETUR ORCI CONSECTETUR. VESTIBULUM VOLUTPAT, EST SOLICITUDIN POSUERE CONGUE, AUGUE AUGUE DAPIBUS ENIM, A MAXIMUS NUNC EX EGET DUI. PRAESENT ID VENENATIS QUAM, A EFFICITUR LEO. QUISQUE MAURIS MAGNA, MOLLIS A PHARETRA SED, PLACERAT AUCTOR NISI. ETIAM BIBENDUM NEQUE SIT AMET MI TEMPUS, ID ULLAMCORPER URNA ULTRICIES. PELLENTESQUE VOLUTPAT MASSA AT TORTOR MATTIS, ID SAGITTIS EST FEUGIAT.
                //Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin in erat ligula. Vestibulum elementum ex et tellus malesuada, quis consectetur orci consectetur. Vestibulum volutpat, est sollicitudin posuere congue, augue augue dapibus enim, a maximus nunc ex eget dui. Praesent id venenatis quam, a efficitur leo. Quisque mauris magna, mollis a pharetra sed, placerat auctor nisi. Etiam bibendum neque sit amet mi tempus, id ullamcorper urna ultricies. Pellentesque volutpat massa at tortor mattis, id sagittis est feugiat.

                text: "Znám vše, co se týká dobrého designu, a někdy i rád porušuji jeho providla, protože tu jsou od toho, aby se porušovala.<br /><br />Správný Layout? Paleta Barev? CTA? Pokročilé animace s malým načítacím časem?<br /><br />Máte to mít!"
            },
            {
                text: "Design je základ tohoto ekosystému, originální kábát a profesionální online vizitka pro vaše nové a stálé zákazníky.<br /><br />38% návštěvníků opustí web, pokud nebude mít dobrý design. 88% z nich se už nevrátí. To je realita."
            }
        ]
    },
    {
        images: [
            {   
                path: '/assets/images/slider-la/videos/offer.webm',
                src: "/assets/images/slider-la/performance.webp",
                alt: "A beautiful landscape",
                app: "A beautiful landscape"
            },
            {
                src:"/assets/images/slider-la/performance.webp",
                alt: "A beautiful landscape"
            },
            {
                path: '/assets/images/slider-la/videos/research.webm',
                src: "/assets/images/slider-la/performance.webp",
                alt: "A beautiful landscape",
                app: 'A beautiful landscape'
            }
        ],
        phrases: [
            {
                //LOREM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISCING ELIT. PROIN IN ERAT LIGULA. VESTIBULUM ELEMENTUM EX ET TELLUS MALESUADA, QUIS CONSECTETUR ORCI CONSECTETUR. VESTIBULUM VOLUTPAT, EST SOLICITUDIN POSUERE CONGUE, AUGUE AUGUE DAPIBUS ENIM, A MAXIMUS NUNC EX EGET DUI. PRAESENT ID VENENATIS QUAM, A EFFICITUR LEO. QUISQUE MAURIS MAGNA, MOLLIS A PHARETRA SED, PLACERAT AUCTOR NISI. ETIAM BIBENDUM NEQUE SIT AMET MI TEMPUS, ID ULLAMCORPER URNA ULTRICIES. PELLENTESQUE VOLUTPAT MASSA AT TORTOR MATTIS, ID SAGITTIS EST FEUGIAT.
                //Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin in erat ligula. Vestibulum elementum ex et tellus malesuada, quis consectetur orci consectetur. Vestibulum volutpat, est sollicitudin posuere congue, augue augue dapibus enim, a maximus nunc ex eget dui. Praesent id venenatis quam, a efficitur leo. Quisque mauris magna, mollis a pharetra sed, placerat auctor nisi. Etiam bibendum neque sit amet mi tempus, id ullamcorper urna ultricies. Pellentesque volutpat massa at tortor mattis, id sagittis est feugiat.

                text: "Budu s Vámi spolupracovat na vytvoření nabídky tak dobré, u které se budou vaši zákazníci cítít hloupě, když ji nevezmou.<br /><br /> Taky Vám ukážu důležité kroky o tom, jak něco takového dát dohromady:<br /><br /> Se Systémem, který je intuitivní, přímočarý a snadno zopakovatelný."
            },
            {
                text: "Mé weby jsou size hezké, ale bude to pro vás velký Náklad, když nebudete mít nabídku. Bez ni nic neprodáte.<br /><br /> To strácí celou pointu mít web. Web, který vypadá dobře, ale neumí prodat."
            }
        ]
    },
    {
        images: [
            {   
                path: '/assets/images/slider-la/videos/analytics.webm',
                src: "/assets/images/slider-la/performance.webp",
                alt: "A beautiful landscape",
                app: "A beautiful landscape"
            },
            {
                src: "/assets/images/slider-la/coding.webp",
                alt: "A beautiful landscape"
            },
            {
                path: '/assets/images/slider-la/videos/visualization.webm',
                src: "/assets/images/slider-la/seo.webp",
                alt: "A beautiful landscape",
                app: 'A beautiful landscape'
            }
        ],
        phrases: [
            {
                //LOREM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISCING ELIT. PROIN IN ERAT LIGULA. VESTIBULUM ELEMENTUM EX ET TELLUS MALESUADA, QUIS CONSECTETUR ORCI CONSECTETUR. VESTIBULUM VOLUTPAT, EST SOLICITUDIN POSUERE CONGUE, AUGUE AUGUE DAPIBUS ENIM, A MAXIMUS NUNC EX EGET DUI. PRAESENT ID VENENATIS QUAM, A EFFICITUR LEO. QUISQUE MAURIS MAGNA, MOLLIS A PHARETRA SED, PLACERAT AUCTOR NISI. ETIAM BIBENDUM NEQUE SIT AMET MI TEMPUS, ID ULLAMCORPER URNA ULTRICIES. PELLENTESQUE VOLUTPAT MASSA AT TORTOR MATTIS, ID SAGITTIS EST FEUGIAT.
                //Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin in erat ligula. Vestibulum elementum ex et tellus malesuada, quis consectetur orci consectetur. Vestibulum volutpat, est sollicitudin posuere congue, augue augue dapibus enim, a maximus nunc ex eget dui. Praesent id venenatis quam, a efficitur leo. Quisque mauris magna, mollis a pharetra sed, placerat auctor nisi. Etiam bibendum neque sit amet mi tempus, id ullamcorper urna ultricies. Pellentesque volutpat massa at tortor mattis, id sagittis est feugiat.

                text: "Nabízím jednorázový balík, který Vám dá všechno, co potřebujete, a dokonce i to, o čem ani nevíte, že potřebujete. Je až tak komplexní práce.<br /><br /> Věnoval jsem mému umění už tísíce hodin, abych věděl, co to stojí, o co jde a jak to vyrešit tou nejsnažší cestou."
            },
            {
                text: "A jsem si natolik jistý, že jsem ochoten Vám vrátit pěníze a obětovat hordu času, pokud svou práci neodvedu tak dobře, jak vím, že ji umím odvést."
            }
        ]
    }
]


////////////////////////////////////////////////////////////////////////////////////////////////


export default function OfferSection () {
    const section = useRef(null)
    const { scrollYProgress } = useScroll({
        target: section,
        offset: ['start end', 'end start']
    })

    const height = useTransform(scrollYProgress, [0, 1], [30, 0])

    return (
        <section ref={section} className="offersLanding">
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