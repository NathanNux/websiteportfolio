import Head from "next/head";
import CurveTransition from "@/components/transition/CurveTransition";
import IntroText from "@/components/common/IntroText"

import { useEffect } from "react";
import Landing from "@/components/MaterialsPage/Landing";
import FreeOffers from "@/components/common/FreeStuff";

import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import Header from "@/components/common/Header";


const phrases = [
  {
      text: "Vím, že proces webových stránkej <span>je náročný a těžký, ale i drahý.</span> Doporučuji všem Vám s malými nebo začínajícími podniky začít sami."
  },
  {
      text: "Ale abych Vám mohl pomoci alespoň nějak <span>od stovkách náročných hodin, ne-li tísíce</span> (v mém případě) při výtvory vašeho díla, mám pro Vás <span>tekuté zlato</span> z mé cesty vytváření skvělých webů."
  },
  {
      text: "Abyste nedělali stejné chyby, kterých jsem se dopustil, <span>projdu společně s Vámi</span> každý krok za krokem <span>jednodychými postupy</span>, které Vám přinesou <span>skvělý začátek</span> už během <span>pár hodin práce, ne déle.</span>"
  }
]

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
        <IntroText phrases={phrases} />
        <FreeOffers />
        <Footer />
      </CurveTransition>
    </>
  );
}
