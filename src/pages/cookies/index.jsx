import Head from "next/head";
import CurveTransition from "@/components/transition/CurveTransition";
import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import Header from "@/components/common/Header";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import InfoPages from "@/components/InfoPages";
import LandingInfo from "@/components/InfoPages/Landing";
import LandingImage from '../../../public/images/info-pages/cookies.jpg';
import ManageModem from "@/components/Cookies/ManageModem";
import { useLoad } from "@/context";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const landingText = "Cookies - Cookies - Cookies - Cookies -"; 
  const { isVisible, modem, setModem, setIsSaved, setIsVisible } = useLoad();

  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import('locomotive-scroll')).default;
      const locomotiveScroll = new LocomotiveScroll();

      setTimeout(() => {
        setIsLoading(false);
        document.body.style.cursor = 'default';
        if (typeof window !== 'undefined') {
          window.scrollTo(0, 0);
        }
      }, 2000);
    })();
  }, []);

  return (
    <>
      <Head>
        <meta name="description" content="Cookies policy info page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header isActive={isActive} setIsActive={setIsActive} />
      <Navbar isActive={isActive} setIsActive={setIsActive} />\
      {isVisible && <ManageModem modem={modem} setModem={setModem} setIsSaved={setIsSaved} setIsVisible={setIsVisible} />}
      <CurveTransition>
        <div className="page">
          <LandingInfo landingText={landingText} src={LandingImage} />
          <InfoPages />
        </div>
        <Footer />
      </CurveTransition>
    </>
  );
}