import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Section from '@/components/common/Sections';
import useGetLocation from "@/utils/useGetLocation";
import { useLoad } from "@/context";

export default function OfferSection() {
  const section = useRef(null);
  const { scrollYProgress } = useScroll({
    target: section,
    offset: ['start end', 'end start']
  });

  const height = useTransform(scrollYProgress, [0, 1], [30, 0]);

  useGetLocation();
  const { isHomeCountry } = useLoad();

  const sections = [
    {
      images: [
        {   
          src:'/assets/images/slider-la/color-pallet.webp',
          path: '/assets/images/slider-la/videos/color.webm',
          alt: "A beautiful landscape",
          app: "A beautiful landscape"
        },
        {
          src:"/assets/images/projects/smoothscroll.webp",
          alt: "A beautiful landscape"
        },
        {
          src:'/assets/images/slider-la/coding.webp',
          path: '/assets/a-footage/gsap-all.webm',
          alt: "A beautiful landscape",
          app: "A beautiful landscape"
        }
      ],
      phrases: [
        {
          text: isHomeCountry
            ? "Znám vše, co se týká dobrého designu, a někdy i rád porušuji jeho providla, protože tu jsou od toho, aby se porušovala.<br /><br />Správný Layout? Paleta Barev? CTA? Pokročilé animace s malým načítacím časem?<br /><br />Máte to mít!"
            : "I know everything about good design, and sometimes I like to break its rules because they are there to be broken.<br /><br />Proper Layout? Color Palette? CTA? Advanced animations with minimal loading time?<br /><br />You got it!"
        },
        {
          text: isHomeCountry
            ? "Design je základ tohoto ekosystému, originální kábát a profesionální online vizitka pro vaše nové a stálé zákazníky.<br /><br />38% návštěvníků opustí web, pokud nebude mít dobrý design. 88% z nich se už nevrátí. To je realita."
            : "Design is the foundation of this ecosystem, an original coat and a professional online business card for your new and regular customers.<br /><br />38% of visitors will leave a website if it doesn't have a good design. 88% of them will not return. That's the reality."
        }
      ]
    },
    {
      images: [
        {   
          path: '/assets/images/slider-la/videos/offer.webm',
          src: "/assets/images/slider-la/performance.webp",
          alt: "A beautiful landscape",
          app: "A beautiful landscape"
        },
        {
          src:"/assets/images/slider-la/performance.webp",
          alt: "A beautiful landscape"
        },
        {
          path: '/assets/images/slider-la/videos/research.webm',
          src: "/assets/images/slider-la/performance.webp",
          alt: "A beautiful landscape",
          app: 'A beautiful landscape'
        }
      ],
      phrases: [
        {
          text: isHomeCountry
            ? "Budu s Vámi spolupracovat na vytvoření nabídky tak dobré, u které se budou vaši zákazníci cítít hloupě, když ji nevezmou.<br /><br /> Taky Vám ukážu důležité kroky o tom, jak něco takového dát dohromady:<br /><br /> Se Systémem, který je intuitivní, přímočarý a snadno zopakovatelný."
            : "I will work with you to create an offer so good your customers will feel stupid not to take it.<br /><br /> I will also show you the fundamental steps on how to put something like this together:<br /><br /> With a system that is intuitive, straightforward, and easily repeatable."
        },
        {
          text: isHomeCountry
            ? "Mé weby jsou size hezké, ale bude to pro vás velký Náklad, když nebudete mít nabídku. Bez ni nic neprodáte.<br /><br /> To strácí celou pointu mít web. Web, který vypadá dobře, ale neumí prodat."
            : "My websites are nice, but it will be a big expense for you if you don't have an offer. Without it, you won't sell anything.<br /><br /> That loses the whole point of having a website. A website that looks good but can't sell."
        }
      ]
    },
    {
      images: [
        {   
          path: '/assets/images/slider-la/videos/analytics.webm',
          src: "/assets/images/slider-la/performance.webp",
          alt: "A beautiful landscape",
          app: "A beautiful landscape"
        },
        {
          src: "/assets/images/slider-la/coding.webp",
          alt: "A beautiful landscape"
        },
        {
          path: '/assets/images/slider-la/videos/visualization.webm',
          src: "/assets/images/slider-la/seo.webp",
          alt: "A beautiful landscape",
          app: 'A beautiful landscape'
        }
      ],
      phrases: [
        {
          text: isHomeCountry
            ? "Nabízím jednorázový balík, který Vám dá všechno, co potřebujete, a dokonce i to, o čem ani nevíte, že potřebujete. Je až tak komplexní práce.<br /><br /> Věnoval jsem mému umění už tísíce hodin, abych věděl, co to stojí, o co jde a jak to vyrešit tou nejsnažší cestou."
            : "I offer a one-time package that gives you everything you need, and even things you don't know you need. It's that of a complex work.<br /><br /> I have dedicated thousands of hours to my craft to know what it takes, what it's about, and how to solve it in the easiest way."
        },
        {
          text: isHomeCountry
            ? "A jsem si natolik jistý, že jsem ochoten Vám vrátit pěníze a obětovat hordu času, pokud svou práci neodvedu tak dobře, jak vím, že ji umím odvést."
            : "And I am so confident that I am willing to give you your money back and sacrifice  tons of time if I don't do my job as well as I know I can."
        }
      ]
    }
  ];

  return (
    <section ref={section} className="offersLanding">
      <div className="mainSections">
        <div className="main">
          {sections.map((section, i) => (
            <Section key={i} images={section.images} phrases={section.phrases} />
          ))}
        </div>
      </div>
      <motion.div style={{ height }} className="svgContainer">
        <div className="svgDiv"></div>
      </motion.div>
    </section>
  );
}