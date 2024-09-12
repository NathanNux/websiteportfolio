import CookieClick from '@/components/common/CookieButton/clickButton';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Cookies from 'js-cookie';
import axios from 'axios';

export default function CookieBanner({ isSaved, setIsSaved, setModem, setIsVisible }) {
  const [isEU, setIsEU] = useState(false);

  useEffect(() => {
    const checkLocation = async () => {
      try {
        const response = await axios.get('https://ipapi.co/json/');
        const { country_code } = response.data;
        const euCountries = ['AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE'];
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
              Tento web používá soubory cookie k zajištění správné funkčnosti a zlepšení uživatelského zážitku.
            </p>
            <div className="banner__buttons">
              <div className="banner__buttons__first">
                <CookieClick title="Přijmout" trigger="prijmout" onClick={handleAccept} />
                <CookieClick title="Zamítnout" trigger="zamitnout" onClick={handleDecline} />
              </div>
              {isEU && (
                <div className="banner__buttons__second">
                  <CookieClick title="Nastavit" trigger="nastavit" onClick={handleSettings} />
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}