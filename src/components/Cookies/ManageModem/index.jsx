import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import CookieClick from '@/components/common/CookieButton/clickButton';
import { motion, AnimatePresence, delay } from 'framer-motion';

export default function CookieSettingsModal({ modem, setModem, setIsVisible, setIsSaved }) {
  const [performance, setPerformance] = useState(false);
  const [targeting, setTargeting] = useState(false);
  const [functional, setFunctional] = useState(false);
  const [unclassified, setUnclassified] = useState(false);

  useEffect(() => {
    setPerformance(Cookies.get('performance') === 'true');
    setTargeting(Cookies.get('targeting') === 'true');
    setFunctional(Cookies.get('functional') === 'true');
    setUnclassified(Cookies.get('unclassified') === 'true');
  }, []);

  const handleSave = () => {
    Cookies.set('performance', performance.toString(), { expires: 365 });
    Cookies.set('targeting', targeting.toString(), { expires: 365 });
    Cookies.set('functional', functional.toString(), { expires: 365 });
    Cookies.set('unclassified', unclassified.toString(), { expires: 365 });
    setModem(false);
    setIsSaved(true);
    setTimeout(() => {
        setIsVisible(false);
    }, 900);
  };


  const blur = {
    initial: {
      opacity: 0,
    },
    enter: {
      opacity: 1,
      transition: {
        duration: 0.2,
        ease: [0.76, 0, 0.24, 1],
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.2,
        delay: 0.4,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  };
  
  const opacity = {
    initial: {
      opacity: 0,
    },
    enter: {
      opacity: 1,
      transition: {
        duration: 0.4,
        delay: 0.2,
        ease: [0.76, 0, 0.24, 1],
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.4,
        delay: 0.2,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  };

  return (
    <AnimatePresence mode="wait">
        {modem && 
            <motion.div className="modem">
                <motion.div className="modem__background" variants={blur} initial='initial' animate='enter' exit='exit'></motion.div>
                <motion.div className="modem__content" variants={opacity} initial='initial' animate='enter' exit='exit'>
                    <div className="modem__header">
                    <h1>Cookie Settings</h1>
                    <div className="modem__burger" onClick={() => setModem(false)} />
                    </div>
                    <p className="modem__text">
                    Choose what cookies you allow us to use. You can read more about our cookies in our{' '}
                    <a href="/cookies">cookie policy</a>.
                    </p>
                    <div className="modem__checkboxes">
                    <div className="modem__checkbox">
                        <input
                        type="checkbox"
                        id="performance"
                        className="modem__input"
                        checked={performance}
                        onChange={(e) => setPerformance(e.target.checked)}
                        />
                        <label htmlFor="performance">Performance Cookies</label>
                    </div>
                    <div className="modem__checkbox">
                        <input
                        type="checkbox"
                        id="targeting"
                        checked={targeting}
                        className="modem__input"
                        onChange={(e) => setTargeting(e.target.checked)}
                        />
                        <label htmlFor="targeting">Targeting Cookies</label>
                    </div>
                    <div className="modem__checkbox">
                        <input
                        type="checkbox"
                        id="functional"
                        className="modem__input"
                        checked={functional}
                        onChange={(e) => setFunctional(e.target.checked)}
                        />
                        <label htmlFor="functional">Functional Cookies</label>
                    </div>
                    <div className="modem__checkbox">
                        <input
                        type="checkbox"
                        id="unclassified"
                        className="modem__input"
                        checked={unclassified}
                        onChange={(e) => setUnclassified(e.target.checked)}
                        />
                        <label htmlFor="unclassified">Unclassified Cookies</label>
                    </div>
                    </div>
                    <div className="modem__buttons">
                    <CookieClick title="Uložit" trigger="ulozit" onClick={handleSave} />
                    </div>
                </motion.div>
            </motion.div>
        }
    </AnimatePresence>
  );
}