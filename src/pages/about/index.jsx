import Head from "next/head";
import CurveTransition from "@/components/transition/CurveTransition";
import dynamic from "next/dynamic";
const Landing = dynamic(() => import('@/components/AboutPage/Landing'), { ssr: false });
const Services = dynamic(() => import('@/components/AboutPage/Service'), { ssr: false });
import Intro from "@/components/common/Intro";
import AboutSections from "@/components/AboutPage/AboutSections";
import FreeOffers from "@/components/common/FreeStuff";
import Description from "@/components/common/Description";

import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import Header from "@/components/common/Header";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

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
  const phrases = [phrase1, phrase2, phrase3];

  const pathname = usePathname()

  const [isLoading, setIsLoading] = useState(true);
  // to always return to the top of the page when the page changes
  // its easier to look for changes in the pathname then to look for changes in the router object

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 1500);
  }, [pathname]);

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
        <Services />
        <FreeOffers text='1'/> 
        <Footer />
      </CurveTransition>
    </>
  );
}
