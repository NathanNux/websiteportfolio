import Head from "next/head";
import CurveTransition from "@/components/transition/CurveTransition";
import { useEffect, useState } from "react";
import TopBar from "@/components/ProjectsTemplate/TopBar";
import Description from "@/components/common/Description";
import Intro from "@/components/common/Intro";
import ZoomParallax from "@/components/common/ParallaxZoom";
import NextProjects from "@/components/ProjectsTemplate/NextProjects";
import Sections from "@/components/ProjectsTemplate/Sections";

import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import Header from "@/components/common/Header";

const description = [
  {
      text: "LOREM IPSUM DOLOR <br/> SIT AMET, CONSECTETUR<br/> ADIPISCING <br/> ELIT. PROIN IN ERAT <br/> LIGULA. VESTIBULUM"
  },
];

//section introduction images and phrases
const introductionImages = [
  {
      src:"/assets/images/smooth-scroll/smooth-scroll-ipmain.webp",
      alt: "A beautiful landscape"
  },
  {
      src:"/assets/images/smooth-scroll/color.webp",
      alt: "A beautiful landscape"
  },
  {
      src:"/assets/images/smooth-scroll/smooth-scroll3.webp",
      alt: "A beautiful landscape"
  }
]

const introductionPhrases = [
  {
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br /><br /> Proin in erat ligula. Vestibulum elementum ex et tellus malesuada, quis consectetur orci consectetur. Vestibulum<br /><br /> volutpat, est sollicitudin"
  },
  {
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin in"
  }
]

//section mobile view photos
const photos = [
  {
      src: '/assets/images/smooth-scroll/smooth-scroll-ipmain.webp',
      alt: 'project1',
      title: 'Hlavní stránka',
  },
  {
      src: '/assets/images/smooth-scroll/smooth-scroll-ipmain3.webp',
      alt: 'project2',
      title: '3D modely',
  },
  {
      src: '/assets/images/smooth-scroll/smooth-scroll-ipmain2.webp',
      alt: 'project3',
      title: 'Adv. Carousel',
  }
]

//section style images and phrases

const styleImages = [
  {
      src:"/assets/images/smooth-scroll/smooth-scroll2.webp",
      alt: "A beautiful landscape"
  },
  {
      src:"/assets/images/smooth-scroll/code.webp",
      alt: "A beautiful landscape"
  },
  {
      src:"/assets/images/smooth-scroll/smooth-scroll-ip1.webp",
      alt: "A beautiful landscape"
  }
]

const stylePhrases = [
  {
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin in erat ligula. Vestibulum elementumex et tellus malesuada, <br /><br />quis consectetur orci consectetur. Vestibulum volutpat, est sollicitudin posuere congue, augue augue dapibus enim,"
  },
  {
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin in erat ligula."
  }
]

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
        <meta name="description" content="Project page summary and showcase about smooth-scroll gsap and framer based website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Header isActive={isActive} setIsActive={setIsActive}/>
      <Navbar isActive={isActive} setIsActive={setIsActive}/>
      <CurveTransition>
        <TopBar name='My Soul' service='Improving' year='2024' style='Simplistic' price='$2000'/>
        <ZoomParallax 
          src1='/assets/images/smooth-scroll/smooth-scroll1.webp' 
          src2='/assets/images/smooth-scroll/smooth-scroll2.webp' 
          src3='/assets/images/smooth-scroll/smooth-scroll-ipmain.webp' 
          src4='/assets/images/smooth-scroll/smooth-scroll4.webp' 
          src5='/assets/images/smooth-scroll/smooth-scroll5.webp' 
          src6='/assets/images/smooth-scroll/smooth-scroll-ip2.webp' 
          src7='/assets/images/smooth-scroll/color.webp' 
          path='/assets/a-footage/smooth-scroll.webm'
          text='Originalita - Skvělý Design - Skvělá Nabídka - Prodeje -'
        />
        <Description  description={description}/>
        <Intro src='/assets/images/ps/smooth-scroll.webp'/>
        <Sections 
          photos={photos}
          section1={introductionImages}
          text1={introductionPhrases}
          section2={styleImages}
          text2={stylePhrases}
        />
        <NextProjects />
        <Footer />
      </CurveTransition>
    </>
  );
  // WIP: Add a chart to the projects as a metric on improvements on the projects, what did it improved, how much did it improved, etc.
  // add animated tooltip for creators of that project
}
