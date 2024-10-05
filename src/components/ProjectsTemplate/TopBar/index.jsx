import { slideUp } from "@/components/anim";
import { motion } from 'framer-motion'
import ButtonLink from '@/components/common/LinkButton/linkButton'
import { useLoad } from "@/context";

export default function TopBar ({ name, service, year, style, price }) {
    const { isHomeCountry } = useLoad();

    return (
        <motion.section layout className="mainTopBarProjects" variants={slideUp} initial='initial' animate='enter'>
            <div className="bar">
                <div className="info">
                    <p>{ isHomeCountry ? "Klient" : "Client"}</p>
                    <div className="devider"></div>
                    <p>{name}</p>
                </div>

                <div className="info">
                    <p>{ isHomeCountry ? "Služba" : "Service"}</p>
                    <div className="devider"></div>
                    <p>{service}</p>
                </div>

                <div className="info">
                    <p>{ isHomeCountry ? "Rok Výroby" : "Year"}</p>
                    <div className="devider"></div>
                    <p>{year}</p>
                </div>

                <div className="info">
                    <p>{ isHomeCountry ? "Styl" : "Style"}</p>
                    <div className="devider"></div>
                    <p>{style}</p>
                </div>

                <div className="info">
                    <p>{ isHomeCountry ? "Cena" : "Price"}</p>
                    <div className="devider"></div>
                    <p>{price}</p>
                </div>

            </div>
            
            <div className="buttonContainer" data-scroll data-scroll-speed={0.1}>
              <ButtonLink title={ isHomeCountry ? 'Navštívit' : "Visit"} href='/projects' className="button"/>
            </div>
        </motion.section>
    )
}