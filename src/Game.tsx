import { useEffect, useRef, useState } from "react";
import Map from "./Map";
import usePlayer from "./customhooks/usePlayer";
import useNPCs from "./customhooks/useNPCs";
import Dialog from "./Dialog";
import BattleScene from "./components/BattleScene";
import { motion } from "framer-motion";
import { encounter } from "./helpers/functions";
import { Player } from "./types/playerTypes";
type Props = { player: Player; onSavePlayer: (player: Player) => void };
function Game({ player, onSavePlayer }: Props) {
  //values -----------------------------------------------------------------------

  const gameLoopRef = useRef<any>(null);

  const { NPCs, npcArray } = useNPCs({ mapState: "dami1" });
  const { direction, isMoving, playerPos, Player, playerUpdate } = usePlayer(
    npcArray,
    player.position
  );
  let encounterCoolDown = 0;
  const [fieldState, setfieldState] = useState<"walk" | "battle">("walk");

  // useEffects -----------------------------------------------------------------------
  useEffect(() => {
    gameloop();
    return () => {
      cancelAnimationFrame(gameLoopRef.current);
    };
  }, [direction, isMoving]);

  //const functions -----------------------------------------------------------------------
  const gameloop = () => {
    if (fieldState !== "battle") {
      handleEncount();
    }
    playerUpdate();
    gameLoopRef.current = requestAnimationFrame(gameloop);
  };

  const handleEncount = () => {
    encounterCoolDown -= 10;
    encounter(encounterCoolDown, (encountSetNum) => {
      encounterCoolDown = encountSetNum;
      setfieldState("battle");
    });
  };

  const handleBattleEnd = (player: Player) => {
    setfieldState("walk");
    onSavePlayer(player);
  };
  return (
    <>
      <div
        style={{
          width: `100vw`,
          height: `100vh`,
          position: "relative",
          backgroundColor: "black",
          overflow: "hidden",
        }}
      >
        <motion.div
          animate={
            fieldState === "battle" ? { display: "none" } : { display: "block" }
          }
        >
          <Map x={playerPos.x} y={playerPos.y} />
          <NPCs x={playerPos.x} y={playerPos.y} />
          <Dialog></Dialog>
          <Player />
        </motion.div>
        <motion.div
          animate={
            fieldState === "battle" ? { display: "block" } : { display: "none" }
          }
        >
          <BattleScene playerProp={player} onSavePlayer={handleBattleEnd} />
        </motion.div>
      </div>
    </>
  );
}

export default Game;
