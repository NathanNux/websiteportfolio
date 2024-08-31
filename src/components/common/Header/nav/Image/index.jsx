import React from 'react'
import { motion } from 'framer-motion';
import Image from 'next/image';
import { opacity } from '../../anim';

export default function Index({src, isActive, alt}) {
  return (
    <motion.div variants={opacity} initial="initial" animate={isActive ? "open" : "closed"} className="imageContainerHeader">
        <Image 
        src={`/images/${src}`}
        fill={true}
        sizes="true"
        alt={alt}
        loading='lazy'
        />
    </motion.div>
  )
}