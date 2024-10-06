import "@/styles/globals.scss";
import "@/styles/styles.scss";
import { LoadProvider } from "@/context";
import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import Head from "next/head";
import useGetLocation from "@/utils/useGetLocation";

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
      <title>Matěj Forejt - Freelancer</title>
      <script type="text/javascript">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "oefksnfi6w");
          `}
        </script>
    </Head>
    <AnimatePresence mode="wait">
      <Component key={router.route} {...pageProps} />
    </AnimatePresence>
  </LoadProvider>
)
}
