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


const phrases = [
  {
    text: "Webové stránky nejsou jen<span>obrázky, text a layout.</span>Jde o<span>důležitou zprávu,</span>kterou <span>chcete sdělit</span> svým novým a stávajícím zákazníkům."
  },
  {
      text: "<span>Nejsem tradiční:</span>řekni si o něco míň a udělej o něco víc, typ člověka. Tohle prostě nedělám.<span>Poskytu Vám skutečnou hodnotu.</span>Protože miluju to, co dělám<span>a pevně věřím,</span>že můj ekosystém Vám pomůžou nabrat otáčky s vašim podnikáním<span>a zlepšit Váš život.</span>"
  },
  {
      text: "Žádný poplatek za služby, žádný model předplatného.<span>Dostanete jednorázový balížek s celoživotními službami.</span>Vytvářím vztahy, ne obchodní dealy.<span>Věřím v důvěru, ne v rychlý výdělek.</span>A jsem součástí celého procesu. <span>Jsem drahý, ale udělám věci tak, jak mají být.</span>"
  }
]

export default function Home() {
  const [isActive, setIsActive] = useState(false);
  const { firstLoad, setFirstLoad } = useLoad();
  const [isLoading, setIsLoading] = useState(true);

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

  //WIP: if I will have the nerves to do it, I will create a custom hook for disabling the scroll
  // rest is in the Obsidian notes 
  // It is done using this, its simple, but wont work for the transition. I might need to use the same but with new global state
  
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
      <CurveTransition>
        {!firstLoad &&<div>
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
            text='Originalita - Design - Nabídka - Prodeje -'
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