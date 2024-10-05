import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { scale } from "../../anim";
import { navbarLinks, navbarLinksEN } from "@/constants";
import { useLoad } from "@/context";


export default function Index ({ isActive, setIsActive }) {
  const container = useRef(null)
  const pathname = usePathname();
  const [delayedPathname, setDelayedPathname] = useState(pathname);
  const isContactPage = delayedPathname === '/contact' || delayedPathname === "/about" || delayedPathname.startsWith('/projects');
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [ active, setActive ] = useState(null);

  const { isHomeCountry } = useLoad();

  useEffect(() => {
    const activeIndex = navbarLinks.findIndex(({ href }) => href === delayedPathname);
    setActive(activeIndex);
  }, [pathname]);

  // I needed to set a delay to the classes to make it seemless and better in terms of UX and UI
  //this does it nicelly
  useEffect(() => {
    const timer = setTimeout(() => {
      setDelayedPathname(pathname);
    }, 1000);

    // Clear the timeout when the component unmounts
    return () => clearTimeout(timer);
  }, [pathname, delayedPathname]);

  return (
    <nav ref={container} className={`${isContactPage ? "navbarBlack" : "navbarWhite" }`}>
        <Link href='/' className="logo">
            <p className="copyright">©</p>
            <div className="name">
                <p className="codeBy">{ isHomeCountry ? "Kód od" : "Code By"}</p>
                <p className="dennis">{ isHomeCountry ? "Matěje" : "Matěj"}</p>
                <p className="snellenberg">{ isHomeCountry ? "Forejta" : "Forejt"}</p>
            </div>
        </Link>
        <div className="nav">
            { isHomeCountry ? 
              (
                navbarLinks.map(({ href, title }, i) => (
                  <div className="el" key={i} onMouseEnter={() => setHoveredIndex(i)} onMouseLeave={() => setHoveredIndex(null)}>
                    <Link href={href} className="Link">{title}</Link>
                    <motion.div layout variants={scale} initial='initial' animate={active === i ? (hoveredIndex !== null && hoveredIndex !== i ? 'exit' : 'enter') : (hoveredIndex === i ? 'enter' : 'exit')} className="indicator"></motion.div>
                  </div>
                ))
              ) : (
                navbarLinksEN.map(({ href, title }, i) => (
                  <div className="el" key={i} onMouseEnter={() => setHoveredIndex(i)} onMouseLeave={() => setHoveredIndex(null)}>
                    <Link href={href} className="Link">{title}</Link>
                    <motion.div layout variants={scale} initial='initial' animate={active === i ? (hoveredIndex !== null && hoveredIndex !== i ? 'exit' : 'enter') : (hoveredIndex === i ? 'enter' : 'exit')} className="indicator"></motion.div>
                  </div>
                ))
              )
            }
            <div className="elMenu" onClick={() => {setIsActive(!isActive)}}>
              <div className="indicatorMenu"></div>
              <p className="LinkMenu">Menu</p>
            </div>
        </div>
    </nav>
  )
}