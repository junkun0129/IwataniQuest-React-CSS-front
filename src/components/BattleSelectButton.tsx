import { motion } from "framer-motion";
import * as React from "react";
import { Component, useState } from "react";
type Props = {
  label: string;
  onclick: (label: string) => void;
};
function BattleSelectButton({ label, onclick }: Props) {
  return (
    <>
      <motion.div
        whileHover={{
          border: "white 6px solid",
          borderRadius: "9px",
          cursor: "pointer",
        }}
        style={{
          color: "white",
          fontSize: "1.5rem",
          padding: "15px",
          borderRadius: "9px",
        }}
        onClick={() => onclick(label)}
      >
        {label}
      </motion.div>
    </>
  );
}

export default BattleSelectButton;
