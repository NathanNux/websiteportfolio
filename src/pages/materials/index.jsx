import Head from "next/head";
import CurveTransition from "@/components/transition/CurveTransition";
import IntroText from "@/components/common/IntroText"
import FreeOffers from "@/components/common/FreeStuff";

import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import Header from "@/components/common/Header";
import Landing from "@/components/MaterialsPage/Landing";
import { useEffect, useState } from "react";
import { useLoad } from "@/context";
import useGetLocation from "@/utils/useGetLocation";
import CookieBanner from "@/components/Cookies/Banner";
import ManageModem from "@/components/Cookies/ManageModem";

export default function Home() {
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { isHomeCountry }  = useLoad();
  const { isVisible, isSaved, setIsSaved, modem, setModem, setIsVisible } = useLoad();
  // Call the useGetLocation hook
  useGetLocation();

  const phrases = [
    {
        text: isHomeCountry ? "Za své 2 roky zkušeností a téměř <span>3000 hodin</span> jsem dal dohormady ekostystém složený z <span>principů</span>,které zahrnují <span>dobrý design</span>,<span>uživatelský zážitek</span> a <span>neodolatelnou obchodní nabídku</span>." : "In my 2 years of experience and almost <span>3000 hours</span> I have put together an ecosystem consisting of <span>principles</span> that include <span>good design</span>, <span>user experience</span> and <span>an irresistible business offer</span>."
    },
    {
        text: isHomeCountry ? "Jsem si moc dobře vědom kolik <span>času, píle, chyb a drahých omylů</span> stojí mít výkonný a effektivní ekosystém ve všech těchto aspektů.<span>Plánuji proto,</span> pro všechny, kteří začínají, dát tyhle zkušenosti <span>ven mezi Vás.</span> S cenou vašeho času." : "I am very well aware of how much <span>time, effort, mistakes and expensive mistakes</span> it costs to have a powerful and effective ecosystem in all these aspects.<span>Therefore, I plan,</span> for all those who are starting out, to give these experiences <span>out among you.</span> With the price of your time."
    },
    {
        text: isHomeCountry ? "Jediný od Vás chci,<span> je vaše důvěra a čas, který budete věnovat</span> sledováním a čtěním mých budoucích materiálů.<span>Dejte mi tak ještě čas,</span>abych Vám mohl přinést <span>to nejjednodušší a nejefektivnější zároveň.</span> Pěkně těžká kombinace,<span>ale vím že to nebude za dlouho.</span>" : "All I ask of you,<span> is your trust and the time you will spend</span> watching and reading my future materials.<span>Give me some more time,</span> so I can bring you <span>the simplest and most effective at the same time.</span> A pretty tough combination,<span> but I know it won't be long.</span>"
    }
  ]

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
        <meta name="description" content="Matials page I have to offer to the public, free e-book and e-courses links." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Header isActive={isActive} setIsActive={setIsActive}/>
      <Navbar isActive={isActive} setIsActive={setIsActive}/>
      {isVisible && <CookieBanner isSaved={isSaved} setIsSaved={setIsSaved} setIsVisible={setIsVisible} setModem={setModem} />}
      {isVisible && <ManageModem modem={modem} setModem={setModem} setIsSaved={setIsSaved} setIsVisible={setIsVisible} />}
      <CurveTransition>
        <div className="page">
          <Landing />
          <IntroText phrases={phrases} />
          <FreeOffers />
          <Footer />
        </div>
        
      </CurveTransition>
    </>
  );
}
