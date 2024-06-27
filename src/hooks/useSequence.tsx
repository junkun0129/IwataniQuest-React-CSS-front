import React, { useState } from "react";
import { enemiesType } from "../types/enemiesType";
import { Player } from "../types/playerTypes";
import { enemies } from "../assets/enemies";
import { enemiesGenerate } from "../helpers/enemiesReducer";
type Dispatch = {
  type: "setEnemy" | "setPlayer" | "";
  payload: string;
};
type Sequence =
  | "select"
  | "playerAttackResult"
  | "enemiesAttack"
  | "endResult"
  | "end";
type Stats = {
  sequence: Sequence;
  enemies: enemiesType[];
  player: Player;
  dialog: string[];
  nextSequence: Sequence | null;
  selectedDialogIndex: number;
};
type ActionDispatch =
  | {
      type: "player";
      dp: number;
      targetIndex: number;
    }
  | {
      type: "enemies";
      activeIndexs: number[];
    };

const useSequence = ({ player }: { player: Player }) => {
  const newEnemeis = enemiesGenerate();

  const initialStatsState: Stats = {
    sequence: "select",
    enemies: newEnemeis,
    player,
    dialog: [],
    nextSequence: null,
    selectedDialogIndex: 0,
  };
  const [stats, setstats] = useState<Stats>(initialStatsState);

  const changeState = <K extends keyof Stats>(key: K, value: Stats[K]) => {
    setstats((pre) => ({
      ...pre,
      [key]: value,
    }));
  };

  const actionDispatch = (action: ActionDispatch) => {
    const { type } = action;
    if (type === "player") {
      let saveEnemies = stats.enemies.map((enemy) => ({ ...enemy }));
      saveEnemies[action.targetIndex].hp -= action.dp;
      changeState("enemies", saveEnemies);
    } else if (type === "enemies") {
      let newStatus = { ...stats.player.status };
      const { activeIndexs } = action;
      activeIndexs.map((index) => {
        console.log(enemies[index], "enemy");
        console.log(enemies[index].at);
        newStatus.hp -= enemies[index].at;
      });
      const newPlayer = { ...stats.player, status: newStatus };
      changeState("player", newPlayer);
    }
  };

  const resetStats = () => {
    setstats(initialStatsState);
  };

  return { stats, changeState, actionDispatch, resetStats };
};

export default useSequence;
