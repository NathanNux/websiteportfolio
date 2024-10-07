import Head from "next/head";
import CurveTransition from "@/components/transition/CurveTransition";

import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import Header from "@/components/common/Header";

import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import InfoPages from "@/components/InfoPages";
import LandingInfo from "@/components/InfoPages/Landing";
import LandingImage from '../../../public/images/info-pages/privacy.jpg';
import useGetLocation from "@/utils/useGetLocation";
import CookieBanner from "@/components/Cookies/Banner";
import ManageModem from "@/components/Cookies/ManageModem";
import { useLoad } from "@/context";



const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const landingText = "Privacy Policy - Privacy Policy - Privacy Policy - Privacy Policy -"; 
  const { isHomeCountry, isVisible, isSaved, setIsSaved, modem, setModem, setIsVisible } = useLoad();
  // Call the useGetLocation hook
  useGetLocation();

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
        <meta name="description" content={isHomeCountry ? "Chcete web, který přináší výsledky? Po 3000+ hodinách zdokonalování svého systému garantuji web s vysokým výkonem, který konvertuje. Připraveni růst? Jdeme na to! -- Stránka o ochraně osobních údajů" : "Want a website that actually delivers? After 3000+ hours refining my system, I guarantee a high-performing site that converts. Ready to scale? Let's make it happen! -- Privacy Policy Page"} />
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
          <LandingInfo landingText={landingText} src={LandingImage}/>
          <InfoPages />
        </div>
        <Footer />
      </CurveTransition>
    </>
  );
}
