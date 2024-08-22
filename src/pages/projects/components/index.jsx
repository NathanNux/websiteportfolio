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
      text: " BASKETBALISTY A <br/> STUDENTA ARCHITEKTURY <br/> AŽ PO <br/> WEBOVÉHO DESIGNERA <br/> s FULLSTACK PROFESÍ"
  },
];


//section introduction images and phrases
const introductionImages = [
  {
      src:"/assets/images/components/components-ipmain.webp",
      alt: "A beautiful landscape"
  },
  {
      src:"/assets/images/components/color.webp",
      alt: "A beautiful landscape"
  },
  {
      src:"/assets/images/components/components3.webp",
      alt: "A beautiful landscape"
  }
]

const introductionPhrases = [
  {
      text: "Design není jen o hezkých a přeplácaných animací a pestrých barvách.<br /><br /> Je to umění sdělit příběh, příběh o tom, kdo jste za čem si stojíte a co můžete přinést do zákazníkova života.<br /><br /> Srozumitelně, čistě a jasně"
  },
  {
      text: "Každý projekt je testimoniálem mé dedikace, inovace a excelence"
  }
]

//section mobile view photos
const photos = [
  {
      src: '/assets/images/components/components-ipmain.webp',
      alt: 'project1',
      title: 'Hlavní stránka',
  },
  {
      src: '/assets/images/components/components-ipmain3.webp',
      alt: 'project2',
      title: '3D modely',
  },
  {
      src: '/assets/images/components/components-ipmain2.webp',
      alt: 'project3',
      title: 'Adv. Carousel',
  }
]

//section style images and phrases

const styleImages = [
  {
      src:"/assets/images/components/components2.webp",
      alt: "A beautiful landscape"
  },
  {
      src:"/assets/images/components/code.webp",
      alt: "A beautiful landscape"
  },
  {
      src:"/assets/images/components/components-ip1.webp",
      alt: "A beautiful landscape"
  }
]

const stylePhrases = [
  {
      text: "Je to sice težký a náročný proces vytvořit Parádní Nabídku, ale s mými jednoduchými a účinými systémy to zvládneme.<br /><br />Pomůžu vám s každým krokem k vytvoření  nabídky, která nastaví novou laťku nejenom pro Vás ale i pro vaše nové zákazníky."
  },
  {
      text: "A mé praktiky Vám i přenechám"
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
        <TopBar name='My Soul' service='Improving' year='2024' style='Simplistic' price='$2000'/>
        <ZoomParallax 
          src1='/assets/images/components/components1.webp' 
          src2='/assets/images/components/components2.webp' 
          src3='/assets/images/components/components-ipmain.webp' 
          src4='/assets/images/components/components4.webp' 
          src5='/assets/images/components/components5.webp' 
          src6='/assets/images/components/components-ip2.webp' 
          src7='/assets/images/components/color.webp' 
          path='/assets/a-footage/beginner-components-1.mp4'
          text='Originalita - Skvělý Design - Skvělá Nabídka - Prodeje -'
        />
        <Description  description={description}/>
        <Intro src='/assets/images/ps/components.webp'/>
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
