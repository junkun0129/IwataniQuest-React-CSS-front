import { useState } from "react";
import BattleSelectButton from "./BattleSelectButton";
import { Player } from "../types/playerTypes";
import { motion } from "framer-motion";
import { enemiesType } from "../assets/enemies";
type OnMove = {
  label: string;
  ap: number;
  targetIndex: number;
};
type Props = {
  player: Player;
  enemies: enemiesType[];
  onMove: ({ label, ap, targetIndex }: OnMove) => void;
};

function BattleSelectPanel({ onMove, player, enemies }: Props) {
  const [mode, setmode] = useState<
    "main" | "magic" | "items" | "escape" | "enemyselect"
  >("main");
  const [selectStats, setSelectStats] = useState<{
    label: string | null;
    ap: number | null;
    targetIndex: number | null;
  }>({ label: null, ap: null, targetIndex: null });

  const selectAttack = () => {
    setSelectStats((pre) => ({
      ...pre,
      label: "attack",
      ap: player.status.ap,
    }));
    setmode("enemyselect");
  };
  const selectMagic = (label: string, ap: number) => {
    setSelectStats((pre) => ({
      ...pre,
      label,
      ap,
    }));
    setmode("enemyselect");
  };

  const handleSelectEnemy = (index: number) => {
    const { ap, label, targetIndex } = selectStats;
    setSelectStats((pre) => ({
      ...pre,
      targetIndex: index,
    }));
    if (ap && label && targetIndex !== null) {
      console.log("object");
      onMove({ ap, label, targetIndex });
    }
  };

  const resetStatus = () => {
    setSelectStats({ label: null, ap: null, targetIndex: null });
    setmode("main");
  };
  return (
    <>
      {mode === "main" && (
        <div className="w-full h-full bg-blue-300">
          <BattleSelectButton label={"こうげき"} onclick={selectAttack} />
          <BattleSelectButton
            label={"まほう"}
            onclick={(label) => setmode("magic")}
          />
          <BattleSelectButton
            label={"どうぐ"}
            onclick={(label) => setmode("items")}
          />
          <BattleSelectButton
            label={"にげる"}
            onclick={(label) =>
              onMove({ label: "escape", ap: 0, targetIndex: 0 })
            }
          />
        </div>
      )}
      {mode === "magic" && (
        <>
          {player.status.magics.map((magic, i) => (
            <div
              key={"magic-select-" + i}
              onClick={() => selectMagic(magic.magic_name, magic.magic_ap)}
            >
              {magic.magic_name}
            </div>
          ))}
        </>
      )}

      {mode === "enemyselect" && (
        <>
          {enemies.map((enemy, i) => (
            <motion.h1
              whileHover={{ border: "black solid 1px" }}
              className="cursor-pointer w-full h-[10%] bg-blue-200"
              onTap={() => handleSelectEnemy(i)}
              key={"enemy-select-" + i}
            >
              {enemy.name}
            </motion.h1>
          ))}
        </>
      )}
    </>
  );
}

export default BattleSelectPanel;
