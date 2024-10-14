


export const commentListFormVariants =(delay: number = 0) => ({
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: {
      delay,
      duration:0.5,
      type: "spring",
      stiffness: 100,
      when: "beforeChildren"
    } },
    exit: {opacity: 0, y: 50,  transition: {
      delay,
      duration:0.5,
      type: "spring",
      stiffness: 100,
      when: "beforeChildren"
    } },
  });
  
  export const commentTextVariants = {
    hidden: { opacity: 0, x: -50, y: -20 },
    visible: { opacity: 1, y: 0 , x: 0,   transition: {
      duration:0.5,
      type: "spring",
      stiffness: 100,
    } },
    exit: { opacity: 0, x: 50, y: 20,   transition: {
      duration:0.5,
      type: "spring",
      stiffness: 100,
    }},
   
  };
  
  export const commentLikeVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0,   transition: {
      duration:0.5,
      type: "spring",
      stiffness: 100,
    } },
    exit: { opacity: 0, y: -30,   transition: {
      duration:0.5,
      type: "spring",
      stiffness: 100,
    } },
  };