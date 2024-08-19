import { useMotionValue } from "framer-motion";
import { useEffect, useRef } from "react";

export default function useMouse(containerRef) {
    const mouse = {
        x: useMotionValue(0),
        y: useMotionValue(0),
    }

    const mouseMove = (e) => {
        const { clientX, clientY } = e;
        const rect = containerRef.current.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;
        mouse.x.set(x);
        mouse.y.set(y);
    }

    const scroll = (e) => {
        const y = window.scrollY;
        mouse.y.set(y);
    }

    // Debounce function
    const debounce = (func, delay) => {
        let debounceTimer;
        return function() {
            const context = this;
            const args = arguments;
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => func.apply(context, args), delay);
        }
    }

    useEffect(() => {
        const element = containerRef.current;
        element.addEventListener("mousemove", mouseMove);
        window.addEventListener("scroll", debounce(scroll, 500)); // Debounce scroll updates

        // Cleanup function
        return () => {
            element.removeEventListener("mousemove", mouseMove);
            window.removeEventListener("scroll", debounce(scroll, 0.1));
            //important: remove the event listener when the component is unmounted instantly for performance
            // this helps so much the the smoothens of the animation
        };
    }, [scroll, mouseMove]);

    return mouse;
}