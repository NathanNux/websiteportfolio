"use client";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { text, curve, translate } from './animations';

import { useLoad } from '@/context';

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
        exit: 'exit',
    };
};

export default function CurveTransition({ children }) {
    const router = useRouter();
    const [dimensions, setDimensions] = useState({ width: null, height: null });
    const { isLoading } = useLoad();

    useEffect(() => {
        function resize() {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }
        resize();
        window.addEventListener('resize', resize);
        return () => {
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <div className="pageCurveTransition">
            <div style={{ opacity: dimensions.width == null ? 1 : 0 }} className="background" />
            <motion.p className="route" {...anim(text)} style={{ scale: isLoading ? 1 : 0 }}>
                <span></span> {routes[router.pathname]}
            </motion.p>

            {dimensions.width != null && <SVG {...dimensions} />} {/* Only render SVG when dimensions are ready */}
            {children}
        </div>
    );
}

const SVG = ({ height, width }) => {
    const initialPath = `
        M0 300 
        Q${width / 2} 0 ${width} 300
        L${width} ${height + 300}
        Q${width / 2} ${height + 600} 0 ${height + 300}
        L0 0
    `;

    const targetPath = `
        M0 300
        Q${width / 2} 0 ${width} 300
        L${width} ${height}
        Q${width / 2} ${height} 0 ${height}
        L0 0
    `;

    return (
        <motion.svg
            {...anim(translate)}
            style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: `calc(100% + 600px)` }} // Keep SVG dimensions stable
        >
            <motion.path {...anim(curve(initialPath, targetPath))} />
        </motion.svg>
    );
};