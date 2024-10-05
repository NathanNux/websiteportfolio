import Design from './Introduction'
import Sales from './StyleChoice'
import Services from './Services'
import { motion, useScroll, useTransform } from 'framer-motion'

import { useRef } from 'react'
import MobileView from './MobileView'


export default function Sections ({photos, section1, text1, section2, text2 }) {
    const section = useRef(null)
    const { scrollYProgress } = useScroll({
        target: section,
        offset: ['start end', 'end start']
    })

    const height = useTransform(scrollYProgress, [0, 1], [30, 0])

    return (
        <section ref={section} className="offersSectionMain">
            <div className="mainSections">
                <div className="main">
                    <Design images={section1} phrases={text1}/>
                </div>
                <div className="main">
                    <MobileView images={photos}/>
                </div>
                <div className="main">
                    <Sales images={section2} phrases={text2}/>
                </div>
                {/* <div className="main">
                    <Services />
                </div> */}
            </div>

            <motion.div style={{height}} layout className="svgContainer">
                <div className="svgDiv"></div>
            </motion.div>
        </section>
    )
} 