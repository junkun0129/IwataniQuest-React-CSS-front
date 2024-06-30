import { useEffect, useRef, useState } from "react";
import Map from "./Map";
import usePlayer from "./customhooks/usePlayer";
import useNPCs from "./customhooks/useNPCs";
import Dialog from "./Dialog";
import BattleScene from "./components/BattleScene";
import { motion } from "framer-motion";
import { encounter } from "./helpers/functions";
import { Player } from "./types/playerTypes";
export type FieldState = "walk" | "battle" | "event";
type Props = { player: Player; onSavePlayer: (player: Player) => void };
function Game({ player, onSavePlayer }: Props) {
  //values -----------------------------------------------------------------------

  const gameLoopRef = useRef<any>(null);

  const { NPCs, npcArray } = useNPCs({ mapState: "dami1" });
  const [fieldState, setfieldState] = useState<FieldState>("walk");
  const {
    direction,
    isMoving,
    playerPos,
    collisionNpc,
    Player,
    playerUpdate,
    setcollisionNpc,
  } = usePlayer(npcArray, player.position);
  let encounterCoolDown = 0;

  const [isDialogShow, setisDialogShow] = useState<boolean>(false);
  // useEffects -----------------------------------------------------------------------
  useEffect(() => {
    gameloop();
    return () => {
      cancelAnimationFrame(gameLoopRef.current);
    };
  }, [direction, isMoving]);

  useEffect(() => {
    if (collisionNpc) {
      setisDialogShow(true);
      setfieldState("event");
    }
  }, [collisionNpc]);

  //const functions -----------------------------------------------------------------------
  const gameloop = () => {
    if (fieldState === "walk") {
      // handleEncount();
      playerUpdate();
    }
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

  const handleDialogClose = () => {
    setfieldState("walk");
    setisDialogShow(false);
    setcollisionNpc(null);
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
          {!!isDialogShow && !!collisionNpc && (
            <Dialog
              collisionNpc={collisionNpc}
              onDialogClose={handleDialogClose}
            ></Dialog>
          )}
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
