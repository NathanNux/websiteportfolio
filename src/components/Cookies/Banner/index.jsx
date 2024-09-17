import CookieClick from '@/components/common/CookieButton/clickButton';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useLoad } from '@/context';

export default function CookieBanner({ isSaved, setIsSaved, setModem, setIsVisible }) {
  const [isEU, setIsEU] = useState(false);
  const { isHomeCountry } = useLoad()

  useEffect(() => {
    const checkLocation = async () => {
      try {
        const response = await axios.get('https://ipapi.co/json/');
        const { country_code } = response.data;
        // look at all countries with GDPR in EU and not in EU and with similar laws, like asia, canada etc.
        const euCountries = [
          'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE', 'GB', // GDPR countries
          'CH', // Switzerland
          'BH', 'IL', 'QA', 'TR', // Middle East
          'KE', 'MU', 'NG', 'ZA', 'UG', // Africa
          'JP', 'KR', // Asia
          'NZ', // Oceania
          'AR', 'BR', 'UY', // South America
          'CA' // North America
        ];        
        setIsEU(euCountries.includes(country_code));
      } catch (error) {
        console.log('Error happened when detecting location:', error);
      }
    };

    checkLocation();
  }, []);

  const slide = {
    initial: {
      x: '100%',
      y: '100%',
      opacity: 0,
      scale: 0,
    },
    enter: {
      x: '0%',
      y: '0%',
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        delay: 3,
        ease: [0.76, 0, 0.24, 1],
      },
    },
    exit: {
      x: '100%',
      y: '100%',
      opacity: 0,
      scale: 0,
      transition: {
        duration: 1.2,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  };

  const handleAccept = () => {
    Cookies.set('cookieAccepted', 'true', { expires: 365 });
    Cookies.set('analytics', 'true', { expires: 365 });
    Cookies.set('marketing', 'true', { expires: 365 });
    setIsSaved(true);
    setTimeout(() => {
        setIsVisible(false);
    }, 900);
  };

  const handleDecline = () => {
    Cookies.set('cookieAccepted', 'false', { expires: 365 });
    Cookies.set('analytics', 'false', { expires: 365 });
    Cookies.set('marketing', 'false', { expires: 365 });
    setIsSaved(true);
    setTimeout(() => {
        setIsVisible(false);
    }, 900);
  };

  const handleSettings = () => {
    // Open settings modal
    setModem(true);
  };

  return (
    <AnimatePresence mode="wait">
      {!isSaved && (
        <motion.div className="banner" initial="initial" animate="enter" exit="exit" variants={slide}>
          <motion.div className="banner__content">
            <div className="banner__header">
              <h3 className="banner__title">Cookies</h3>
              <div className="banner__burger" onClick={() => setIsVisible(false)} />
            </div>
            <p className="banner__text">
              { isHomeCountry ? "Tento web používá soubory cookie k zajištění správné funkčnosti a zlepšení uživatelského zážitku." : "This site is using cookies to ensure correct functionality and improve the user experience."}
            </p>
            <div className="banner__buttons">
              <div className="banner__buttons__first">
                <CookieClick title={ isHomeCountry ? "Přijmout" : "Accept"} trigger="prijmout" onClick={handleAccept} />
                <CookieClick title={ isHomeCountry ? "Zamítnout" : "Deny"} trigger="zamitnout" onClick={handleDecline} />
              </div>
              {isEU && (
                <div className="banner__buttons__second">
                  <CookieClick title={ isHomeCountry ? "Nastavit" : "Settings"} trigger="nastavit" onClick={handleSettings} />
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}