import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { text, curve, translate } from './animations';

import styles from './style.module.scss'

const routes = {
    '/': 'Domov',
    '/about': 'O mně',
    '/projects': 'Projekty',
    '/contact': 'Kontakt',
    '/materials': 'Materiály',
    '/ochrana-osobnich-udaju': 'Ochrana osobních údajů',
    '/cookies': 'Cookies'
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

export default function CurveTransition({children, backgroundColor}) {
  const router = useRouter();
    const [ dimensions, setDimensions ] = useState({ width: null, height: null });

    useEffect(() => {
        function resize() {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight
            })
        }
        resize();
        window.addEventListener('resize', resize);
        return () => window.removeEventListener('resize', resize);
    }, [])

  return (
    <div className={styles.pageCurve} style={{backgroundColor}}>
        <div style={{opacity: dimensions.width == null ? 1 : 0}} className={styles.background}/>
        <motion.p className={styles.route} {...anim(text)}>
            {routes[router.pathname]}
        </motion.p>
        {dimensions.width != null && <SVG {...dimensions} />}
        {children}
    </div>
  )
}