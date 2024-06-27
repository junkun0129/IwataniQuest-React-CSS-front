import * as React from "react";
import { Component, useEffect, useState } from "react";
import BattleSelectPanel from "./BattleSelectPanel";
import { enemiesType } from "../types/enemiesType";
import { Player } from "../types/playerTypes";
import { enemiesGenerate } from "../helpers/enemiesReducer";
import {
  getRandomElementsFromArray,
  getRandomUniqueNumbers,
} from "../helpers/functions";
import useSequence from "../hooks/useSequence";
type Props = {
  playerProp: Player;
  onSavePlayer: (player: Player) => void;
};

function BattleScene({ playerProp, onSavePlayer }: Props) {
  const { stats, changeState, actionDispatch, resetStats } = useSequence({
    player: playerProp,
  });

  useEffect(() => {
    const newEnemeis = enemiesGenerate();
    changeState("enemies", newEnemeis);
    return () => {
      resetStats();
    };
  }, []);

  useEffect(() => {
    console.log(stats.sequence);
    console.log(stats.dialog);
    console.log(stats.nextSequence);
    handleSequence();
  }, [stats.sequence]);
  useEffect(() => {
    console.log(stats);
  }, [stats]);

  useEffect(() => {
    if (
      stats.player.status.hp <= 0 ||
      stats.enemies.every((enemy) => enemy.hp <= 0)
    ) {
      changeState("sequence", "endResult");
    }
  }, [stats.player.status.hp, stats.enemies]);

  const handleSequence = () => {
    switch (stats.sequence) {
      case "enemiesAttack":
        enemiesAttack();
        break;
      case "endResult":
        handleBattleRedult();
        break;
      case "end":
        handleBattleEnd();
        break;
      default:
        break;
    }
  };

  const handleBattleRedult = () => {
    let newDialog: string[] = [];
    if (stats.enemies.every((enemy) => enemy.hp === 0)) {
      newDialog.push("勝った");
      newDialog.push("敵をすべて打倒した");
    }
    if (stats.player.status.hp === 0) {
      newDialog.push("負けた");
      newDialog.push("なすすべなく力尽きた。。。。。");
    }
    changeState("dialog", newDialog);
    changeState("selectedDialogIndex", 0);
    changeState("nextSequence", "end");
  };

  const handleBattleEnd = () => {
    resetStats();
    onSavePlayer(stats.player);
  };

  const enemiesAttack = () => {
    if (!stats.enemies) return;
    const activeIndexs = getRandomUniqueNumbers(0, stats.enemies.length - 1);
    activeIndexs.map((index) => {
      if (!stats.enemies) return;
      const activeEnemy = stats.enemies[index];
      const newLines = [
        `${activeEnemy.name}のこうげき！`,
        `${activeEnemy.at}のダメージ！`,
      ];
      const newDialogs = [...stats.dialog, ...newLines];
      changeState("dialog", newDialogs);
    });
    actionDispatch({ type: "enemies", activeIndexs });
    changeState("nextSequence", "select");
  };

  const handleMove = (selectedStats: {
    label: string;
    ap: number;
    targetIndex: number;
  }) => {
    const { label, ap, targetIndex } = selectedStats;
    const targetName = stats.enemies[targetIndex].name;
    let newDialog: string[];
    if (label === "attack") {
      newDialog = [`${targetName}にこうげき！！`, `${ap}ダメージ！！`];
    } else {
      newDialog = [`${targetName}に${label}を使用！`, `${ap}ダメージ！！`];
    }
    actionDispatch({
      type: "player",
      dp: stats.player.status.mp,
      targetIndex: targetIndex,
    });

    changeState("sequence", "playerAttackResult");
    changeState("dialog", newDialog);
    changeState("nextSequence", "enemiesAttack");
    changeState("selectedDialogIndex", 0);
  };

  const handleDialogClick = () => {
    const { selectedDialogIndex, dialog, nextSequence } = stats;
    if (selectedDialogIndex < dialog.length - 1) {
      const newSelectedDialogIndex = selectedDialogIndex + 1;
      changeState("selectedDialogIndex", newSelectedDialogIndex);
    } else {
      if (!nextSequence) return;
      changeState("sequence", nextSequence);
      changeState("dialog", []);
      changeState("nextSequence", null);
      changeState("selectedDialogIndex", 0);
    }
  };

  return (
    <>
      <div style={wrapper}>
        <div style={container}>
          <div style={{ display: "flex" }}>
            <h1>{stats.player.status.hp}</h1>
            {stats.enemies ? (
              stats.enemies.map((enemy, i) => {
                return (
                  <h1
                    style={{ padding: "100px", border: "black 1px solid" }}
                    key={"enemy-display-" + i}
                  >
                    {enemy.name}
                    {enemy.hp}
                  </h1>
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
              onMove={handleMove}
            />
          )}
          {stats.sequence !== "select" && (
            <div
              onClick={handleDialogClick}
              className="w-full h-full bg-blue-300"
            >
              {stats.dialog[stats.selectedDialogIndex]}
            </div>
          )}
        </div>
      </div>
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
