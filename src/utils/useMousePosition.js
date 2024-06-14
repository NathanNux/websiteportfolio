import { useEffect, useState } from "react";

export const useMousePosition = (elRef) => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
    const updateMousePosition = ev => {
        if (elRef.current) {
            const rect = elRef.current.getBoundingClientRect();
            setMousePosition({ 
            x: ev.clientX - rect.left, 
            y: ev.clientY - rect.top 
            });
        }
    };
  
    useEffect(() => {
      window.addEventListener("mousemove", updateMousePosition);
  
      return () => window.removeEventListener("mousemove", updateMousePosition);
    }, []);
  
    return mousePosition;
}

// there is an error to explain better here: 
//

// done by copilot, we are setting the mouse position to initialy x: 0, y: 0
// then we are updating the mouse position on mouse move event by adding an event listener to the window object
// simple function that returns the mouse position