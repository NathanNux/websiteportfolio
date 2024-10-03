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
import LaningImage from '../../public/images/done/main.webp';

export default function Home() {
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { isVisible, setIsVisible } = useLoad(true);
  const { isSaved, setIsSaved, isHomeCountry, firstLoad, setFirstLoad, modem, setModem } = useLoad();

  // Call the useGetLocation hook
  useGetLocation();

  const phrases = [
    {
      text: isHomeCountry
        ? "<span>Pojďme si to říct na rovinu:</span>Vytvořit špičkovou digitální prezentaci<span> není něco, co byste mohli zvládnout za jeden víkend.</span> Osvojení designových principů, behaviorální psychologie a technických dovedností,<span> které lidi nutí reagovat, zabere přes 3 000 hodin.</span> Věřte mi, ten čas jsem už investoval – a to za předpokladu,<span> že na to máte cit.</span> A pokud ho nemáte? Tak hodně štěstí při metodě pokus-omyl.<span> A věřte mi, budete ho potřebovat.</span>"
        : "<span>Let's Talk Real:</span> Building a top-notch digital presence<span> isn't something you can just “figure out” on a weekend.</span> It takes over 3,000 hours to master design principles, behavioral psychology, and the technical ins and outs<span> that make people _want_ to engage.</span> <br /> Trust me, I've already put in that time—<span>and that's if you have an eye for it. If you don't?</span> Well, good luck with trial and error.<span> And I mean it. Good luck.</span>"
    },
    {
      text: isHomeCountry
        ? "<span>A teď to hlavní:</span> Můžete to zkusit sami.<span> Ale zamyslete se—kolik času si ceníte? Vynásobte to 3 000 = To je minimální investice.</span> A to nemluvím o ztracených prodejích kvůli průměrnému designu, chaotickému rozvržení nebo slabé strategii.<span> Chcete opravdu riskovat své podnikání jen na náhodu?</span>"
        : "<span>And here's the kicker:</span> You could try to DIY it.<span> But take a second to think—how much do you value your time?</span><br /> Multiply that by 3,000 =<span> That's what you'd burn on this, _minimum_.</span> Not to mention the lost sales from a subpar design, confusing layout, or lackluster strategy.<span>Do you really want to risk your business on guesswork?</span>"
    },
    {
      text: isHomeCountry
        ? "<span>Ten kód jsem už prolomil</span>—můj tříčlenný tým a já se soustředíme na to,<span> jak to udělat správně hned napoprvé.</span> Nejenže tvoříme designy. Vytváříme <span>kompletní digitální ekosystémy</span>, které nejen dobře vypadají, ale jsou postavené tak, aby fungovaly.<span> Postaráme se o vše:</span> design, rozvržení, cookies, GDPR, obsah, animace, hosting a SEO. A samozřejmě o nabídku... <span>Pokud tuhle část zanedbáte, vaše firma každý den přichází o peníze.</span> To zní děsivě, že jo?"
        : "<span>I've already cracked the code</span>—my 3-person team and I are laser-focused on doing it right from the start.<span>We don't just design</span>. We build complete digital ecosystems that don't just look good—<span>they're built to perform.</span><br /><span>We handle it all:</span> design, layout, cookies, GDPR compliance, messaging, animations, hosting, and SEO.<span> And don't forget the offer...</span> Miss that one, and your business is <span>leaking money every single day</span>. Sounds awful, right? "
    },
    {
      text: isHomeCountry
        ? "<span>A teď pozor, design je jen začátek.</span> Web není jen o tom, jak vypadá. Jde o vytvoření ekosystému, který se spojí s vaším publikem,<span> zaujme je a přemění je na loajální zákazníky.</span> Souhlasí se mnou, že webová stránka <span>musí nejen dobře vypadat, ale hlavně přinášet výsledky?</span>"
        : "<span>And listen, design is just the tip of the iceberg</span>. Building a website is about more than just looking good.<br /> It's about<span> creating a digital ecosystem</span>—one that connects with your audience, engages them,<span> and converts them into loyal customers.</span> Website is not just about looking good but about <span>getting results, agree? </span>"
    },
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
        <meta name="description" content="Main landing page with main offer, showcase of newest projects and all links to other pages." />
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
          <Landing src={LaningImage}/>
          <Description />
          <Slider />
          <NewestWork />
          <IntroText phrases={phrases}/>
          <ZoomParallax 
            src1='/assets/images/projects/components.webp' 
            src2='/images/done/authentic.webp' 
            src3='/assets/images/slider-la/coding.webp' 
            src4='/assets/images/slider-la/performance.webp' 
            src5='/assets/images/slider-la/color-pallet.webp' 
            src6='/images/done/story.webp' 
            src7='/assets/images/slider-la/research.webp' 
            path='/assets/images/slider-la/videos/main.webm'
            text={landingText}
          />
          <OfferSection />
          <Summary />
          <MainOffer />
          {/* <FreeOffers text='1'/> */}
          <Footer />
        </div>}
      </CurveTransition>
    </>
  );
}