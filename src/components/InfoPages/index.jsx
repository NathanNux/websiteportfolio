import { usePathname } from "next/navigation";
import { CookiesSections, CookiesSectionsEN, PrivacySections, PrivacySectionsEN } from "@/constants/policy";
import { useLoad } from "@/context";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from "next/link";
import CookieClick from '@/components/common/CookieButton/clickButton';

export default function InfoPages() {
    const pathname = usePathname();
    const [activeSection, setActiveSection] = useState(null);
    const sectionRefs = useRef([]);
    const { isHomeCountry, setIsVisible, setModem, isVisible, modem } = useLoad();
    const { isSaved, setIsSaved } = useLoad();
    
    const section = useRef(null);
    const { scrollYProgress } = useScroll({
        target: section,
        offset: ['start end', 'end start']
    });

    const height = useTransform(scrollYProgress, [0, 1], [30, 0]);

    function checkLanguage() {
        if (pathname === '/cookies') {
            return isHomeCountry ? CookiesSections : CookiesSectionsEN;
        } else {
            return isHomeCountry ? PrivacySections : PrivacySectionsEN;
        }
    }

    const sections = checkLanguage();

    const handleLinkClick = (id) => {
        const section = document.getElementById(id);
        section.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + window.innerHeight / 2;

            for (let i = 0; i < sectionRefs.current.length; i++) {
                const section = sectionRefs.current[i];
                if (section) {
                    const rect = section.getBoundingClientRect();
                    const sectionTop = rect.top + window.scrollY;
                    const sectionBottom = sectionTop + rect.height;

                    if (sectionTop <= scrollPosition && sectionBottom > scrollPosition) {
                        setActiveSection(sections[i].id);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [sections]);

    return (
        <main className="info__page" ref={section}>
            <div className="info__content">
                <StickyNav sections={sections} activeSection={activeSection} onLinkClick={handleLinkClick} isHomeCountry={isHomeCountry}/>
                <ContentBlock sections={sections} sectionRefs={sectionRefs} isHomeCountry={isHomeCountry} pathname={pathname} setIsVisible={setIsVisible} setModem={setModem} setIsSaved={setIsSaved}/>
            </div>

            <motion.div style={{height}} className="svgContainer">
                <div className="svgDiv"></div>
            </motion.div>
        </main>
    );
}

const ContentBlock = ({ sections, sectionRefs, isHomeCountry, pathname, setIsVisible, setModem, setIsSaved }) => {

    const handleSettings = () => {
        // Open settings modal
        setIsVisible(true);
        setModem(true);
        setIsSaved(false);
    };

    return (
        <section className="info__block__main">
            {sections.map((section, i) => (
                <div key={i} className="info__block__section" ref={el => sectionRefs.current[i] = el}>
                    <h2 id={section.id}>{section.title}</h2>
                    <p>{section.content}</p>
                </div>
            ))}
            {pathname === "/cookies" ? 
                (
                    <p className="info__block__addInfo">
                        { isHomeCountry 
                            ? "Pro více informací o souborech cookies a to jak fungují v EU nebo dalších zemí se zákony o soukromí na internetu se můžete dočíst na" 
                            : "More information about cookies and how they work or other information about EU laws and other coutries impliying laws about privacy on the internet you can read at"
                        }{' '}
                        <Link href="https://www.aboutcookies.org/">
                            { isHomeCountry ? "cookies oficiální stránce" :"cookie official site"}
                        </Link>.
                    </p>
                ) : (
                    <p className="info__block__addInfo">
                        {isHomeCountry 
                            ? "Pro více informací o chránění osobních informací a to jak fungují v EU nebo dalších zemí se zákony o soukromí na internetu a osobních údajů se můžete dočíst na" 
                            : "For more information about protecting personal information and how it works in the EU or other countries with internet privacy and personal data laws, you can read on the"
                        }{' '}
                        <Link href="https://www.aboutcookies.org/">
                            {isHomeCountry ? "oficiální stránce" : "official site"}
                        </Link>.
                    </p>
                )
            }
            {pathname === "/cookies" ? (
                <div className="info__block__cookies">
                    <p className="info__block__cookies__text">{ isHomeCountry ? "Chcete si přenastavit vaše cookies?" : "Do you want to manage your cookies?"}</p>
                        <CookieClick title={ isHomeCountry ? "Nastavit" : "Settings"} trigger="nastavit" onClick={handleSettings} />
                    </div>
            ) : (<></>)}
        </section>
    );
}

const StickyNav = ({ sections, activeSection, onLinkClick, isHomeCountry }) => {
    return (
        <nav className="info__page__navbar">
            <div className="info__page__stickyBar">
                <h3>{isHomeCountry ? "Obsah" : "Content"}</h3>
                <ul className="info__page__ul">
                    {sections.map((section, i) => (
                        <li className="info__page__li" key={i}>
                            <motion.div
                                className="info__page__dot"
                                animate={{ backgroundColor: activeSection === section.id ? '#fb6b28' : '#22272d' }}
                                transition={{ duration: 0.3 }}
                            />
                            <motion.a
                                href={`#${section.id}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    onLinkClick(section.id);
                                }}
                                animate={{ opacity: activeSection === section.id ? 0.6 : 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                {section.title}
                            </motion.a>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}