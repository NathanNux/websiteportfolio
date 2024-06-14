import "@/styles/globals.scss";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps, router }) {

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
  <AnimatePresence mode="wait">
    <Component key={router.route} {...pageProps} />
  </AnimatePresence>
)
}
