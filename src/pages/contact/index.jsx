import Head from "next/head";
import CurveTransition from "@/components/transition/CurveTransition";

import Calendly from "@/components/ContactPage/Calendly";

import Navbar from "@/components/common/Navbar";
import Header from "@/components/common/Header";
import { useEffect, useState } from "react";
import Contact from "@/components/ContactPage/Contact";
import Footer from '@/components/ContactPage/Footer';
import useGetLocation from "@/utils/useGetLocation";
import { useLoad } from "@/context";
import CookieBanner from "@/components/Cookies/Banner";
import ManageModem from "@/components/Cookies/ManageModem";

export default function Home() {

  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { isVisible, isSaved, setIsSaved, modem, setModem, setIsVisible } = useLoad();
  // Call the useGetLocation hook
  useGetLocation();

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
        <meta name="description" content="My contant page with calendly, contact information and socials." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Header isActive={isActive} setIsActive={setIsActive}/>
      <Navbar isActive={isActive} setIsActive={setIsActive}/>
      {isVisible && <CookieBanner isSaved={isSaved} setIsSaved={setIsSaved} setIsVisible={setIsVisible} setModem={setModem} />}
      {isVisible && <ManageModem modem={modem} setModem={setModem} setIsSaved={setIsSaved} setIsVisible={setIsVisible} />}
      <CurveTransition>
        <div className="page">
          <Contact />
          <Calendly />
          <Footer />
        </div>
        
      </CurveTransition>
    </>
  );
}
