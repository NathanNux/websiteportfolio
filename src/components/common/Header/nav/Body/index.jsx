import { motion } from 'framer-motion';
import Link from 'next/link';
import { blur, translate } from '../../anim';
import { useEffect, useState } from 'react';

export default function Body({links, selectedLink, setSelectedLink}) {
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    useEffect(() => {
        // Check for touch event handlers
        const touchCapable = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
        setIsTouchDevice(touchCapable);
    }, []);

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
    
    return (
        <div className="bodyHeader">
        {
            links.map( (link, index) => {
                const { title, href } = link;
                return <Link key={`l_${index}`} href={href}>
                    <motion.p 
                        onMouseOver={() => {setSelectedLink({isActive: true, index})}} 
                        onMouseLeave={() => {setSelectedLink({isActive: false, index})}} 
                        variants={ isTouchDevice ? {} : {blur}} 
                        animate={selectedLink.isActive && selectedLink.index != index ? "open" : "closed"}
                        >
                        {getChars(title)}
                    </motion.p>
                </Link>
            })
        }
        </div>
    )
}
