import { useEffect, useState } from "react";

export default function useDimensions() {
    const [dimensions, setDimensions] = useState({
        width: 0,
        height: 0,
    });

    const resize = () => {
        const {innerWidth, innerHeight} = window;
        setDimensions({
            width: innerWidth,
            height: innerHeight,
        });
    };

    useEffect(() => {
        resize();
        window.addEventListener("resize", resize);
        return () => window.removeEventListener("resize", resize);
    }, []);

    return dimensions;
}