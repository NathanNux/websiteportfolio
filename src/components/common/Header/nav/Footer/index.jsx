import { useLoad } from '@/context';
import { translate } from '../../anim';
import { motion } from 'framer-motion';
import Link from 'next/link';
import TimeComponent from '@/components/common/TimeComponent';

export default function Footer() {
    const { isHomeCountry } = useLoad()
    return (
        <section className="footerHeader">
            <div className="info">
               <ul>
                    { isHomeCountry ? (
                        <motion.li 
                            custom={[0.3, 0]} 
                            variants={translate} initial="initial" 
                            animate="enter" 
                            exit="exit"
                        >
                            <span>Verze:</span>
                            <p> 2024 © Edice</p>
                        </motion.li>
                    ) : (
                        <motion.li 
                            custom={[0.3, 0]} 
                            variants={translate} initial="initial" 
                            animate="enter" 
                            exit="exit"
                        >
                            <span>Version:</span>
                            <p> 24 © Edition</p>
                        </motion.li>
                    )}
                </ul>
                <ul>
                    { isHomeCountry ? (
                        <motion.li  
                            custom={[0.3, 0]} 
                            variants={translate} initial="initial" 
                            animate="enter" 
                            exit="exit"
                        >   
                            <span>Místní čas:</span>
                            <p><TimeComponent isHomeCountry={isHomeCountry} /></p>                    
                        </motion.li>
                    ) : (
                        <motion.li  
                            custom={[0.3, 0]} 
                            variants={translate} initial="initial" 
                            animate="enter" 
                            exit="exit"
                        >   
                            <span>Current time:</span>
                            <p><TimeComponent isHomeCountry={isHomeCountry} /></p>                    
                        </motion.li>
                    )}
                </ul> 
            </div>
            <div className="terms">
                <ul>
                    <motion.li
                        custom={[0.3, 0]} 
                        variants={translate} initial="initial" 
                        animate="enter" 
                        exit="exit">
                        <Link href='/ochrana-osobnich-udaju'>Privacy Policy</Link>
                    </motion.li>
                    <motion.li 
                        custom={[0.3, 0]} 
                        variants={translate} initial="initial" 
                        animate="enter" 
                        exit="exit">
                        <Link href='/cookies'>Cookies</Link>
                    </motion.li>
                </ul>
            </div>
            
        </section>
    )
}
