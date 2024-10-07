import Head from "next/head";
import CurveTransition from "@/components/transition/CurveTransition";
import Landing from "@/components/AboutPage/Landing";
import Services from "@/components/AboutPage/Service";
import Intro from "@/components/common/Intro";
import AboutSections from "@/components/AboutPage/AboutSections";
import FreeOffers from "@/components/common/FreeStuff";
import Description from "@/components/common/Description";

import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import Header from "@/components/common/Header";
import { useEffect, useState } from "react";
import { useLoad } from "@/context";
import LaningImage from '../../../public/images/done/about.webp';
import IntroImage from '../../../public/images/done/story.webp';
import useGetLocation from "@/utils/useGetLocation";
import CookieBanner from "@/components/Cookies/Banner";
import ManageModem from "@/components/Cookies/ManageModem";


export default function Home() {
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { isHomeCountry, isVisible, isSaved, setIsSaved, modem, setModem, setIsVisible } = useLoad();
  // Call the useGetLocation hook
  useGetLocation();

  const description = [
    {
      text: isHomeCountry
        ? "ARCHITEKT, <br/> DŘEVOSTAVAŘ, <br/> PROGRAMÁTOR, <br/> DESGINER.<br/> VĚŘÍM VE SKUTEČNOU <br/> HODNOTU TVORBY.<br/>"
        : "ARCHITECT, <br/> WOOD ENGINEER, <br/> PROGRAMER, <br/> DESIGNER.<br/> I BELIEVE IN THE <br/> REAL VALUE <br/> OF CREATION.<br/>"
    },
  ];
  
  const phrase1 = [
    {
      text: isHomeCountry
        ? "Už třetím rokem se věnuji webovému designu,<br/> psychologii, vnímání barev a vyprávění příběhů.<br/> Tvořím projekty, které jsou nejen krásné,<br/> ale také účinné a funkční."
        : "For three years, I’ve been working on web design,<br/> psychology, color perception, and storytelling.<br/> I create projects that aren’t just beautiful,<br/> but also functional and effective."
    },
  ];
  
  const phrase2 = [
    {
      text: isHomeCountry
        ? "Cílem není jen tvořit webové stránky,<br/> ale celý ekosystém,<br/> který stojí na principech<br/> kvalitního designu a uživatelského zážitku."
        : "The goal isn't just to create websites,<br/> but to build a whole ecosystem<br/> based on solid design principles<br/> and user experience."
    },
  ];
  
  const phrase3 = [
    {
      text: isHomeCountry
        ? "Tohle je můj příběh...."
        : "This is my story...."
    },
  ];
  
  

  useEffect( () => {
    (
      async () => {
          const LocomotiveScroll = (await import('locomotive-scroll')).default
          const locomotiveScroll = new LocomotiveScroll();

          setTimeout( () => {
            setIsLoading(false);
            document.body.style.cursor = 'default'
            if (typeof window !== 'undefined') {
              window.scrollTo(0,0);
            }
          }, 2000)
      }
    )()
  }, [])

  return (
    <>
      <Head>
        <meta name="description" content={isHomeCountry ? "Chcete web, který přináší výsledky? Po 3000+ hodinách zdokonalování svého systému garantuji web s vysokým výkonem, který konvertuje. Připraveni růst? Jdeme na to! -- Stránka o mě" : "Want a website that actually delivers? After 3000+ hours refining my system, I guarantee a high-performing site that converts. Ready to scale? Let's make it happen! -- About me Page"} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Matěj Forejt - Freelancer" />
        <meta property="og:description" content={isHomeCountry ? "Chcete web, který přináší výsledky? Po 3000+ hodinách zdokonalování svého systému garantuji web s vysokým výkonem, který konvertuje. Připraveni růst? Jdeme na to!" : "Want a website that actually delivers? After 3000+ hours refining my system, I guarantee a high-performing site that converts. Ready to scale? Let's make it happen!"} />
        <meta property="og:image" content={ isHomeCountry ? "/assets/header/mainPage.webp": "/assets/header/mainPageEN.webp"} />
        <meta property="og:url" content="https://matejforejt.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Matěj Forejt - Freelancer" />
        <meta name="twitter:description" content={isHomeCountry ? "Chcete web, který přináší výsledky? Po 3000+ hodinách zdokonalování svého systému garantuji web s vysokým výkonem, který konvertuje. Připraveni růst? Jdeme na to!" : "Want a website that actually delivers? After 3000+ hours refining my system, I guarantee a high-performing site that converts. Ready to scale? Let's make it happen!"} />
        <meta name="twitter:image" content={ isHomeCountry ? "/assets/header/mainPage.webp": "/assets/header/mainPageEN.webp"} />
      </Head>
      <Header isActive={isActive} setIsActive={setIsActive}/>
      <Navbar isActive={isActive} setIsActive={setIsActive}/>
      {isVisible && <CookieBanner isSaved={isSaved} setIsSaved={setIsSaved} setIsVisible={setIsVisible} setModem={setModem} />}
      {isVisible && <ManageModem modem={modem} setModem={setModem} setIsSaved={setIsSaved} setIsVisible={setIsVisible} />}
      <CurveTransition>
        <div className="page">
          <Landing src={LaningImage}/>
          <Description  description={description}/>
          <Intro phrase1={phrase1} phrase2={phrase2} phrase3={phrase3} src={IntroImage}/>
          <AboutSections />
          <Services />
          {/* <FreeOffers text='1'/>  */}
          <Footer />
        </div>
      </CurveTransition>
    </>
  );
}
