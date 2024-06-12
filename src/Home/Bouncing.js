import React from "react";
import { motion } from "framer-motion";

const BouncingText = () => {
  return (
    <motion.div
      animate={{
        y: [0, 10, 0],
        transition: {
          duration: 0.5,
          ease: "easeInOut",
          repeat: Infinity,
        },
      }}
    >
      <h1 style={{fontFamily:'monospace',fontSize:'3rem',textAlign:'center'}}>READY TO MAKE DIFFERENCE?</h1>
    </motion.div>
  );
};

export default BouncingText;