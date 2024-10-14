 




export const notificationVariants = {

    hidden: {
        
        x: 100,
        opacity: 0,
     
    },
    visible: {
        x: -24,
        opacity: 1,
        transition: {
            duration: 0.3,
            type: 'spring',
            stiffness: 120,
            when: "beforeChildren"
        }
    }
}


export const notificationTextVariants = {

    hidden: {
        y: 30,
        opacity: 0,
    },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.2,
            type: 'spring',
            stiffness: 100,
        }
    }
}