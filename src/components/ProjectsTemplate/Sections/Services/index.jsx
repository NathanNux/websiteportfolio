
import React, { Fragment } from 'react';
import styles from './style.module.scss'
export default function Design () {

    const images = [
        {
            src:"/images/landing/parallaxsection/1.jpg",
            alt: "A beautiful landscape"
        },
        {
            src:"/images/landing/parallax/6.jpg",
            alt: "A beautiful landscape"
        },
        {
            src:"/images/landing/cactus.jpg",
            alt: "A beautiful landscape"
        }
    ]

    const phrases = [
        {
            text: "Design není jen o hezkých a přeplácaných animací a pestrých barvách.<br /><br /> Je to umění sdělit příběh, příběh o tom, kdo jste za čem si stojíte a co můžete přinést do zákazníkova života.<br /><br /> Srozumitelně, čistě a jasně"
        },
        {
            text: "Každý projekt je testimoniálem mé dedikace, inovace a excelence"
        }
    ]
    return (
        <section className={styles.main}>
            <div className={styles.text}>
                {phrases.map((phrase, i) => (
                    <p key={i} data-scroll data-scroll-speed={0.04 * (i + 2)}>
                        <TextWithBr text={phrase.text}  />
                    </p>
                ))}
            </div> 
            
            <div className={styles.images}>
                {images.map((image, i) => (
                    <div key={i} className={styles.imageContainer} data-scroll data-scroll-speed={0.05 * (i + 1)}>
                        <img src={image.src} alt={image.alt} />
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