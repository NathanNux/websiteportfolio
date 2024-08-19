import { useEffect, useState } from "react";
import throttle from 'lodash/throttle';
// this throttle will limit the number of times the function is called - the number of times the component will rerender
// it will be called every 100ms and makes the anim hell a lot faster and smoother

export const useMousePosition = (elRef) => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
    const updateMousePosition = throttle(ev => {
        if (elRef.current) {
            const rect = elRef.current.getBoundingClientRect();
            setMousePosition({ 
            x: ev.clientX - rect.left, 
            y: ev.clientY - rect.top 
            });
        }
    }, 50); // Adjust this value to change the throttling rate here
  
    useEffect(() => {
      window.addEventListener("mousemove", updateMousePosition);
  
      return () => window.removeEventListener("mousemove", updateMousePosition);
    }, [updateMousePosition]);
  
    return mousePosition;
}

// there is an error to explain better here: 
//

// done by copilot, we are setting the mouse position to initialy x: 0, y: 0
// then we are updating the mouse position on mouse move event by adding an event listener to the window object
// simple function that returns the mouse position