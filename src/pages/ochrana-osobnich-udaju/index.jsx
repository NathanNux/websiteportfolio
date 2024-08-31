import Head from "next/head";
// import CurveTransition from "@/components/transition/CurveTransition";

import dynamic from 'next/dynamic';
const CurveTransition = dynamic(() => import('@/components/transition/CurveTransition'), { ssr: false });

import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import Header from "@/components/common/Header";

import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.scss";
import { useEffect, useRef } from "react";
import gsap from "gsap";


const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const container = useRef(null)

  useEffect(() => {
    const targers = container.current.querySelectorAll('h1, p')
    gsap.fromTo(targers, {y: 30, opacity: 0}, {y: 0, opacity: 1, delay: 0.8, stagger: 0.2})
    window.scrollTo(0, 0)
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
         <main ref={container} className={`${styles.main} ${inter.className}`}>
          <div className={styles.container}>
            <h1>Ochrana osobních údajů</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis et mollis elit. Nulla facilisi. Phasellus ac pulvinar ante. Morbi maximus feugiat sapien nec cursus. Phasellus in ornare elit. Suspendisse viverra porta dui et efficitur. Sed ut rhoncus nibh. Cras eleifend tellus a enim sodales, a efficitur odio euismod. Aenean non consequat lectus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Fusce quis eleifend ipsum, sit amet posuere ligula.</p>
            <p>Sed ut rhoncus nibh. Cras eleifend tellus a enim sodales, a efficitur odio euismod. Aenean non consequat lectus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Fusce quis eleifend ipsum, sit amet posuere ligula.</p>
          </div>
        </main>
        <Footer />
      </CurveTransition>
    </>
  );
}
