import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Section from '@/components/common/Sections'

const sections = [
    {
        images: [
            {   
                src:'/assets/images/slider-la/color-pallet.png',
                path: '/assets/images/slider-la/videos/color.mp4',
                alt: "A beautiful landscape",
                app: "A beautiful landscape"
            },
            {
                src:"/assets/images/projects/smoothscroll.png",
                alt: "A beautiful landscape"
            },
            {
                src:'/assets/images/slider-la/coding.png',
                path: '/assets/a-footage/gsap-all.mp4',
                alt: "A beautiful landscape",
                app: "A beautiful landscape"
            }
        ],
        phrases:[
            {
                text: "Design není jen o hezkých a přeplácaných animací a pestrých barvách.<br /><br /> Je to umění sdělit příběh, příběh o tom, kdo jste za čem si stojíte a co můžete přinést do zákazníkova života.<br /><br /> Srozumitelně, čistě a jasně"
            },
            {
                text: "Každý projekt je testimoniálem mé dedikace, inovace a excelence"
            }
        ]
    },
    {
        images: [
            {   
                path: '/assets/images/slider-la/videos/offer.mp4',
                src: "/assets/images/slider-la/performance.png",
                alt: "A beautiful landscape",
                app: "A beautiful landscape"
            },
            {
                src:"/assets/images/slider-la/performance.png",
                alt: "A beautiful landscape"
            },
            {
                path: '/assets/images/slider-la/videos/research.mp4',
                src: "/assets/images/slider-la/performance.png",
                alt: "A beautiful landscape",
                app: 'A beautiful landscape'
            }
        ],
        phrases: [
            {
                text: "Je to sice težký a náročný proces vytvořit Parádní Nabídku, ale s mými jednoduchými a účinými systémy to zvládneme.<br /><br />Pomůžu vám s každým krokem k vytvoření  nabídky, která nastaví novou laťku nejenom pro Vás ale i pro vaše nové zákazníky."
            },
            {
                text: "A mé praktiky Vám i přenechám"
            }
        ]
    },
    {
        images: [
            {   
                path: '/assets/images/slider-la/videos/analytics.mp4',
                src: "/assets/images/slider-la/performance.png",
                alt: "A beautiful landscape",
                app: "A beautiful landscape"
            },
            {
                src: "/assets/images/slider-la/coding.png",
                alt: "A beautiful landscape"
            },
            {
                path: '/assets/images/slider-la/videos/visualization.mp4',
                src: "/assets/images/slider-la/seo.png",
                alt: "A beautiful landscape",
                app: 'A beautiful landscape'
            }
        ],
        phrases: [
            {
                text: "Je to sice težký a náročný proces vytvořit Parádní Nabídku, ale s mými jednoduchými a účinými systémy to zvládneme.<br /><br />Pomůžu vám s každým krokem k vytvoření  nabídky, která nastaví novou laťku nejenom pro Vás ale i pro vaše nové zákazníky."
            },
            {
                text: "A mé praktiky Vám i přenechám"
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