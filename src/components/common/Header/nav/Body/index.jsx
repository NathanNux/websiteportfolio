import { motion } from 'framer-motion';
import Link from 'next/link';
import styles from './style.module.scss';
import { blur, translate } from '../../anim';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function Body({links, selectedLink, setSelectedLink}) {

    const getChars = (word) => {
        let chars = [];
        word.split("").forEach( (char, i) => {
          chars.push(
            <motion.span 
                custom={[i * 0.02, (word.length - i) * 0.01]} 
                variants={translate} initial="initial" 
                animate="enter" 
                exit="exit" 
                key={char + i}>
                {char}
            </motion.span>
            )
        })
        return chars;
    }

    const pathname = usePathname();

    useEffect(() => {
        const timer = setTimeout(() => {
            window.scrollTo(0, 0);
        }, 1500)

        return () => {
            clearTimeout(timer);
        }
    }, [pathname])
    
    return (
        <div className={styles.body}>
        {
            links.map( (link, index) => {
                const { title, href } = link;
                return <Link key={`l_${index}`} href={href}>
                    <motion.p 
                        onMouseOver={() => {setSelectedLink({isActive: true, index})}} 
                        onMouseLeave={() => {setSelectedLink({isActive: false, index})}} 
                        variants={blur} 
                        animate={selectedLink.isActive && selectedLink.index != index ? "open" : "closed"}>
                        {getChars(title)}
                    </motion.p>
                </Link>
            })
        }
        </div>
    )
}
