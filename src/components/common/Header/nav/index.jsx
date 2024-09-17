'use client';
import styles from './style.module.scss';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { height } from '../anim';
import Body from './Body';
import Footer from './Footer';
import Image from './Image';
import { useLoad } from '@/context';



export default function Index() {

  const [selectedLink, setSelectedLink] = useState({isActive: false, index: 0});
  const { isHomeCountry } = useLoad();
  
  const links = [
    //WIP: Add here the corresponding Images after photo shooting
    {
      title: isHomeCountry ? "Domů" : "Home",
      href: "/",
      src:  isHomeCountry ? "main-page.webp" : "main-page.webp",
      alt: "landingPage_Image"
    },
    {
      title: isHomeCountry ? "O mně" : "About",
      href: "/about",
      src: isHomeCountry ? "aboutme-page.webp" : "aboutme-page.webp",
      alt: "aboutPage_Image"
    },
    {
      title: isHomeCountry ? "Kontakt" : "Contact",
      href: "/contact",
      src: isHomeCountry ? "contactme-page.webp" : "contactme-page.webp",
      alt: "contactPage_Image"
    },
    {
      title: isHomeCountry ? "Projekty" : "Projects",
      href: "/projects",
      src: isHomeCountry ? "projects-page.webp" : "projects-page.webp",
      alt: "projectsPage_Image"
    },
    {
      title: isHomeCountry ? "Materiály" : "Materials",
      href: "/materials",
      src:  isHomeCountry ? "materials-page.webp" : "materials-page.webp",
      alt: "materialsPage_Image"
    },
  ]
  // WIP: Show different images isHomeCountry is true or false


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