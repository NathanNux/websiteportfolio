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

//LOREM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISCING ELIT. PROIN IN ERAT LIGULA. VESTIBULUM ELEMENTUM EX ET TELLUS MALESUADA, QUIS CONSECTETUR ORCI CONSECTETUR. VESTIBULUM VOLUTPAT, EST SOLICITUDIN POSUERE CONGUE, AUGUE AUGUE DAPIBUS ENIM, A MAXIMUS NUNC EX EGET DUI. PRAESENT ID VENENATIS QUAM, A EFFICITUR LEO. QUISQUE MAURIS MAGNA, MOLLIS A PHARETRA SED, PLACERAT AUCTOR NISI. ETIAM BIBENDUM NEQUE SIT AMET MI TEMPUS, ID ULLAMCORPER URNA ULTRICIES. PELLENTESQUE VOLUTPAT MASSA AT TORTOR MATTIS, ID SAGITTIS EST FEUGIAT.
//Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin in erat ligula. Vestibulum elementum ex et tellus malesuada, quis consectetur orci consectetur. Vestibulum volutpat, est sollicitudin posuere congue, augue augue dapibus enim, a maximus nunc ex eget dui. Praesent id venenatis quam, a efficitur leo. Quisque mauris magna, mollis a pharetra sed, placerat auctor nisi. Etiam bibendum neque sit amet mi tempus, id ullamcorper urna ultricies. Pellentesque volutpat massa at tortor mattis, id sagittis est feugiat.


const description = [
  {
      text: "LOREM IPSUM DOLOR <br/> SIT AMET, CONSECTETUR<br/> ADIPISCING <br/> ELIT. PROIN IN ERAT <br/> LIGULA. VESTIBULUM"
  },
];


//section introduction images and phrases
const introductionImages = [
  {
      src:"/assets/images/3d-pc/3dpcipmain.webp",
      alt: "picture1"
  },
  {
      src:"/assets/images/3d-pc/color.webp",
      alt: "picture2"
  },
  {
      src:"/assets/images/3d-pc/3dpc1.webp",
      alt: "picture3"
  }
]

//LOREM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISCING ELIT. PROIN IN ERAT LIGULA. VESTIBULUM ELEMENTUM EX ET TELLUS MALESUADA, QUIS CONSECTETUR ORCI CONSECTETUR. VESTIBULUM VOLUTPAT, EST SOLICITUDIN POSUERE CONGUE, AUGUE AUGUE DAPIBUS ENIM, A MAXIMUS NUNC EX EGET DUI. PRAESENT ID VENENATIS QUAM, A EFFICITUR LEO. QUISQUE MAURIS MAGNA, MOLLIS A PHARETRA SED, PLACERAT AUCTOR NISI. ETIAM BIBENDUM NEQUE SIT AMET MI TEMPUS, ID ULLAMCORPER URNA ULTRICIES. PELLENTESQUE VOLUTPAT MASSA AT TORTOR MATTIS, ID SAGITTIS EST FEUGIAT.
//Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin in erat ligula. Vestibulum elementum ex et tellus malesuada, quis consectetur orci consectetur. Vestibulum volutpat, est sollicitudin posuere congue, augue augue dapibus enim, a maximus nunc ex eget dui. Praesent id venenatis quam, a efficitur leo. Quisque mauris magna, mollis a pharetra sed, placerat auctor nisi. Etiam bibendum neque sit amet mi tempus, id ullamcorper urna ultricies. Pellentesque volutpat massa at tortor mattis, id sagittis est feugiat.

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
      src: '/assets/images/3d-pc/3dpcipmain.webp',
      alt: 'project1',
      title: 'Hlavní stránka',
  },
  {
      src: '/assets/images/3d-pc/3dpcipmain3.webp',
      alt: 'project2',
      title: '3D Earth',
  },
  {
      src: '/assets/images/3d-pc/3dpcipmain2.webp',
      alt: 'project3',
      title: '3D Spheres',
  }
]

//section style images and phrases

const styleImages = [
  {
      src:"/assets/images/3d-pc/3dpc2.webp",
      alt: "A beautiful landscape"
  },
  {
      src:"/assets/images/3d-pc/code.webp",
      alt: "A beautiful landscape"
  },
  {
      src:"/assets/images/3d-pc/3dpcip1.webp",
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
        <TopBar name='My Soul' service='Improving' year='2024' style='Simplistic' price='$3000'/>
        <ZoomParallax 
          src1='/assets/images/3d-pc/3dpc1.webp' 
          src2='/assets/images/3d-pc/3dpc2.webp' 
          src3='/assets/images/3d-pc/3dpcipmain.webp' 
          src4='/assets/images/3d-pc/3dpc4.webp' 
          src5='/assets/images/3d-pc/3dpc5.webp' 
          src6='/assets/images/3d-pc/3dpcip2.webp' 
          src7='/assets/images/3d-pc/color.webp' 
          path='/assets/a-footage/3dpc.mp4'
          text='Originalita - Skvělý Design - Skvělá Nabídka - Prodeje -'
        />
        <Description  description={description}/>
        <Intro src='/assets/images/ps/3dpc.webp'/>
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
