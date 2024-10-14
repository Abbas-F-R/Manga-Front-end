

export const headerVariants = {
    hidden: {
      scaleX: 0,
      opacity: 0,
    },
    visible: {
        scaleX: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        type: 'spring',
        stiffness: 120,
        when: "beforeChildren",
      },
    },
    exit: {
      x: 0,
      opacity: 0,
      transition: {
        duration: 1,
        type: 'spring',
        stiffness: 120,
        when: "beforeChildren",
      },
    },
  };
  

export const HeaderContentVariants = (duration: number = 0.5 , y: number = 0, x: number = 0) =>  ({

    hidden: {
        y,
        x,
        opacity: 0,
     
    },
    visible: {
        y: 0,
        x:0,
        opacity: 1,
        transition: {
            duration,
            type: 'spring',
            stiffness: 120,
        }
    }
});


export const HeaderLinksVariants = (duration: number = 0 , y: number = 0, x: number = 0) =>  ({

  hidden: {
      y,
      x,
      opacity: 0,
   
  },
  visible: {
      y: 0,
      x:0,
      opacity: 1,
      transition: {
          duration ,
          type: 'spring',
          stiffness: 120,
      }
  },
  exit: {
    x: 0,
    opacity: 0,
    transition: {
      duration: 0.7,
    },
  },
});

// utils/motionVariants.ts

export const PathVariants = {
  hidden: {
    opacity: 0,
    pathLength: 0,
  },
  visible: {
    opacity: 1,
    pathLength: 1,
    transition: {
      duration: 2,
     ease: 'easeInOut'
    },
  },
  exit: {
    opacity: 0,
    pathlength: 0,
    transition: {
      duration: 1,
      ease: 'easeInOut'

    },
  },

}



