import { slideUp } from "@/components/anim";
import styles from './style.module.scss'
import { motion } from 'framer-motion'
import ButtonLink from '@/components/common/LinkButton/linkButton'

export default function TopBar ({ name, service, year, style, price }) {
    return (
        <motion.section className={styles.main} variants={slideUp} initial='initial' animate='enter'>
            <div className={styles.bar}>
                <div className={styles.info}>
                    <p>Klient</p>
                    <div className={styles.devider}></div>
                    <p>{name}</p>
                </div>

                <div className={styles.info}>
                    <p>Služba</p>
                    <div className={styles.devider}></div>
                    <p>{service}</p>
                </div>

                <div className={styles.info}>
                    <p>Rok Výroby</p>
                    <div className={styles.devider}></div>
                    <p>{year}</p>
                </div>

                <div className={styles.info}>
                    <p>Styl</p>
                    <div className={styles.devider}></div>
                    <p>{style}</p>
                </div>

                <div className={styles.info}>
                    <p>Cena</p>
                    <div className={styles.devider}></div>
                    <p>{price}</p>
                </div>

            </div>
            
            <div className={styles.buttonContainer} data-scroll data-scroll-speed={0.1}>
              <ButtonLink title='Navštívit' href='/projects' className={styles.button}/>
            </div>
        </motion.section>
    )
}