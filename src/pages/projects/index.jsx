import Head from "next/head";
// import CurveTransition from "@/components/transition/CurveTransition";
import Projects from "@/components/ProjectsPage/Projects";

import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import Header from "@/components/common/Header";
import { useEffect, useState } from "react";

import dynamic from 'next/dynamic';
const CurveTransition = dynamic(() => import('@/components/transition/CurveTransition'), { ssr: false });

export default function Home() {

  const [isLoading, setIsLoading] = useState(true);
  // to always return to the top of the page when the page changes
  // its easier to look for changes in the pathname then to look for changes in the router object

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
        <div className="page">
          <Projects />
          <Footer />
        </div>
      </CurveTransition>
    </>
  );
}
