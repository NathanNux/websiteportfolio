'use client';
import styles from './style.module.scss';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { height } from '../anim';
import Body from './Body';
import Footer from './Footer';
import Image from './Image';

const links = [
  {
    title: "Domů",
    href: "/",
    src: "home.png"
  },
  {
    title: "O mně",
    href: "/about",
    src: "contact.png"
  },
  {
    title: "Kontakt",
    href: "/contact",
    src: "home.png"
  },
  {
    title: "Projekty",
    href: "/projects",
    src: "shop.png"
  },
  {
    title: "Materiály",
    href: "/materials",
    src: "lookbook.png"
  },
]

export default function Index() {

  const [selectedLink, setSelectedLink] = useState({isActive: false, index: 0});

  return (
    <motion.div variants={height} initial="initial" animate="enter" exit="exit" className={styles.nav}>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <Body links={links} selectedLink={selectedLink} setSelectedLink={setSelectedLink}/>
        </div>
        <Image src={links[selectedLink.index].src} isActive={selectedLink.isActive}/>
      </div>
      <Footer />
    </motion.div>
  )
}