import React from 'react'
import { motion } from 'framer-motion';
import Image from 'next/image';
import { opacity } from '../../anim';

export default function Index({src, isActive, alt}) {
  return (
    <motion.div variants={opacity} initial="initial" animate={isActive ? "open" : "closed"} className="imageContainerHeader">
        <Image 
        src={`/assets/header/${src}`}
        fill={true}
        sizes="(min-width: 1750px) 30vw, 32vw"
        alt={alt}
        loading='lazy'
        quality={50}
        />
    </motion.div>
  )
}