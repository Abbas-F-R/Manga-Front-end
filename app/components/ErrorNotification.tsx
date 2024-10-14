// components/ErrorNotification.tsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { notificationTextVariants, notificationVariants } from "../Variants/NotificationVariants";

interface ErrorNotificationProps {
  message: string;
  showError: boolean;
}

const ErrorNotification: React.FC<ErrorNotificationProps> = ({ message, showError }) => {
  const [visible, setVisible] = useState(showError);

  useEffect(() => {
    if (showError) {
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showError]);

  if (!visible) return null; 

  return (
    <div 
    className="fixed top-0 right-0 bottom-0 left-0 z-10 ">
    <motion.div
    variants={notificationVariants}
    initial="hidden"
    animate="visible"
  
     className="sticky  w-fit p-2 bg-gray-900 text-red-700 rounded-lg shadow-lg shadow-red-800  justify-center" style={{ top: '90%', left: '85%' }}>
      <motion.p
        variants={notificationTextVariants}>{message}</motion.p>
    </motion.div>
  </div>
  
  
  );
};

export default ErrorNotification;
