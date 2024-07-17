import * as React from "react";
import { Component, useEffect, useState } from "react";
import * as Const from "../const";
import {
  directionType,
  Npc,
  picturePxType,
  playerPosType,
} from "../types/playerTypes";
import useDirectionHandler from "./useDirectionHandler";
import useCollisionController from "./useCollisionController";
import { Map } from "../Game";
function usePlayer(
  npcArray: Npc[],
  initialPosition: playerPosType,
  currentMap: Map | undefined,
  setMapName: (name: string) => void
) {
  const direction = useDirectionHandler();
  const [playerPos, setPlayerPos] = useState<playerPosType>(initialPosition);
  const [isMoving, setIsMoving] = useState<boolean>(true);
  const [preCollisionDirection, setPreCollisionDirection] =
    useState<directionType>();
  const [collisionNpc, setcollisionNpc] = useState<Npc | null>(null);
  const [frameCount, setFrameCount] = useState<number>(0);
  const [picturePx, setPicturePx] = useState<picturePxType>({
    column: 0,
    row: 0,
  });

  const [prePictureDirection, setPrePictureDirection] =
    useState<directionType>();

  const {
    collisionController,
    npcCollisionController,
    doorCollisionController,
    itemCollisionController,
  } = useCollisionController({
    active: playerPos,
    direction,
    npcArray,
  });

  //observe collision by player's position on the DOM
  useEffect(() => {
    if (!currentMap) return;
    const isCollision = collisionController(currentMap.collisionArray);
    const collisionNpc = npcCollisionController();
    const collisionDoor = doorCollisionController(currentMap.name);

    if (isCollision) {
      setIsMoving(false);
      setPreCollisionDirection(direction);
    }

    if (collisionNpc) {
      setIsMoving(false);
      setPreCollisionDirection(direction);
      setcollisionNpc(collisionNpc);
    }

    if (collisionDoor) {
      setPlayerPos(collisionDoor.toPlayerPos);
      setMapName(collisionDoor.toMapName);
    }
  }, [playerPos]);

  //observe collision when player's direction changes
  useEffect(() => {
    if (!currentMap) return;
    if (direction) {
      setPrePictureDirection(direction);
      const isCollision = collisionController(currentMap.collisionArray);
      const isNpcCollision = npcCollisionController();
      if (isCollision || isNpcCollision) return;
    }
    setIsMoving(true);
  }, [direction]);

  const directionHandler = (direction: directionType) => {
    let isCalled: boolean = false;
    if (!isMoving) return;
    if (!currentMap) return;
    if (preCollisionDirection === direction) {
      const isCollision = collisionController(currentMap.collisionArray);
      const isNpcCollision = npcCollisionController();
      if (isCollision || isNpcCollision) {
        isCalled = true;
      }
    }
    if (isCalled) return;

    switch (direction) {
      case "up":
        setPlayerPos((pre) => ({
          ...pre,
          y: pre.y - Const.playerSpeed,
        }));
        break;
      case "down":
        setPlayerPos((pre) => ({
          ...pre,
          y: pre.y + Const.playerSpeed,
        }));
        break;
      case "left":
        setPlayerPos((pre) => ({
          ...pre,
          x: pre.x - Const.playerSpeed,
        }));
        break;
      case "right":
        setPlayerPos((pre) => ({
          ...pre,
          x: pre.x + Const.playerSpeed,
        }));
        break;
    }
  };

  //sprite controll
  useEffect(() => {
    setPicturePx(
      Const.spriteController(direction, frameCount, prePictureDirection)
    );
    if (frameCount > 20) {
      setFrameCount(0);
    }
  }, [frameCount]);

  //update
  const playerUpdate = () => {
    directionHandler(direction);
    setFrameCount((pre) => pre + 1);
  };

  const Player = () => {
    const playerStyle: React.CSSProperties = {
      position: "absolute",
      width: `${Const.screenTileSize}px`,
      height: `${Const.screenTileSize}px`,
      backgroundImage: "url(sample.png)",
      backgroundPosition: `${picturePx.row}px ${picturePx.column}px`,
      transform: `translate(calc(50vw), calc(50vh))`,
    };
    return <div style={playerStyle}></div>;
  };

  return {
    direction,
    playerPos,
    isMoving,
    collisionNpc,
    setcollisionNpc,
    Player,
    playerUpdate,
  };
}

export default usePlayer;
