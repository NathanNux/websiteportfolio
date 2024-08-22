import { translate } from '../../anim';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Footer() {
    const date = new Date();
    const options = { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Europe/Prague', timeZoneName: 'short' };
    let timeString = date.toLocaleTimeString('en-US', options);

    // Replace GMT+1 with CET and GMT+2 with CEST / copilot
    timeString = timeString.replace('GMT+1', 'CET').replace('GMT+2', 'CEST');

    return (
        <section className="footerHeader">
            <div className="info">
               <ul>
                    <motion.li 
                        custom={[0.3, 0]} 
                        variants={translate} initial="initial" 
                        animate="enter" 
                        exit="exit"
                    >
                        <span>Verze</span>
                        <p> 2024 © Edice</p>
                    </motion.li>
                </ul>
                <ul>
                    <motion.li  
                        custom={[0.3, 0]} 
                        variants={translate} initial="initial" 
                        animate="enter" 
                        exit="exit"
                    >   
                        <span>Místní čas:</span>
                        <p>{timeString}</p>                    
                    </motion.li>
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
