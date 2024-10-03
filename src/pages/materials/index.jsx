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
        text: isHomeCountry 
        ? "<span>Začínáte s omezenými prostředky?</span> Žádný strach—mám pro vás jednoduchý a účinný systém, který vám dám zdarma, <span>ať už jste na úplném začátku nebo si zrovna teď nemůžete dovolit moje služby.</span> Tento návod vás dostane do akce rychle."
        : "<span>Starting with limited resources?</span> Don't worry—I've got you covered. I've crafted a simple, effective framework that I'm giving away for free,<span> whether you're just beginning or I don't quite fit your budget right now.</span> This guide will get you up and running fast."
    },
    {
        text: isHomeCountry 
        ? "<span>Nejlepší část?</span> Nemusíte na to být sami.<span> S více než 3000 hodinami zkušeností</span> jsem vytvořil systém, který zvládne ty největší překážky—od tvorby designu, správy webu až po vylepšení vaší nabídky.<span> Naučím vás strategie, které fungují.</span>"
        : "<span>The best part?</span> You don't have to figure it out on your own.<span> With 3000+ hours of experience under my belt,</span> I've honed a system that tackles the biggest roadblocks you'll face—whether it's designing, managing your site, or refining your offer.<span> I'll teach you the strategies that make things click.</span>"
    },
    {
        text: isHomeCountry 
        ? "<span>Naučím vás osvědčené principy—jak postavit funkční web během jednoho týdne s pouhými 14 hodinami soustředěné práce.</span> Tyto metody fungují v jakémkoli oboru, takže můžete přestat tápat a rychle začít dosahovat výsledků."
        : "<span>You'll learn the core principles I've mastered over time—how to build a website in as little as one week with just 14 hours of dedicated effort.</span> These methods apply across industries, so you can skip the guesswork and start seeing results faster."
    },
    {
        text: isHomeCountry 
        ? "<span>Ale tady je háček:</span> To bude vyžadovat vaši plnou pozornost.<span> Pokud jste připraveni zjednodušit si cestu a efektivně vyřešit problémy,</span> pojďme to zvládnout společně. Nejde jen o správné provedení, ale o to, aby se vaše online přítomnost stala nástrojem pro úspěch.<span> Jste připraveni jednat?</span>"
        : "<span>But here's the catch:</span> This will require your commitment.<span> If you're ready to simplify your journey and solve your issues efficiently,</span> let's make it happen together. This isn't just about getting it right; it's about transforming your online presence into a powerful tool for success.<span>Are you ready to take action?</span>"
    },
    {
        text: isHomeCountry 
        ? "<span>Poslouchejte:</span> pokud chcete mít přístup k mým novým materiálům a sledovat můj další obsah,<span> sledujte mě na sociálních sítích.</span> Brzy budu mít vše připravené a můžete se těšit na opravdovou hodnotu.<span> Věřte mi, nechcete si nechat ujít, co přijde!</span>"
        : "<span>Listen up:</span> if you want to stay in the loop for my upcoming content,<span> follow me on social media.</span> I'll have it ready soon, and you can count on me to deliver serious value.<span> Trust me, you won't want to miss what's coming!</span>"
    }
  ];


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
