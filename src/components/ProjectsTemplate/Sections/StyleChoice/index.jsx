import { Fragment } from 'react';
import Image from 'next/image';
export default function StyleChoice ({images, phrases}) {
    return (
        <section className="mainSectionStyleChoice">
            <div className="text">
                {phrases.map((phrase, i) => (
                    <p key={i} data-scroll data-scroll-speed={0.04 * (i + 2)}>
                        <TextWithBr text={phrase.text} />
                    </p>                
                ))}
            </div>
            
            <div className="images">
                {images.map((image, i) => (
                    <div key={i} className="imageContainer" data-scroll data-scroll-speed={0.05 * (i + 1)}>
                        <Image src={image.src} alt={image.alt} quality={60} loading='lazy' fill={true} sizes='(min-width: 500px) 50vw, 50vh' />
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