import { slideUp } from "@/components/anim";
import { motion } from 'framer-motion'
import ButtonLink from '@/components/common/LinkButton/linkButton'

export default function TopBar ({ name, service, year, style, price }) {
    return (
        <motion.section className="mainTopBarProjects" variants={slideUp} initial='initial' animate='enter'>
            <div className="bar">
                <div className="info">
                    <p>Klient</p>
                    <div className="devider"></div>
                    <p>{name}</p>
                </div>

                <div className="info">
                    <p>Služba</p>
                    <div className="devider"></div>
                    <p>{service}</p>
                </div>

                <div className="info">
                    <p>Rok Výroby</p>
                    <div className="devider"></div>
                    <p>{year}</p>
                </div>

                <div className="info">
                    <p>Styl</p>
                    <div className="devider"></div>
                    <p>{style}</p>
                </div>

                <div className="info">
                    <p>Cena</p>
                    <div className="devider"></div>
                    <p>{price}</p>
                </div>

            </div>
            
            <div className="buttonContainer" data-scroll data-scroll-speed={0.1}>
              <ButtonLink title='Navštívit' href='/projects' className="button"/>
            </div>
        </motion.section>
    )
}