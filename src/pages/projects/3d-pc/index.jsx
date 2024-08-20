import Head from "next/head";
import CurveTransition from "@/components/transition/CurveTransition";
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
      src:"/assets/images/3d-pc/3dpcipmain.png",
      alt: "picture1"
  },
  {
      src:"/assets/images/3d-pc/color.png",
      alt: "picture2"
  },
  {
      src:"/assets/images/3d-pc/3dpc1.png",
      alt: "picture3"
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
      src: '/assets/images/3d-pc/3dpcipmain.png',
      alt: 'project1',
      title: 'Hlavní stránka',
  },
  {
      src: '/assets/images/3d-pc/3dpcipmain3.png',
      alt: 'project2',
      title: '3D Earth',
  },
  {
      src: '/assets/images/3d-pc/3dpcipmain2.png',
      alt: 'project3',
      title: '3D Spheres',
  }
]

//section style images and phrases

const styleImages = [
  {
      src:"/assets/images/3d-pc/3dpc2.png",
      alt: "A beautiful landscape"
  },
  {
      src:"/assets/images/3d-pc/code.png",
      alt: "A beautiful landscape"
  },
  {
      src:"/assets/images/3d-pc/3dpcip1.png",
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
          src1='/assets/images/3d-pc/3dpc1.png' 
          src2='/assets/images/3d-pc/3dpc2.png' 
          src3='/assets/images/3d-pc/3dpcipmain.png' 
          src4='/assets/images/3d-pc/3dpc4.png' 
          src5='/assets/images/3d-pc/3dpc5.png' 
          src6='/assets/images/3d-pc/3dpcip2.png' 
          src7='/assets/images/3d-pc/color.png' 
          path='/assets/a-footage/3dpc.mp4'
          text='Originalita - Skvělý Design - Skvělá Nabídka - Prodeje -'
        />
        <Description  description={description}/>
        <Intro src='/assets/images/ps/3dpc.png'/>
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
