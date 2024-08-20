import "@/styles/globals.css";
import { LoadProvider } from "@/context";
import { AnimatePresence } from "framer-motion";

export default function App({ Component, pageProps, router }) {

  //now i need o pit all the content inside the AnimatePresence component to make the animations work

  return (
  <LoadProvider>
    <AnimatePresence mode="wait">
      <Component key={router.route} {...pageProps} />
    </AnimatePresence>
  </LoadProvider>
)
}
