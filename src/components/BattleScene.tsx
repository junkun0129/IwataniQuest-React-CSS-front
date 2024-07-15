import * as React from "react";
import { Component, useEffect, useState } from "react";
import BattleSelectPanel from "./BattleSelectPanel";
import { Player } from "../types/playerTypes";
import { enemiesGenerate } from "../helpers/enemiesReducer";
import { getRandomUniqueNumbers } from "../helpers/functions";
import useSequence, { Dialog } from "../hooks/useSequence";
import { motion, useAnimate } from "framer-motion";
import { enemiesComponentMapping } from "../assets/enemies";
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
      <motion.div
        animate={playerAnimationControl}
        className="w-full h-full absolute"
      >
        <div className="w-full h-full relative">
          <div className=" flex justify-around w-full h-[60%] items-center bg-white">
            {stats.enemies ? (
              stats.enemies.map((enemy, i) => {
                return (
                  <motion.div
                    custom={i}
                    animate={enemiesAnimationControl}
                    key={"enemy-display-" + i}
                    className="flex flex-col items-center justify-center w-[30%] h-[100%]"
                  >
                    {enemy.name}
                    {` HP：${enemy.hp}`}
                    {enemiesComponentMapping[enemy.name]}
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
