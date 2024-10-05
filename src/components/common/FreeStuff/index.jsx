import { useEffect, useRef, useState } from "react";
import Projects from "./Projects";
import { motion, useScroll, useTransform } from "framer-motion";

import gsap from "gsap";
import { scaleAnim } from "@/components/anim";
import { useLoad } from "@/context";

export default function FreeOffers ({text}) {
    const [modal, setModal] = useState(false)

    const cursor = useRef(null); 
    const label = useRef(null);
    const section = useRef(null);
    const projectsRef = useRef(null);
    const curve = useRef(null);

    const { isHomeCountry } = useLoad();

    const { scrollYProgress } = useScroll({
        target: curve,
        offset: ['start end', 'end start']
    })

    const height = useTransform(scrollYProgress, [0, 1], [800, 0])

    // Debounce function
    const debounce = (func, delay) => {
        let debounceTimer;
        return function() {
            const context = this;
            const args = arguments;
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => func.apply(context, args), delay);
        }
    }

    useEffect(() => {
        const projectsElement = projectsRef.current;
        const sectionElement = section.current;

        let scrollY = window.scrollY;

        const handleScroll = () => {
            scrollY = window.scrollY;
        };

        const handleMouseEnter = () => setModal(true);
        const handleMouseLeave = () => setModal(false);

        const handleMouseMove = (e) => {
            const {clientX, clientY} = e;
            const rect = sectionElement.getBoundingClientRect();

            const x = clientX - rect.left;
            const y = clientY - rect.top;

            if (modal) {
                gsap.to(cursor.current, {left: x, top: y, duration: 0.8, ease: 'power3'});
                gsap.to(label.current, {left: x, top: y, duration: 0.8, ease: 'power3'});
            }
        };

        window.addEventListener("scroll", handleScroll, debounce(100));
        projectsElement.addEventListener("mouseenter", handleMouseEnter);
        projectsElement.addEventListener("mouseleave", handleMouseLeave);
        sectionElement.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("scroll", handleScroll, debounce(1));
            projectsElement.removeEventListener("mouseenter", handleMouseEnter);
            projectsElement.removeEventListener("mouseleave", handleMouseLeave);
            sectionElement.removeEventListener("mousemove", handleMouseMove);
        }
    },[modal])

                //LOREM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISCING ELIT. PROIN IN ERAT LIGULA. VESTIBULUM ELEMENTUM EX ET TELLUS MALESUADA, QUIS CONSECTETUR ORCI CONSECTETUR. VESTIBULUM VOLUTPAT, EST SOLICITUDIN POSUERE CONGUE, AUGUE AUGUE DAPIBUS ENIM, A MAXIMUS NUNC EX EGET DUI. PRAESENT ID VENENATIS QUAM, A EFFICITUR LEO. QUISQUE MAURIS MAGNA, MOLLIS A PHARETRA SED, PLACERAT AUCTOR NISI. ETIAM BIBENDUM NEQUE SIT AMET MI TEMPUS, ID ULLAMCORPER URNA ULTRICIES. PELLENTESQUE VOLUTPAT MASSA AT TORTOR MATTIS, ID SAGITTIS EST FEUGIAT.
                //Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin in erat ligula. Vestibulum elementum ex et tellus malesuada, quis consectetur orci consectetur. Vestibulum volutpat, est sollicitudin posuere congue, augue augue dapibus enim, a maximus nunc ex eget dui. Praesent id venenatis quam, a efficitur leo. Quisque mauris magna, mollis a pharetra sed, placerat auctor nisi. Etiam bibendum neque sit amet mi tempus, id ullamcorper urna ultricies. Pellentesque volutpat massa at tortor mattis, id sagittis est feugiat.
    return (
        <section ref={section} className="mainFreeStuff">
            { text && <div className="text">
                <h1>{ isHomeCountry ? "Začínáte s omezeným rozpočtem? Tady je systém, který můžete použít hned:" : "Starting on a Budget? Here's the Framework You Can Use Right Now:"}</h1>
                <p>
                    {isHomeCountry ? "Hele, chápu to. Vím, že začátky jsou extra težké. Proto vám dám základ mé práce _zdarma_, pokud teprve začínáte nebo je můj rozpočet mimo váš dosah." : "Look, I get it — starting from scratch is hard. That's why I'm giving you the core of my work _for free_ if you're just starting out or if I'm out of your budget."}
                </p>
                <p>
                    {isHomeCountry ? "Dobrá zpráva: Nejste na to sami. Po téměř 3000 hodinách práce jsem vytvořil přímý systém, který vám pomůže tohle pro jednou rozkousnout." : "Good news: You don't have to do this alone. After nearly 3000 hours of work, I've created a straightforward framework to help you tackle these challenges head-on."}
                </p>
                <p>
                    {isHomeCountry ? "Ukážu vám přesné zkratky, principy a pravidla, která jsem se naučil po tisících hodinách. Naučíte se, jak navrhovat, spravovat svůj web, a dokonce vytvořit nabídku - i když přiznávám, nabídka chce čas, aby byla aspoň blízko k perfektní (ona nikdy moc není)." : "I'll show you the exact shortcuts, frameworks, and rules I've spent thousands of hours mastering. You'll learn how to design, manage your site, and even craft your offer—although I'll be real, the offer takes a bit more time to get right."}
                </p>
                <p
                    //maybe cut this out.
                >
                    {isHomeCountry ? "Představte si plně optimalizovaný web připravený za jediný týden, s potřebou pouhých 14 hodin soustředěné práce. Zní to dosažitelně, že? Rozdělím vše na jednoduché, akční kroky, takže můžete budovat efektivní návyky." : "Imagine having a fully optimized website ready in just one week, needing only about 14 hours of focused work. Sounds achievable, right? I'll break everything down into easy, actionable steps, so you can build effective habits."} 
                </p>
                <p>
                    {isHomeCountry ? "Tyto principy fungují v jakémkoliv oboru a jsou osvědčené k dosažení výsledků bez zbytečných dohadů. A vám to zabere jen zlomek času, co to trvalo mně." : "These principles work in any industry, and they're proven to get results without all the guesswork. And it'll take you a fraction of the time it took me to figure it all out."}
                </p>
                <p>
                    {isHomeCountry ? "Ale tady je ten háček: Bude to vyžadovat váš závazek. Pokud jste připraveni zjednodušit svou cestu a řešit problémy efektivně, udělejme to spolu. Není to jen o správnosti, ale o přeměně vašeho online přítomnosti na silný nástroj pro úspěch. Jste připraveni jednat?" : "But here's the catch: This will require your commitment. If you're ready to simplify your journey and solve your issues efficiently, let's make it happen together. This isn't just about getting it right; it's about transforming your online presence into a powerful tool for success. Are you ready to take action?"}
                </p>
                <p>
                    {isHomeCountry ? "Zní to dobře? Připraveni jít zkratkou?" : "Sound good? Ready to take the shortcut?"}
                </p>
                <p>
                    {isHomeCountry ? "Teď Pozor: pokud chcete být v obraze ohledně mého nadcházejícího obsahu, sledujte mě na sociálních sítích. Brzy to bude hotové a můžete mi věřit, že dodám opravdovou hodnotu. Věřte mi, nechcete si nechat ujít, co přichází!" : "Listen up: if you want to stay in the loop for my upcoming content, follow me on social media. I'll have it ready soon, and you can count on me to deliver serious value. Trust me, you won't want to miss what's coming!"}
                </p>
            </div>}

            <div ref={projectsRef} className="projects">
                <Projects/>
            </div>

            <motion.div ref={cursor} className="cursor" variants={scaleAnim} animate={modal ? 'enter': 'exit'}></motion.div>
            <motion.div ref={label} className="label" variants={scaleAnim} animate={modal ? 'enter': 'exit'}>
                <p>{ isHomeCountry ?  "Získat" : "Obtain"}</p>
            </motion.div>

            <div 
                ref={curve}
                className="svgContainer"
            >
                <motion.div layout style={{height}}  className="svgDiv"></motion.div>
            </div>
        </section>
    )
}