export const slideUp = {
    initial: {
        y: 150,
        opacity: 0
    },
    enter: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.5,
            delay: 0.6,
            ease: [0.76, 0, 0.24, 1]
        }
    }
}
//leaving it here, its different from the one in anim.js
//specific to this page and how it should impress the user

export const scale = {
    initial: {
        width: '80%',
        height: '80%',
        y: 100,
    },
    enter: {
        width: '100vw',
        height: '100vh',
        y: 0,
        transition: {
            delay: 0.6,
            duration: 0.5,
            ease: [0.76, 0, 0.24, 1]
        }
    }
}