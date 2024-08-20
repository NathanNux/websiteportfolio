import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { text, curve, translate } from './animations';
import debounce from 'lodash/debounce'; // Assuming lodash is installed


import styles from './style.module.scss'
import { useLoad } from '@/context';
import Image from 'next/image';

const routes = {
    '/': 'Domov',
    '/about': 'O mně',
    '/projects': 'Projekty',
    '/contact': 'Kontakt',
    '/materials': 'Materiály',
    '/ochrana-osobnich-udaju': 'Ochrana osobních údajů',
    '/cookies': 'Cookies',
    '/projects/components': 'Komponenty',
    '/projects/blog': 'Blog',
    '/projects/agency': 'Agentura',
    '/projects/bank': 'Banka',
    '/projects/car-app': 'Půjčovna Aut',
    '/projects/travel': 'Cestovní Web',
    '/projects/e-comm': 'E-commerce',
    '/projects/sushi': 'Sushi Restaurace',
    '/projects/smooth-scroll': 'Smooth Scroll',
    '/projects/restaurant': 'Restaurace',
    '/projects/nft': 'NFT Marketplace',
    '/projects/framer': 'Framer Website',
    '/projects/denis-clone': 'Portfolio DS',
    '/projects/brainwave': 'Brainwave',
    '/projects/3d-pc': '3D Portfolio',
    '/projects/3d-tee': '3D T-shirt',
    '/projects/3d-windmill': '3D Mlýn',
    '/projects/apple-site': 'Apple Web',

}

const anim = (variants) => {
    return {
        variants,
        initial: 'initial',
        animate: 'enter',
        exit: 'exit'
    }
}

const SVG = ({height, width}) => {

    const initialPath = `
        M0 300 
        Q${width/2} 0 ${width} 300
        L${width} ${height + 300}
        Q${width/2} ${height + 600} 0 ${height + 300}
        L0 0
    `

    const targetPath = `
        M0 300
        Q${width/2} 0 ${width} 300
        L${width} ${height}
        Q${width/2} ${height} 0 ${height}
        L0 0
    `

    return (
        <motion.svg {...anim(translate)}>
            <motion.path {...anim(curve(initialPath, targetPath))} />
        </motion.svg>
    )
}

export default function CurveTransition({children}) {
    const router = useRouter();
    const [dimensions, setDimensions] = useState({ width: null, height: null });
    const { isLoading, setIsLoading } = useLoad();


    const handleResize = useCallback(debounce(() => {
        setDimensions({
            width: window.innerWidth,
            height: window.innerHeight,
        });
    }, 250), [setDimensions]);

    useEffect(() => {
        handleResize(); // Initial resize to set dimensions
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [handleResize]);

    return (
        <div className={styles.pageCurve}>
            <div style={{ opacity: dimensions.width == null ? 1 : 0 }} className={styles.background}/>
            <motion.p className={styles.route} {...anim(text)} style={{scale: isLoading ? 1 : 0}}><span></span> {routes[router.pathname]}</motion.p>
            {dimensions.width != null && <SVG {...dimensions} />}
            {children}
        </div>
    );
}