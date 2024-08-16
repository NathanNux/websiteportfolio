import React, { useState, useEffect } from 'react';

import styles from './style.module.scss';

const CountdownTimer = ({ targetDate }) => {
    const calculateTimeLeft = () => {
        const difference = +new Date(targetDate) - +new Date();
        let timeLeft = {};
        
        if (difference > 0) {
            timeLeft = {
            dnů: Math.floor(difference / (1000 * 60 * 60 * 24)),
            h: Math.floor((difference / (1000 * 60 * 60)) % 24),
            m: Math.floor((difference / 1000 / 60) % 60),
            s: Math.floor((difference / 1000) % 60),
            };
        }
        
        return timeLeft;
    };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <div>
      {Object.keys(timeLeft).length > 0 && (
        <div className={styles.date}>
          {Object.keys(timeLeft).map((interval) => (
            <span key={interval}>
              {timeLeft[interval]}{interval} {' '}{' '}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default CountdownTimer;