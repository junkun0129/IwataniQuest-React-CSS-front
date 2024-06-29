import React, { useEffect, useState } from "react";
import { enemiesType } from "../types/enemiesType";
import { Player } from "../types/playerTypes";
import { enemies } from "../assets/enemies";
import { enemiesGenerate } from "../helpers/enemiesReducer";
import { getRandomUniqueNumbers } from "../helpers/functions";
import { useAnimate, useAnimation, useAnimationControls } from "framer-motion";
import { scale } from "../const";
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

export type Dialog = {
  type: "attack" | "damage" | "result";
  subject?: "player" | "enemies";
  targetIndex?: number;
  text: string;
};

type Stats = {
  sequence: Sequence;
  enemies: enemiesType[];
  player: Player;
  dialog: Dialog[];
  nextSequence: Sequence | null;
  selectedDialogIndex: number;
  isAnimation: boolean;
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

  const playerAnimationControl = useAnimationControls();
  const enemiesAnimationControl = useAnimationControls();

  const initialStatsState: Stats = {
    sequence: "select",
    enemies: newEnemeis,
    player,
    dialog: [],
    nextSequence: null,
    selectedDialogIndex: 0,
    isAnimation: false,
  };
  const [stats, setstats] = useState<Stats>(initialStatsState);

  useEffect(() => {
    if (
      stats.player.status.hp <= 0 ||
      stats.enemies.every((enemy) => enemy.hp <= 0)
    ) {
      changeState("sequence", "endResult");
    }
  }, [stats.player.status.hp, stats.enemies]);

  useEffect(() => {
    handleSequence();
  }, [stats.sequence]);

  useEffect(() => {
    if (stats.isAnimation) return;
    if (!stats.selectedDialogIndex) return;

    const { subject = "unkown", type } =
      stats.dialog[stats.selectedDialogIndex];

    if (type === "attack") {
      if (subject === "player") {
      }
      if (subject === "enemies") {
        invokeAnimation(enemyMoveAnimation);
      }
    }

    if (type === "damage") {
      if (subject === "player") {
        invokeAnimation(plalerGetDamageAnimation);
      }
      if (subject === "enemies") {
        invokeAnimation(enemyGetDamageAnimation);
      }
    }
  }, [stats.selectedDialogIndex]);

  const plalerGetDamageAnimation = async () => {
    await playerAnimationControl.start({
      x: [-100, 0],
    });
  };
  const enemyGetDamageAnimation = async () => {
    if (!stats.selectedDialogIndex) return;
    const { targetIndex = null } = stats.dialog[stats.selectedDialogIndex];
    if (!targetIndex === null) return;
    await enemiesAnimationControl.start((i) => {
      if (i === targetIndex) {
        return { x: [100, 0] };
      }
      return {};
    });
  };
  const enemyMoveAnimation = async () => {
    if (!stats.selectedDialogIndex) return;
    const { targetIndex = null } = stats.dialog[stats.selectedDialogIndex];

    if (!targetIndex) return;
    await enemiesAnimationControl.start((i) => {
      if (i === targetIndex) {
        return { y: [100, 0] };
      }
      return {};
    });
  };

  const invokeAnimation = async (callback: () => void) => {
    changeState("isAnimation", true);
    callback();
    changeState("isAnimation", false);
  };
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

  const handlePlayerMove = (selectedStats: {
    label: string;
    ap: number;
    targetIndex: number;
  }) => {
    const { label, ap, targetIndex } = selectedStats;
    console.log(targetIndex);
    const targetName = stats.enemies[targetIndex].name;
    let newDialog: Dialog[] = [];
    if (label === "attack") {
      newDialog.push({
        type: "result",
        targetIndex,
        text: `${targetName}にこうげき！！`,
      });
      newDialog.push({
        type: "damage",
        subject: "enemies",
        targetIndex,
        text: `${ap}ダメージ！！`,
      });
    } else {
      newDialog.push({
        type: "result",
        text: `${targetName}に${label}を使用！`,
      });
      newDialog.push({
        type: "attack",
        subject: "enemies",
        targetIndex,
        text: `${ap}ダメージ！！`,
      });
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
    if (stats.isAnimation) return;

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

  const handleBattleRedult = () => {
    let newDialog: Dialog[] = [];
    if (stats.enemies.every((enemy) => enemy.hp === 0)) {
      newDialog.push({ type: "result", text: "勝った" });
      newDialog.push({ type: "result", text: "敵をすべて打倒した" });
    }
    if (stats.player.status.hp === 0) {
      newDialog.push({ type: "result", text: "負けた" });
      newDialog.push({
        type: "result",
        text: "なすすべなく力尽きた。。。。。",
      });
    }
    changeState("dialog", newDialog);
    changeState("selectedDialogIndex", 0);
    changeState("nextSequence", "end");
  };

  const handleEnemiesAttack = () => {
    if (!stats.enemies) return;
    const activeIndexs = getRandomUniqueNumbers(0, stats.enemies.length - 1);
    activeIndexs.map((index) => {
      if (!stats.enemies) return;
      const activeEnemy = stats.enemies[index];
      let newDialog: Dialog[] = [];
      newDialog.push({
        type: "attack",
        subject: "enemies",
        text: `${activeEnemy.name}のこうげき！`,
      });
      newDialog.push({
        type: "damage",
        subject: "player",
        text: `${activeEnemy.at}のダメージ！`,
      });

      const newDialogs = [...stats.dialog, ...newDialog];
      changeState("dialog", newDialogs);
    });
    actionDispatch({ type: "enemies", activeIndexs });
    changeState("nextSequence", "select");
  };

  const handleSequence = () => {
    switch (stats.sequence) {
      case "enemiesAttack":
        handleEnemiesAttack();
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

  const handleBattleEnd = () => {
    resetStats();
  };

  const resetStats = () => {
    setstats(initialStatsState);
  };

  return {
    stats,
    enemiesAnimationControl,
    playerAnimationControl,
    changeState,
    actionDispatch,
    resetStats,
    handleBattleRedult,
    handleEnemiesAttack,
    handleDialogClick,
    handlePlayerMove,
  };
};

export default useSequence;
