export const translate = {
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

//another example of a different animation that is specific to this page

export const opacity = {
    initial: {
        opacity: 0,
    },
    enter: {
        opacity: 1,
        transition: {
            duration: 0.5,
            ease: [0.76, 0, 0.24, 1],
            delay: 0.6
        }
    },
    exit: {
        opacity: 0,
        transition: {
            duration: 0.5,
            ease: [0.76, 0, 0.24, 1],
        }
    }
}

export const slideUp = {
    initial: {
        y: '50%',
        scale: 0.8
    },
    enter: {
        y: '0%',
        scale: 1,
        transition:{
            duration: 0.5,
            ease: [0.76, 0, 0.24, 1],
            delay: 0.5
        }
    }
}


export const slide = {
    initial: {
        x: '-100%',
        opacity: 0,
    },
    enter: {
        x: '0%',
        opacity: 1,
        transition: {
            duration: 0.5,
            ease: [0.76, 0, 0.24, 1]
        }
    },
    exit: {
        x: '100%',
        opacity: 0,
        transition: {
            duration: 0.5,
            ease: [0.76, 0, 0.24, 1]
        },
        transitionEnd: {
            display: 'none'
        }
    }
}