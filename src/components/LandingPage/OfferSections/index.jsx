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
          path: '/assets/b-footage/beginner-components-montage-3.webm',
          alt: "A beautiful landscape",
          app: "A beautiful landscape"
        }
      ],
      phrases: [
        {
          text: isHomeCountry
            ? "<span>Ale je tu jeden háček:</span><br /><br /> Bude to vyžadovat vaši spolupráci. Pokud jste připraveni zjednodušit si cestu a efektivně<span> řešit své problémy, tak pojďme do toho.</span><br />  Tady nejde jen o to to udělat správně; jde o to proměnit vaši online přítomnost v nástroj úspěchu.<br /><br /> <span>Jste připraveni jednat?</span>"
            : "<span>But here's the catch:</span><br /><br /> This will require your commitment. If you're ready to simplify your journey and solve your issues efficiently,<span> let's make it happen together.</span><br /> This isn't just about getting it right; it's about transforming your online presence into a powerful tool for success.<br /><br /> <span>Are you ready to take action?</span>"
        },
        {
          text: isHomeCountry
            ? "<span>Ten skutečný rozdíl?</span> -- Nabídky.  <br /><br />Buďme upřímní—i když váš web vypadá skvěle,<span> ale neprodává, tak prohráváte</span> a váš web je jen drahá vizitka a finanční zátěž.<span> To nechci dopustit.</span> <br /><br />Vaše firma potřebuje prodeje, aby se jí dařilo. Společně vytvoříme <span>nabídky, které budou neodolatelné, a strategie, které promění návštěvníky v zákazníky.</span>"
            : "<span>The real game-changer?</span> -- Offers. <br /><br />Let's be real, even if your website looks stunning,<span> but you're not selling,</span> you're losing and it leaves your website being a glorified business card and a liability.<span> I'm not going to let that happen.</span> <br /><br />Your business needs sales to thrive. I know it, you know it. We'll work together to craft<span> irresistible offers</span> and build strategies that convert visitors into customers. "
        }
      ]
    },
    {
      images: [
        {   
          path: '/assets/images/slider-la/videos/research.webm',
          src: "/assets/images/slider-la/performance.webp",
          alt: "A beautiful landscape",
          app: "A beautiful landscape"
        },
        {
          src:"/assets/images/slider-la/performance.webp",
          alt: "A beautiful landscape"
        },
        {
          path: '/assets/b-footage/apple-carousel-snippet.webm',
          src: "/assets/images/slider-la/performance.webp",
          alt: "A beautiful landscape",
          app: 'A beautiful landscape'
        }
      ],
      phrases: [
        {
          text: isHomeCountry
            ? "<span>A teď to vylepšíme:</span><br /><br /> Nevybuduju Vám web a potom zmizím, <br /><span>ale budu ho i sledovat a spravovat — každý klik, každou akci, měsíc co měsíc.</span> Vylepšíme ho společně dokud nebude perfektní, aby fungoval co nejlíp.<br /><br /> <span>A ten Hosting a správa?</span> Vše je součástí naši dohody a to bez dalších nákladů, zdarma."
            : "<span>And it gets better.</span><br /><br />I don't just build it and leave you hanging. <br /><span>I track everything and manage all of it</span>—every click, every action, month after month. <span>We'll improve it over time, so it performs even better.</span><br /><br />And hosting and management?<span> All in it and for free as part of our deal. </span>"
        },
        {
          text: isHomeCountry
            ? "<span>A ještě něco navíc:</span><br /><br /> Garantuju vám, že dosáhnete <span>špičkových hodnocení</span> na Google Lighthouse—výkon, přístupnost, nejlepší praktiky, SEO. Pokud vám nedodám alespoň <span>90%</span> ve třech z těchto oblastí,<span> vrátím vám peníze. Tohle nikdo jiný nenabízí.</span>"
            : "<span>And here's the cherry on top:</span><br /><br /> I guarantee you'll get <span>top ratings</span> on Google Lighthouse—performance, accessibility, best practices, SEO. If I don't get you <span>90%</span> or higher in at least three areas, <span>you get your money back. No one else offers that.</span>"
        },
        {
          text: isHomeCountry
            ? "<span>A další bonus?</span> Veškeré textové změny, aktualizace nabídek a další úpravy<span> jsou bez dalších poplatků.</span><br /><br /><span>Proč?</span> No, proč ne?<span> Nikdo jiný to nenabízí — Takže budu první.</span><br /><br /> Ale..."
            : "<span>And even to top it all up,</span> every text change, offer update, or other adjustments<span> are included at no extra cost.</span><br /><br /><span> Why?</span> Well, why not?<span> No one else offers this—I'm going to be the first!</span><br /><br /> But..."
        },
      ]
    },
    {
      images: [
        {   
          path: '/assets/images/slider-la/videos/visualization.webm',
          src: "/assets/images/slider-la/performance.webp",
          alt: "A beautiful landscape",
          app: "A beautiful landscape"
        },
        {
          src: "/assets/images/slider-la/coding.webp",
          alt: "A beautiful landscape"
        },
        {
          path: '/assets/images/slider-la/videos/analytics.webm',
          src: "/assets/images/slider-la/seo.webp",
          alt: "A beautiful landscape",
          app: 'A beautiful landscape'
        }
      ],
      phrases: [
        {
          text: isHomeCountry
            ? "<span>Tady je to, kde to velká většina lidí vezme za špatný konec:</span><br /><br /><span> Mnoho agentur Vám předá web za více než 4 000 dolarů a pak zmizí.</span> Ale skutečné náklady nekončí.<br /><br /><span> Chcete aktualizace? To je za příplatek. Chcete správu? Měsíční poplatky.</span> Ročně můžete snadno platit 12 až 26 tísíc jen za základní údržbu — 120 až 260 tisíc za jednu dekádu, a to pokud vše půjde hladce.<br /><br /><span> A to nepočítáme původní cenu webu.</span> Nepomeňte, myslíme tu dlouhodobě - dakády."
            : "<span>Here's the reality checker:</span><br /><br /><span> Many agencies hand over a website charging well over $4K and vanish</span>, but the real cost doesn't stop there.<br /><br /><span> Want updates? That's extra. Want management? Monthly fees.</span> You could easily be paying $600-$2000 a year just for basic upkeep—$6,000 to $20,000 over a decade, and that's if everything goes smoothly. <br /><br /><span> Not counting the original price you paid when you got started.</span> Remember, we are here for the long run - decades."
        },
        {
          text: isHomeCountry
            ? "<span>Tenhle marketing a cenování se mnou nesouzní, jakože vůbec...</span><br /><br /> Mohl bych si klidně účtovat, to co stojím, za samotný design,<span>  ale mně jde o víc než jen jednorázový obchod.</span>  Jsem tu, abych s vámi vybudoval partnerství a důvěru pro něco většího.<br /><br /><span> Vybudovat vizi.</span>"
            : "<span>That approach doesn't sit right with me, like at all...</span><br /><br /> I could easily charge what I cost just for the design alone,<span> but I'm here for more than a one-time transaction.</span>I'm here to partner with you to build something bigger. <br /><br /><span>Create a Vision.</span>"
        },
        {
          text: isHomeCountry
          ? "<span>Takže tohle je moje férová cena za všechno:</span> 60 až 120 tisíc Korun.<br /><br /><span> Proč tak velký rozdíl? </span> <br /><br />No, každá práce je jiná, někdy to vyžaduje nové napady nebo postupy a systémy,<span> ale pokud je to jednodušší, nebudu si přece účtovat za něco, co jsem neudělal.</span> To by bylo přece nesmysl, ne?"
          : "<span>So this is my fair price for all of this:</span>  $3000 to $6000 budget.<br /><br /><span> Why this big gap?</span> <br /><br />Well, every work is different, sometimes it needs to get new irritations of my system,<span> but if it is simpler, I won't charge you for something I did not do,</span> that sounds silly, right?"
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