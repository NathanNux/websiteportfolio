import Head from "next/head";
import CurveTransition from "@/components/transition/CurveTransition";
import Navbar from "@/components/common/Navbar";
import Header from "@/components/common/Header";
import { useEffect, useState } from "react";
import NotFoundPage from "@/components/404";
import useGetLocation from "@/utils/useGetLocation";
import { useLoad } from "@/context";
import CookieBanner from "@/components/Cookies/Banner";
import ManageModem from "@/components/Cookies/ManageModem";

export default function Home() {
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { isVisible, modem, setModem, isSaved, setIsSaved, setIsVisible } = useLoad();
  // Call the useGetLocation hook
  useGetLocation();

  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import('locomotive-scroll')).default;
      const locomotiveScroll = new LocomotiveScroll();

      setTimeout(() => {
        setIsLoading(false);
        document.body.style.cursor = 'default';
        if (typeof window !== 'undefined') {
          window.scrollTo(0, 0);
        }
      }, 2000);
    })();
  }, []);

  return (
    <>
      <Head>
        <meta name="description" content="Cookies policy info page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Header isActive={isActive} setIsActive={setIsActive} />
      <Navbar isActive={isActive} setIsActive={setIsActive} />
      {isVisible && <CookieBanner isSaved={isSaved} setIsSaved={setIsSaved} setIsVisible={setIsVisible} setModem={setModem} />}
      {isVisible && <ManageModem modem={modem} setModem={setModem} setIsSaved={setIsSaved} setIsVisible={setIsVisible} />}
      <CurveTransition>
        <div className="page">
            <NotFoundPage />
        </div>
      </CurveTransition>
    </>
  );
}