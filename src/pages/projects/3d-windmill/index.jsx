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
      src:"/assets/images/3d-windmill/3dwindmillipmain.webp",
      alt: "A beautiful landscape"
  },
  {
      src:"/assets/images/3d-windmill/color.webp",
      alt: "A beautiful landscape"
  },
  {
      src:"/assets/images/3d-windmill/3dwind3.webp",
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
      src: '/assets/images/3d-windmill/3dwindmillipmain.webp',
      alt: 'project1',
      title: 'Hlavní stránka',
  },
  {
      src: '/assets/images/3d-windmill/3dwindmillipmain3.webp',
      alt: 'project2',
      title: 'Contact Page',
  },
  {
      src: '/assets/images/3d-windmill/3dwindmillipmain2.webp',
      alt: 'project3',
      title: 'Stick Points',
  }
]

//section style images and phrases

const styleImages = [
  {
      src:"/assets/images/3d-windmill/3dwind2.webp",
      alt: "A beautiful landscape"
  },
  {
      src:"/assets/images/3d-windmill/code.webp",
      alt: "A beautiful landscape"
  },
  {
      src:"/assets/images/3d-windmill/3dwindmillip1.webp",
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
        <meta name="description" content="Project page summary and showcase about 3d-windmill website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Header isActive={isActive} setIsActive={setIsActive}/>
      <Navbar isActive={isActive} setIsActive={setIsActive}/>
      <CurveTransition>
        <TopBar name='My Soul' service='Improving' year='2024' style='Simplistic' price='$2000'/>
        <ZoomParallax 
          src1='/assets/images/3d-windmill/3dwind1.webp' 
          src2='/assets/images/3d-windmill/3dwind2.webp' 
          src3='/assets/images/3d-windmill/3dwindmillipmain.webp' 
          src4='/assets/images/3d-windmill/3dwind4.webp' 
          src5='/assets/images/3d-windmill/3dwind5.webp' 
          src6='/assets/images/3d-windmill/3dwindmillip2.webp' 
          src7='/assets/images/3d-windmill/color.webp' 
          path='/assets/a-footage/windmill.webm'
          text='Originalita - Skvělý Design - Skvělá Nabídka - Prodeje -'
        />
        <Description  description={description}/>
        <Intro src='/assets/images/ps/3dwind.webp'/>
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
