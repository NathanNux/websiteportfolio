import Head from "next/head";
import CurveTransition from "@/components/transition/CurveTransition";
const Landing = dynamic(() => import('@/components/AboutPage/Landing'), { ssr: false });
import dynamic from "next/dynamic";
import Intro from "@/components/common/Intro";
import AboutSections from "@/components/AboutPage/AboutSections";
import Services from "@/components/AboutPage/Service";
import { useEffect } from "react";
import FreeOffers from "@/components/common/FreeStuff";
import Description from "@/components/common/Description";

import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import Header from "@/components/common/Header";

const description = [
  {
      text: "OD BASKETBALISTY A <br/> STUDENTA ARCHITEKTURY <br/> AŽ PO <br/> WEBOVÉHO DESIGNERA <br/> s FULLSTACK PROFESÍ"
  },
];

const phrase1 = [
  {
      text: "S vybudovaným pohledem architekta a inženýra, <br/> mi umožňuje díky mému studiu se dívat na programování<br/> nejen z pohledu designu, a struktury"
  },
];

const phrase2 = [
  {
      text: "ale pomohlo mi to i založit a <br/>poskládat řadu systémů,<br/> které prostě fungují."
  },
];
const phrase3 = [
  {
      text: "Vezměme to ale z počátku..."
  },
];

export default function Home() {

  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('locomotive-scroll').then(LocomotiveScroll => {
        const scroll = new LocomotiveScroll.default({
          el: document.querySelector('[data-scroll-container]'),
          smooth: true,
        });

        return () => {
          if(scroll) scroll.destroy();
        };
      });
    }
  }, []);

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
      <CurveTransition>
        <Landing />
        <Description  description={description}/>
        <Intro phrase1={phrase1} phrase2={phrase2} phrase3={phrase3} src='/images/about/intro.png'/>
        <AboutSections />
        <Services />
        <FreeOffers text='1'/> 
        <Footer />
      </CurveTransition>
    </>
  );
}
