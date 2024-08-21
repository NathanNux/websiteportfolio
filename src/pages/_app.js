import "@/styles/globals.scss";
import "@/styles/styles.scss";
import { LoadProvider } from "@/context";
import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function App({ Component, pageProps, router }) {

  //now i need o put all the content inside the AnimatePresence component to make the animations work

  const pathname = usePathname();

    useEffect(() => {
        const timer = setTimeout(() => {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
        }, 1000)

        return () => {
            clearTimeout(timer);
        }
    }, [pathname])


  return (
  <LoadProvider>
    <AnimatePresence mode="wait">
      <Component key={router.route} {...pageProps} />
    </AnimatePresence>
  </LoadProvider>
)
}
