import Head from "next/head";
import CurveTransition from "@/components/transition/CurveTransition";
import { useEffect } from "react";
import TopBar from "@/components/ProjectsTemplate/TopBar";
import Description from "@/components/common/Description";
import Intro from "@/components/common/Intro";
import ZoomParallax from "@/components/common/ParallaxZoom";
import NextProjects from "@/components/ProjectsTemplate/NextProjects";
import Sections from "@/components/ProjectsTemplate/Sections";

import dynamic from "next/dynamic";
const Footer = dynamic(() => import('@/components/common/Footer'), { ssr: false });
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
      src:"/assets/images/3d-windmill/3dwindmillipmain.png",
      alt: "A beautiful landscape"
  },
  {
      src:"/assets/images/3d-windmill/color.png",
      alt: "A beautiful landscape"
  },
  {
      src:"/assets/images/3d-windmill/3dwind3.png",
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
      src: '/assets/images/3d-windmill/3dwindmillipmain.png',
      alt: 'project1',
      title: 'Hlavní stránka',
  },
  {
      src: '/assets/images/3d-windmill/3dwindmillipmain3.png',
      alt: 'project2',
      title: 'Contact Page',
  },
  {
      src: '/assets/images/3d-windmill/3dwindmillipmain2.png',
      alt: 'project3',
      title: 'Stick Points',
  }
]

//section style images and phrases

const styleImages = [
  {
      src:"/assets/images/3d-windmill/3dwind2.png",
      alt: "A beautiful landscape"
  },
  {
      src:"/assets/images/3d-windmill/code.png",
      alt: "A beautiful landscape"
  },
  {
      src:"/assets/images/3d-windmill/3dwindmillip1.png",
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

  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('locomotive-scroll').then(LocomotiveScroll => {
        const scroll = new LocomotiveScroll.default({
          el: document.querySelector('[data-scroll-container]'),
          smooth: true,
        });

        return () => {
          if(scroll) scroll.destroy();
        };
      });
    }
  }, []);

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
          src1='/assets/images/3d-windmill/3dwind1.png' 
          src2='/assets/images/3d-windmill/3dwind2.png' 
          src3='/assets/images/3d-windmill/3dwindmillipmain.png' 
          src4='/assets/images/3d-windmill/3dwind4.png' 
          src5='/assets/images/3d-windmill/3dwind5.png' 
          src6='/assets/images/3d-windmill/3dwindmillip2.png' 
          src7='/assets/images/3d-windmill/color.png' 
          path='/assets/a-footage/windmill.mp4'
          text='Originalita - Skvělý Design - Skvělá Nabídka - Prodeje -'
        />
        <Description  description={description}/>
        <Intro src='/assets/images/ps/3dwind.png'/>
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
