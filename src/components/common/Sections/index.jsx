
import React, { Fragment, useState } from 'react';
import Image from 'next/image';

export default function Section({ images, phrases, styles }) {
    const [isMediaReady, setIsMediaReady] = useState(false); // Simplified state

    return (
        <section className={styles.sectionContainer}>
            <div className={styles.text}>
                {phrases.map((phrase, i) => (
                    <p key={i} data-scroll data-scroll-speed={0.04 * (i + 2)}>
                        <TextWithBr text={phrase.text} />
                    </p>
                ))}
            </div>

            <div className={styles.images}>
                {images.map((image, i) => (
                    <div key={i} className={styles.imageContainer} data-scroll data-scroll-speed={0.05 * (i + 1)}>
                        {image.path ? (
                            <video
                                autoPlay
                                loop
                                muted
                                onLoadedData={() => setIsMediaReady(true)}
                                style={{ display: isMediaReady ? "block" : "none" }}
                            >
                                <source src={image.path} type="video/mp4" />
                            </video>
                        ) : (
                            <Image src={image.src} alt={image.alt} fill sizes="true" />
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
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