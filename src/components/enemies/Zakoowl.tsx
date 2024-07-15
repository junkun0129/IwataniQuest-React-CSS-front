import { motion, useMotionValue, useSpring } from "framer-motion";
import React from "react";

const Zakoowl = () => {
  const motionY = useMotionValue(0);
  const springY = useSpring(motionY);

  return (
    <div
      style={{
        fontSize: "100px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <motion.div style={{ x: 0, y: springY, scaleX: -1 }}>🪽</motion.div>
      <motion.div
        style={{ fontSize: "120px", x: 0, y: motionY }}
        animate={{
          y: [0, -20, 0, 20, 0],
          transition: {
            duration: 2,
            ease: "easeInOut",
            repeat: Infinity,
          },
        }}
        className="-mx-12"
      >
        🦉
      </motion.div>
      <motion.div style={{ x: 0, y: springY }}>🪽</motion.div>
    </div>
  );
};

export default Zakoowl;
