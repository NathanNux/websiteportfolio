import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

// this is first time im doing this so i will need to look into it more
// this eventually sets the state if the user has loaded the page for the first time or not all across the app

const LoadContext = createContext();

export function LoadProvider({ children }) {
    const [ firstLoad, setFirstLoad ] = useState(true);
    const [ delayAnim, setDelayAnim ] = useState(true);
    const [ isLoading, setIsLoading ] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [ isHomeCountry, setIsHomeCountry ] = useState(false);
    const [ isSaved, setIsSaved ] = useState(false);
    const [modem, setModem] = useState(false);



    const pathname = usePathname();

    useEffect(() => {
        setTimeout(() => {
            setFirstLoad(false);
        }, 2000);
    }, []);

    useEffect(() => {
        setTimeout(() => {
            setDelayAnim(false);
        }, 3500);
    }, []);
    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 3000);

        return () => clearTimeout(timer);
        // when the pages are switched too frequently it lags out, and the state is not refreshed
        // so by using conts timer and then cleaning it up, it will refresh the state and the state works properly
    }, [pathname]);

    return (
        <LoadContext.Provider value={{ firstLoad, setFirstLoad, delayAnim, setDelayAnim, isLoading, setIsLoading, isVisible, setIsVisible, isHomeCountry, setIsHomeCountry, isSaved, setIsSaved, modem, setModem }}>
            {children}
        </LoadContext.Provider>
    );
}

export function useLoad() {
    const context = useContext(LoadContext);
    if(context === undefined) {
        throw new Error('useLoad must be used within a LoadProvider');
    }
    const { firstLoad, setFirstLoad, delayAnim, setDelayAnim, isLoading, setIsLoading, isVisible, setIsVisible, isHomeCountry, setIsHomeCountry, isSaved, setIsSaved, modem, setModem } = context;
    return { firstLoad, setFirstLoad, delayAnim, setDelayAnim, isLoading, setIsLoading, isVisible, setIsVisible, isHomeCountry, setIsHomeCountry, isSaved, setIsSaved, modem, setModem };
}