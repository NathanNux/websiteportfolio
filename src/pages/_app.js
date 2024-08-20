import "@/styles/globals.scss";
import { LoadProvider } from "@/context";
import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps, router }) {
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    // Actions to be taken every time the pathname changes
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 1500);

    // Actions to be taken only once on component mount
    if (typeof window !== 'undefined') {
      let locomotiveScrollInstance;

      const setupLocomotiveScroll = async () => {
        const LocomotiveScroll = (await import('locomotive-scroll')).default;
        locomotiveScrollInstance = new LocomotiveScroll({
          el: document.querySelector('[data-scroll-container]'),
          smooth: true,
        });
      };

      setupLocomotiveScroll();

      setTimeout(() => {
        setIsLoading(false);
        document.body.style.cursor = 'default';
        window.scrollTo(0, 0);
      }, 2000);

      // Cleanup function to destroy locomotive scroll instance when component unmounts or pathname changes
      return () => {
        if (locomotiveScrollInstance) locomotiveScrollInstance.destroy();
      };
    }
  }, [pathname]); // This useEffect depends on pathname

  //now i need o pit all the content inside the AnimatePresence component to make the animations work

  return (
    <LoadProvider>
      <AnimatePresence mode="wait">
        <Component key={router.route} {...pageProps} />
      </AnimatePresence>
    </LoadProvider>
  );
}