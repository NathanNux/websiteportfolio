import { useEffect, useState } from "react";

function getTimeString(isHomeCountry) {
  const date = new Date();
  const options = { hour: '2-digit', minute: '2-digit', hour12: false, timeZoneName: 'short' };

  if (isHomeCountry) {
    options.timeZone = 'Europe/Prague';
    return date.toLocaleTimeString('en-US', options).replace('GMT+1', 'CET').replace('GMT+2', 'CEST');
  } else {
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    options.timeZone = userTimeZone;
    const timeString = date.toLocaleTimeString('en-US', options);

    // Replace GMT offset with appropriate time zone abbreviation
    const timeZoneAbbreviations = {
      'GMT+1': 'CET',
      'GMT+2': 'CEST',
      'GMT+0': 'GMT',
      'GMT-5': 'EST',
      'GMT-4': 'EDT',
      'GMT-6': 'CST',
      'GMT-7': 'MST',
      'GMT-8': 'PST',
      'GMT-9': 'AKST',
      'GMT-10': 'HST',
      // Add more time zone abbreviations as needed
    };

    return Object.keys(timeZoneAbbreviations).reduce((acc, gmt) => {
      return acc.replace(gmt, timeZoneAbbreviations[gmt]);
    }, timeString);
  }
}

export default function TimeComponent({ isHomeCountry }) {
  const [timeString, setTimeString] = useState('');

  useEffect(() => {
    const updateTime = () => setTimeString(getTimeString(isHomeCountry));
    updateTime(); // Initial call to set the time string

    // Update time string every minute
    const now = new Date();
    const msUntilNextMinute = 60000 - (now.getSeconds() * 1000 + now.getMilliseconds());
    const timeoutId = setTimeout(() => {
      updateTime();
      const intervalId = setInterval(updateTime, 60000);
      return () => clearInterval(intervalId);
    }, msUntilNextMinute);

    // Cleanup function
    return () => clearTimeout(timeoutId);
  }, [isHomeCountry]);

  return <span>{timeString}</span>;
}