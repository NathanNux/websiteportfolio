'use client';
import styles from './style.module.scss';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { height } from '../anim';
import Body from './Body';
import Footer from './Footer';
import Image from './Image';

const links = [
  //WIP: Add here the corresponding Images after photo shooting
  {
    title: "Domů",
    href: "/",
    src: "main-page.webp",
    alt: "landingPage_Image"
  },
  {
    title: "O mně",
    href: "/about",
    src: "aboutme-page.webp",
    alt: "aboutPage_Image"
  },
  {
    title: "Kontakt",
    href: "/contact",
    src: "contactme-page.webp",
    alt: "contactPage_Image"
  },
  {
    title: "Projekty",
    href: "/projects",
    src: "projects-page.webp",
    alt: "projectsPage_Image"
  },
  {
    title: "Materiály",
    href: "/materials",
    src: "materials-page.webp",
    alt: "materialsPage_Image"
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
        <Image src={links[selectedLink.index].src} isActive={selectedLink.isActive} alt={links[selectedLink.index].alt}/>
      </div>
      <Footer />
    </motion.div>
  )
}