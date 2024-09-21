import Head from "next/head";
import CurveTransition from "@/components/transition/CurveTransition";
import Projects from "@/components/ProjectsPage/Projects";

import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import Header from "@/components/common/Header";
import { useEffect, useState } from "react";

export default function Home() {
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
        <meta name="description" content="Page with all of my project links and showcases to another pages" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Header isActive={isActive} setIsActive={setIsActive}/>
      <Navbar isActive={isActive} setIsActive={setIsActive}/>
      <CurveTransition>
        <div className="page">
          <Projects />
          <Footer />
        </div>
      </CurveTransition>
    </>
  );
}
