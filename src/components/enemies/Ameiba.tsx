import { motion, useMotionValue, useSpring } from "framer-motion";
import React from "react";

const Ameiba = () => {
  const motionY = useMotionValue(0);
  const springY = useSpring(motionY);

  return (
    <div
      style={{
        fontSize: "100px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      <motion.div
        style={{ fontSize: "150px", x: 0, y: motionY }}
        animate={{
          y: [0, 10, 0],
          transition: {
            duration: 2,
            ease: "easeInOut",
            repeat: Infinity,
          },
        }}
        className="-mx-12"
      >
        🦠
      </motion.div>
      <motion.div
        style={{
          x: 0,
          y: springY,
          fontSize: "30px",
          position: "absolute",
          left: "0px",
          top: "70px",
        }}
      >
        👀
      </motion.div>
    </div>
  );
};

export default Ameiba;
