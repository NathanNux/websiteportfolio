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


const phrases = [
  {
    text: "Lorem ipsum dolor sit amet, <span>consectetur adipiscing elit. Proin</span> in erat ligula. Vestibulum elementum ex et tellus malesuada,"
  },
  {
      text: "Lorem ipsum dolor sit amet, consectetur <span>adipiscing elit. Proin in erat ligula.</span> Vestibulum elementum ex et tellus malesuada, quis <span>tekuté zlato</span> consectetur orci consectetur. Vestibulum"
  },
  {
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. <span>Proin in erat ligula.</span> Vestibulum elementum ex <span>et tellus malesuada</span>, quis consectetur <span>orci consectetur.</span> Vestibulum <span>volutpat, est sollicitudin</span>"
  }
]

export default function Home() {

  const { firstLoad, setFirstLoad } = useLoad();

  const [isLoading, setIsLoading] = useState(true);
  // to always return to the top of the page when the page changes
  // its easier to look for changes in the pathname then to look for changes in the router object

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
            path='/assets/images/slider-la/videos/main.mp4'
            text='Originalita - Skvělý Design - Skvělá Nabídka - Prodeje -'
          />
          <OfferSection />
          <MainOffer />
          <FreeOffers text='1'/>
          <Footer />
      </CurveTransition>
    </>
  );
}


// the issue seems like it is inisde the paralax zoom scss and the section css.
// because the glitch is happening in the main page. then in the projects page it is not happening.
// but is happening again in the projectstemplate page. but not in the material page
// and small glitch is happening in about me page, which only has sections component, not parallazoom component

