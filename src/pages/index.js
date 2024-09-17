import Head from "next/head";
import CurveTransition from "@/components/transition/CurveTransition";
import Landing from '@/components/LandingPage/Landing';
import Slider from "@/components/LandingPage/Slider";
import NewestWork from "@/components/LandingPage/NewestWork";
import Description from "@/components/LandingPage/Description";


import { useEffect, useState } from "react";
import IntroText from "@/components/common/IntroText";
import OfferSection from "@/components/LandingPage/OfferSections";
import MainOffer from "@/components/LandingPage/MainOffer";
import { AnimatePresence } from "framer-motion";
import Preloader from "@/components/Preloader";
import { useLoad } from "@/context";
import FreeOffers from "@/components/common/FreeStuff";
import ZoomParallax from "@/components/common/ParallaxZoom";

import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import Header from "@/components/common/Header";
import Summary from "@/components/LandingPage/Summary";
import CookieBanner from "@/components/Cookies/Banner";
import ManageModem from "@/components/Cookies/ManageModem";
import useGetLocation from "@/utils/useGetLocation";
import { text } from "@/components/transition/CurveTransition/animations";


export default function Home() {
  const [isActive, setIsActive] = useState(false);
  const { firstLoad, setFirstLoad } = useLoad();
  const [isLoading, setIsLoading] = useState(true);
  const {isVisible, setIsVisible} = useLoad(true);
  const [modem, setModem] = useState(false);
  const [ isSaved, setIsSaved ] = useState(false);

  useGetLocation();
  const { isHomeCountry } = useLoad();

  const phrases = [
    {
      text: isHomeCountry
        ? "Webové stránky nejsou jen<span>obrázky, text a layout.</span>Jde o<span>důležitou zprávu,</span>kterou <span>chcete sdělit</span> svým novým a stávajícím zákazníkům."
        : "Websites are not just<span>images, text, and layout.</span>It's about<span>an important message</span>you want to <span>convey</span> to your new and existing customers."
    },
    {
      text: isHomeCountry
        ? "<span>Nejsem tradiční:</span>řekni si o něco míň a udělej o něco víc, typ člověka. Tohle prostě nedělám.<span>Poskytu Vám skutečnou hodnotu.</span>Protože miluju to, co dělám<span>a pevně věřím,</span>že můj ekosystém Vám pomůžou nabrat otáčky s vašim podnikáním<span>a zlepšit Váš život.</span>"
        : "<span>I'm not traditional:</span>ask for a little less and do a little more, type of person. I just don't do that.<span>I provide real value.</span>Because I love what I do<span>and firmly believe</span>that my ecosystem will help you accelerate your business<span>and improve your life.</span>"
    },
    {
      text: isHomeCountry
        ? "Žádný poplatek za služby, žádný model předplatného.<span>Dostanete jednorázový balížek s celoživotními službami.</span>Vytvářím vztahy, ne obchodní dealy.<span>Věřím v důvěru, ne v rychlý výdělek.</span>A jsem součástí celého procesu. <span>Jsem drahý, ale udělám věci tak, jak mají být.</span>"
        : "No service fee, no subscription model.<span>You get a one-time package with lifetime services.</span>I build relationships, not business deals.<span>I believe in trust, not quick profit.</span>And I'm part of the whole process. <span>I'm expensive, but I do things the way they should be done.</span>"
    }
  ];

  const landingText = isHomeCountry 
  ? 'Originalita - Design - Nabídka - Prodeje -' 
  : 'Authenticity - Design - Offer - Sales -';

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      document.body.style.cursor = 'default';
      if (typeof window !== 'undefined') {
        window.scrollTo(0, 0);
      }
      setFirstLoad(false);
    }, 2000);
  }, []);

  useEffect(() => {
    if (!firstLoad) {
      (async () => {
        const LocomotiveScroll = (await import('locomotive-scroll')).default;
        const locomotiveScroll = new LocomotiveScroll();
      })();
    }
  }, [firstLoad]);


  return (
    <>
      <Head>
        <meta name="description" content="Main Landing Page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
        <Header isActive={isActive} setIsActive={setIsActive}/>
        <Navbar isActive={isActive} setIsActive={setIsActive}/>
        <AnimatePresence wait>
          {firstLoad && <Preloader key="preloader"/>}
        </AnimatePresence>
        {isVisible && <CookieBanner isSaved={isSaved} setIsSaved={setIsSaved} setIsVisible={setIsVisible} setModem={setModem} />}
        {isVisible && <ManageModem modem={modem} setModem={setModem} setIsSaved={setIsSaved} setIsVisible={setIsVisible} />}
        <CurveTransition>
        {!firstLoad &&<div className="page">
          <Landing />
          <Description />
          <Slider />
          <NewestWork />
          <IntroText phrases={phrases}/>
          <ZoomParallax 
            src1='/assets/images/projects/components.webp' 
            src2='/assets/images/slider-la/seo.webp' 
            src3='/assets/images/slider-la/coding.webp' 
            src4='/assets/images/slider-la/performance.webp' 
            src5='/assets/images/slider-la/color-pallet.webp' 
            src6='/assets/images/slider-la/offer.webp' 
            src7='/assets/images/slider-la/research.webp' 
            path='/assets/images/slider-la/videos/main.webm'
            text={landingText}
          />
          <OfferSection />
          <Summary />
          <MainOffer />
          <FreeOffers text='1'/>
          <Footer />
        </div>}
      </CurveTransition>
    </>
  );
}