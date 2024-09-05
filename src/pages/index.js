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
    text: "Webové stránky nejsou jen <span>obrázky, text a layout</span> Je do <span>důležitá zpráva</span>, kterou <span>chcete sdělit</span> svým novým a stávajícím zákazníkům."
  },
  {
      text: "Nejsem tradiční: řekni si o něco míň a udělej o něco víc, typ člověk. <span>Poskytu Vám skutečnou hodnotu.</span> Protože miluju to, co dělám <span>a pevně věřím</span>, že můj ekosystém Vám pomůžou nabrat otáčky s vašim podnikáním a zlepšit Váš život. <span>To je to, co dělám. Dotáhnu to až do konce.</span>"
  },
  {
      text: "Žádný poplatek za služby, žádný model předplatného. <span>Dostanete jednorázový balížek s celoživotními službami.</span> Vytvářím vztahy, ne obchodní dealy.<span> Veřím v důvěru, ne v rychlý výdělek.</span> A jsem součástí celého procesu.<span> Zasloužíte si celý koláč,</span> ne jen jeho polovinu. <span>Jsem drahý, ale udělám věci tak, jak mají být.</span>"
  }
]

export default function Home() {

  const { firstLoad, setFirstLoad } = useLoad();

  const [isLoading, setIsLoading] = useState(true);

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
        <meta name="description" content="Main Landing Page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
        <Header />
        <Navbar />
        <AnimatePresence wait>
          {firstLoad && <Preloader key="preloader"/>}
        </AnimatePresence>
      <CurveTransition>
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
          {/* WIP: Create a summary component that sums up all of the points and the minimum budget */}
          <Summary />
          <MainOffer />
          <FreeOffers text='1'/>
          <Footer />
      </CurveTransition>
    </>
  );
}