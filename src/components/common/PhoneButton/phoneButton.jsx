import { useToast } from "../../ui/use-toast";
import { motion } from 'framer-motion';
import { useState } from "react";
import { scale } from "@/components/anim";

import styles from './phoneButton.module.scss'

export default function PhoneButton() {
    const [ isHovered, setIsHovered ] = useState(false);

    const { toast } = useToast();

    return (
        <div className={styles.button} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            {/* This is now a button that either opens the calling app on mobile or lets them copy the phone number on a click */}
            <a href="tel:+420777157476" onClick={(e) => {
                if (!navigator.userAgent.match(/mobile/i)) {
                    e.preventDefault();
                    navigator.clipboard.writeText('+420777157476').then(() => {
                        toast({
                            description: 'Telefonní číslo bylo zkopírováno do schránky',
                            status: 'success',
                            duration: 5000,
                            isClosable: true,
                        });
                    }, (err) => {
                        console.error('Could not copy text: ', err);
                    });
                }
            }}>
                <p>
                    Tel: +420 777 157 476
                </p>
            </a>
            <motion.div className={styles.dot} variants={scale} initial='initial' animate={isHovered ? 'enter' : 'exit'}></motion.div>
        </div>
    )
}