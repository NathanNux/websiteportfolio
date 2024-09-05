import "@/styles/globals.scss";
import "@/styles/styles.scss";
import { LoadProvider } from "@/context";
import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import Head from "next/head";

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
    <Head>
      <meta name="description" content="Personal Portfolio Website" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
      <title>Matěj Forejt</title>
    </Head>
    <AnimatePresence mode="wait">
      <Component key={router.route} {...pageProps} />
    </AnimatePresence>
  </LoadProvider>
)
}
