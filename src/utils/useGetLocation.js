import { useLoad } from "@/context";
import axios from "axios";
import { useEffect } from "react";

export default function useGetLocation() {
  const {isHomeCountry, setIsHomeCountry} = useLoad();

  useEffect(() => {
      const checkLocation = async () => {
        try {
          const response = await axios.get('https://ipapi.co/json/');
          const { country_code } = response.data;
          const homeCountries = ['CZ', 'SK'];
          setIsHomeCountry(homeCountries.includes(country_code));
        } catch (error) {
          console.log('Error happened when detecting location:', error);
        }
      };
  
      checkLocation();
  }, []);
}