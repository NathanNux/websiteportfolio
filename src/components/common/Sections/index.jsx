
import React, { Fragment, useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export default function Section ({images, phrases, styles}) {
    const [ isLoaded, setIsLoaded ] = useState(false)
    const [ isVisible, setIsVisible ] = useState(false)
    const columnRef = useRef(null)

    useEffect( () => {
        const currentColumn = columnRef.current
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach( entry => {
                    if(entry.isIntersecting) {
                        setIsVisible(true)
                    }
                })
            },
            { threshold: 0.05 }
        )

        if (currentColumn) {
            observer.observe(currentColumn); // Observe the column
        }
        return () => {observer.disconnect()}
    }, [images])

    return (
        <section className="sectionContainer">
            <div className="text">
                {phrases.map((phrase, i) => (
                    <p key={i} data-scroll data-scroll-speed={0.04 * (i + 2)}>
                        <TextWithBr text={phrase.text}  />
                    </p>
                ))}
            </div> 
            
            <div className="images" ref={columnRef}>
                {images.map((image, i) => (
                    <div key={i} className="imageContainer" data-scroll data-scroll-speed={0.05 * (i + 1)}>
                        {!image.path && <Image src={image.src} alt={image.alt} fill sizes="true"/>}
                        {isVisible && image.path && 
                            <video
                                autoPlay
                                playsInline
                                loop
                                muted
                                onLoadedData={ () => setIsLoaded(true)}
                                style={{ display: isLoaded ? "block" : "none"}}
                            >
                                <source src={image.path} type="video/mp4"/>
                            </video>
                        }
                        {image.path && !isLoaded && <Image src={image.src} alt={image.alt} fill sizes="true"/>}
                    </div>
                ))}
            </div>
        </section>
    )
}

const TextWithBr = ({ text }) => {
    // Split the text into lines using <br /> as the separator
    const lines = text.split('<br />');
  
    return (
      <>
        {lines.map((line, i) => (
          <Fragment key={i}>
            {line}
            {i < lines.length - 1 && <br />}
          </Fragment>
        ))}
      </>
    );
  };