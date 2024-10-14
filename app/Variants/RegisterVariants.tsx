




export const RegisterVariants = {
    hidden: {
        y: -1000
    },
    visible: {
        y: 0,
        transition: {
            type: 'spring',
            stiffness: 100,
            when: "beforeChildren"
        }
    },
    hover: {
        boxShadow:"10px 10px 20px 1px rgba(20,86,114)"

    },
    exit: {
        opacity: 0,
         y: 50 
    }

}



export const RegisterInputVariants = {
    hidden: {
        x: '100vw'
    },
    visible: {
        x: 0,
        transition: {
            type: 'spring',
            stiffness: 100,
            duration: 0.7,
        }
    },
    focus: {
        boxShadow:"10px 10px 20px 1px rgba(20,86,114)"

    }
}


export const RegisterLableVariants = {
    hidden: {
        x: '100vw'
    },
    visible: {
        x: 0,
        transition: {
            type: 'spring',
            stiffness: 100,
            duration: 0.3,
        }
    },
  

}