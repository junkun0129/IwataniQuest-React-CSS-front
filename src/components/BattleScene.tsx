import * as React from "react";
import { Component, useEffect, useState } from "react";
import BattleSelectPanel from "./BattleSelectPanel";
import { enemiesType } from "../types/enemiesType";
import { Player } from "../types/playerTypes";
import { enemiesGenerate } from "../helpers/enemiesReducer";
import { getRandomUniqueNumbers } from "../helpers/functions";
import useSequence, { Dialog } from "../hooks/useSequence";
import { motion, useAnimate } from "framer-motion";
type Props = {
  playerProp: Player;
  onSavePlayer: (player: Player) => void;
};

function BattleScene({ playerProp, onSavePlayer }: Props) {
  const {
    stats,
    changeState,
    resetStats,
    handleDialogClick,
    handlePlayerMove,
    playerAnimationControl,
    enemiesAnimationControl,
  } = useSequence({
    player: playerProp,
  });

  useEffect(() => {
    const newEnemeis = enemiesGenerate();
    changeState("enemies", newEnemeis);
  }, []);

  useEffect(() => {
    if (stats.sequence === "end") {
      onSavePlayer(stats.player);
    }
  }, [stats.sequence]);

  return (
    <>
      <motion.div animate={playerAnimationControl} style={wrapper}>
        <div style={container}>
          <div style={{ display: "flex" }}>
            {stats.enemies ? (
              stats.enemies.map((enemy, i) => {
                return (
                  <motion.div
                    custom={i}
                    animate={enemiesAnimationControl}
                    style={{ padding: "100px", border: "black 1px solid" }}
                    key={"enemy-display-" + i}
                  >
                    {enemy.name}
                    {enemy.hp}
                  </motion.div>
                );
              })
            ) : (
              <div>Loading Enemies.....</div>
            )}
          </div>
          {stats.sequence === "select" && (
            <BattleSelectPanel
              player={stats.player}
              enemies={stats.enemies}
              onMove={handlePlayerMove}
            />
          )}
          {stats.sequence !== "select" && (
            <div
              onClick={handleDialogClick}
              className="w-full h-full bg-blue-300"
            >
              {stats.dialog
                ? stats.dialog[stats.selectedDialogIndex]?.text
                : ""}
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
}

export default BattleScene;

const wrapper: React.CSSProperties = {
  position: "absolute",
  width: `100vw`,
  height: `100vh`,
  backgroundColor: "skyblue",
};

const container: React.CSSProperties = {
  width: "100%",
  height: "100%",
  position: "relative",
  backgroundColor: "beige",
};
