import { motion } from 'framer-motion';
import Link from 'next/link';
import { blur, translate } from '../../anim';
import { useEffect, useState } from 'react';

export default function Body({links, selectedLink, setSelectedLink}) {
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    useEffect(() => {
        // Instead of checking for touch capabilities, we'll use matchMedia to check for hover capabilities
        // This assumes devices that can hover and have a fine pointer (e.g., mouse) are not touch devices
        const match = window.matchMedia('(hover: hover) and (pointer: fine)');
        setIsTouchDevice(!match.matches); // If the media query doesn't match, it's likely a touch device
    }, []);

    console.log(isTouchDevice);

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

    const whichVariant = (index) => {
        if(isTouchDevice) {
            return {};
        }

        return selectedLink.isActive && selectedLink.index != index ? blur : {};
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
                        variants={whichVariant(index)} 
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
