export const opacity = {
    initial: {
      opacity: 0 
    },
    enter: {
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: 0.6,
        ease: [0.76, 0, 0.24, 1]
      }
    }
};

export const textOpacity = {
  initial: {
      opacity: 0
  },
  open: {
      opacity: 1,
      transition: {duration: 1.5},
      delay: 0.5
  },
  closed: {
      opacity: 0,
      transition: {duration: 1.5},
      delay: 0.5
  }
}


export const slideUp = {
  initial: {
      y: 300,
  },
  enter: {
      y: 0,
      transition: {duration: 0.6, ease: [0.33, 1, 0.68, 1], delay: 0.65}
  }
}

export const FirstSlideUp = {
    initial: {
        y: 500,
    },
    enter: {
        y: 0,
        transition: {duration: 0.6, ease: [0.33, 1, 0.68, 1], delay: 2.55}
    },
  }

export const textSlideUp = {
  initial: {
      y: "100%"
  },
  open: (i) => ({
      y: "0%",
      transition: {duration: 0.5, delay: 0.01 * i}
  }),
  closed: {
      y: "100%",
      transition: {duration: 0.5}
  }
}

export const scale = {
  initial: {
      scale: 0,
  },
  enter: {
      scale: 1,
      transition: {
          duration: 0.5,
          ease: [0.48, 0.15, 0.25, 0.96],
      },
  },
  exit: {
      scale: 0,
      transition: { 
          duration: 0.5,
          ease: [0.48, 0.15, 0.25, 0.96],
      },
  },
  
}

export const scaleAnim = {
  initial: {
      scale: 0,
      x: "-50%",
      y: "-50%",
  },
  enter: {
      scale: 1,
      x: "-50%",
      y: "-50%",
      transition: {duration: 0.3, ease: [0.76, 0, 0.24, 1]}
  },
  exit: {
      scale: 0,
      x: "-50%",
      y: "-50%",
      transition: {duration: 0.3, ease: [0.32, 0, 0.67, 0]}
  }
}

export const shade = {
  initial: {
      filter: "blur(0px)",
      opacity: 1,
  },
  open: {
      filter: "blur(4px)",
      opacity: 0.6,
      transition: {duration: 0.3},
  },
  closed: {
      filter: "blur(0px)",
      opacity: 1,
      transition: {duration: 0.3},
  }
}

export const textTranslate = {
  // we are using absolutely positioned elements so we need to animate the top property
  initial: {
      y: "100%",
      opacity: 0
  },
  enter: (i) => ({
      y: 0,
      opacity: 1,
      transition: {duration: 0.5, ease: [0.76, 0, 0.24, 1], delay: i[0]}
  }),
  exit: (i) => ({
      y: "100%",
      opacity: 0,
      transition: {duration: 0.3, ease: [0.76, 0, 0.24, 1], delay: i[1]}
  })
}
