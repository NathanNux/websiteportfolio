import Head from "next/head";
import dynamic from "next/dynamic";
import CurveTransition from "@/components/transition/CurveTransition";
const Landing = dynamic(() => import('@/components/LandingPage/Landing'), { ssr: false });
import Slider from "@/components/LandingPage/Slider";
import NewestWork from "@/components/LandingPage/NewestWork";
import Description from "@/components/LandingPage/Description";


import { useEffect } from "react";
import IntroText from "@/components/common/IntroText";
import OfferSection from "@/components/LandingPage/OfferSections";
import MainOffer from "@/components/LandingPage/MainOffer";
import { AnimatePresence } from "framer-motion";
import Preloader from "@/components/Preloader";
import { useLoad } from "@/context";
import FreeOffers from "@/components/common/FreeStuff";
import ZoomParallax from "@/components/common/ParallaxZoom";

const Footer = dynamic(() => import('@/components/common/Footer'), { ssr: false });
import Navbar from "@/components/common/Navbar";
import Header from "@/components/common/Header";
import { usePathname } from "next/navigation";

const phrases = [
  {
      text: "Vyvíjím a pracuji <span>jednoduše</span>.<br />To je <span>proč má práce</span> prostě funguje.<br />Nejsem ale jen<span> Designer a programátor</span><br /> ale i Architekt<span> takže dostanete celý balíček...</span>",
  },
  {
      text: "Autentický desing, správné praktiky pro web,<br /> <span>SEO, Výzkum a materiály </span> společně s <br />pořádnými a ověřenými stystémy <span>Marketingu</span><br /> abyste byli opravdu <span>úspěšní</span> Online.",
  },
  {
      text: "Ti, kdo chtějí vést <span>Orchestr</span>, se musí <span>obrátit</span> zády k davu.<br />Pojďte se spolu podívat, <span> co všechno</span> <br /> můžeme společne vybudovat <span>a není toho vůbec málo.</span>",
  }
]

export default function Home() {

  const { firstLoad, setFirstLoad } = useLoad();

  // this needs to be in every page, because of the smooth scroll anim. it won't work without it when you navigate to another page

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
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

