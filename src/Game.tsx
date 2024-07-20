import { useEffect, useRef, useState } from "react";
import usePlayer from "./hooks/usePlayer";
import useNPCs from "./hooks/useNPCs";
import Dialog from "./Dialog";
import BattleScene from "./components/BattleScene";
import { motion } from "framer-motion";
import { encounter } from "./helpers/functions";
import { Player } from "./types/playerTypes";
import { mapedCollisionMapType } from "./types/mapTypes";
import FieldMap from "./FieldMap";
import { MapPropaty, mapRowData } from "./data/maps";
import { getCollisionArray } from "./helpers/collisionCaluculation";
import { damyMapItems, MapItem } from "./data/items";
export type FieldState = "walk" | "battle" | "event";
type Props = {
  player: Player;
  onSavePlayer: (player: Player) => void;
};

export type Map = {
  name: string;
  image: string;
  collisionArray: mapedCollisionMapType[];
};

function Game({ player, onSavePlayer }: Props) {
  //values -----------------------------------------------------------------------
  const gameLoopRef = useRef<any>(null);

  const { NPCs, npcArray } = useNPCs({ mapState: "world" });
  const [fieldState, setfieldState] = useState<FieldState>("walk");
  const [currentMap, setCurrentMap] = useState<Map>();
  const [mapName, setmapName] = useState<string>("world");
  const [mapItems, setmapItems] = useState<MapItem[]>(damyMapItems);
  const {
    direction,
    isMoving,
    playerPos,
    collisionNpc,
    Player,
    playerUpdate,
    setcollisionNpc,
  } = usePlayer(
    npcArray,
    player.position,
    currentMap,
    setmapName,
    mapItems,
    setmapItems
  );
  let encounterCoolDown = 0;

  const [isDialogShow, setisDialogShow] = useState<boolean>(false);
  // useEffects -----------------------------------------------------------------------

  useEffect(() => {
    const rowMap: MapPropaty = mapRowData[mapName];
    const newCollisionArray = getCollisionArray(rowMap.collisionTile);
    setCurrentMap({
      name: rowMap.name,
      image: rowMap.image,
      collisionArray: newCollisionArray,
    });
  }, []);

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
      handleEncount();
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
          {currentMap && (
            <FieldMap x={playerPos.x} y={playerPos.y} currentMap={currentMap} />
          )}

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
