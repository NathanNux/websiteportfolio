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

import useGetLocation from "@/utils/useGetLocation";
import CookieBanner from "@/components/Cookies/Banner";
import ManageModem from "@/components/Cookies/ManageModem";
import { useLoad } from "@/context";

const description = [
  {
      text: "LOREM IPSUM DOLOR <br/> SIT AMET, CONSECTETUR<br/> ADIPISCING <br/> ELIT. PROIN IN ERAT <br/> LIGULA. VESTIBULUM"
  },
];

//DON'T HAVE THIS YET IN PROJECTS, BUT HAVE MANY OF THE ASSETS

const nextProjects = [
  {
    src: '/assets/images/projects/components.webp',
    alt: 'project1',
    title: 'Komponenty',
    href: '/projects/components'
  },
  {
    src: '/assets/images/projects/brainwave.webp',
    alt: 'project2',
    title: 'Brainwave',
    href: '/projects/brainwave'
  }
]

//section introduction images and phrases
const introductionImages = [
  {
      src:"/assets/images/applesite/appleipmain.webp",
      alt: "A beautiful landscape"
  },
  {
      src:"/assets/images/applesite/color.webp",
      alt: "A beautiful landscape"
  },
  {
      src:"/assets/images/applesite/apple3.webp",
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
      src: '/assets/images/applesite/appleipmain.webp',
      alt: 'project1',
      title: 'Hlavní stránka',
  },
  {
      src: '/assets/images/applesite/appleipmain3.webp',
      alt: 'project2',
      title: '3D modely',
  },
  {
      src: '/assets/images/applesite/appleipmain2.webp',
      alt: 'project3',
      title: 'Adv. Carousel',
  }
]

//section style images and phrases

const styleImages = [
  {
      src:"/assets/images/applesite/apple2.webp",
      alt: "A beautiful landscape"
  },
  {
      src:"/assets/images/applesite/code.webp",
      alt: "A beautiful landscape"
  },
  {
      src:"/assets/images/applesite/appleip1.webp",
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
        <meta name="description" content="Project page summary and showcase about restaurant template website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Header isActive={isActive} setIsActive={setIsActive}/>
      <Navbar isActive={isActive} setIsActive={setIsActive}/>
      <CurveTransition>
        <TopBar name='My Soul' service='Improving' year='2024' style='Simplistic' price='$2000' link='https://restaurant-gericht-neon.vercel.app/'/>
        <ZoomParallax 
          src1='/assets/images/applesite/apple1.webp' 
          src2='/assets/images/applesite/apple2.webp' 
          src3='/assets/images/applesite/appleipmain.webp' 
          src4='/assets/images/applesite/apple4.webp' 
          src5='/assets/images/applesite/apple5.webp' 
          src6='/assets/images/applesite/appleip2.webp' 
          src7='/assets/images/applesite/color.webp' 
          path='/assets/a-footage/applesite.webm'
          text='Originalita - Skvělý Design - Skvělá Nabídka - Prodeje -'
        />
        <Description  description={description}/>
        <Intro src='/assets/images/ps/apple-site-nobg.webp'/>
        <Sections 
          photos={photos}
          section1={introductionImages}
          text1={introductionPhrases}
          section2={styleImages}
          text2={stylePhrases}
        />
        <NextProjects projects={nextProjects}/>
        <Footer />
      </CurveTransition>
    </>
  );
  // WIP: Add a chart to the projects as a metric on improvements on the projects, what did it improved, how much did it improved, etc.
  // add animated tooltip for creators of that project
}
