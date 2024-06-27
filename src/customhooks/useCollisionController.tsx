import * as React from "react";
import { Component, useState } from "react";
import { collisionArray, mapDamiData } from "../assets/collisionTiles";
import {
  directionType,
  npcInstaceType,
  playerPosType,
} from "../types/playerTypes";
import { collisionChecker } from "../helpers/collisionChecker";
import { useAppSelector } from "../store/store";
import { doorAssets } from "../assets/doors";
import { doorAssetType } from "../types/mapTypes";

type useCollisionControllerProps = {
  active: playerPosType;
  direction: directionType;
  npcArray: npcInstaceType[];
};
function useCollisionController({
  active,
  direction,
  npcArray,
}: useCollisionControllerProps) {
  let isCollision = false;

  const collisionController = () => {
    mapDamiData[0].collisionTileArray.forEach((collisionBlock, i) => {
      collisionChecker({
        direction,
        passive: collisionBlock,
        active,
        callback: () => {
          isCollision = true;
        },
      });
    });

    return isCollision;
  };

  let CollisionNpc: npcInstaceType | null;
  const npcCollisionController = () => {
    npcArray.forEach((collisionBlock, i) => {
      collisionChecker({
        direction,
        passive: collisionBlock,
        active,
        callback: () => {
          CollisionNpc = npcArray[i];
        },
      });
    });

    return CollisionNpc;
  };

  let collisionDoor: doorAssetType | null;
  const doorCollisionController = () => {
    doorAssets.forEach((door, i) => {
      if (mapDamiData[0].name !== door.locatedMapName) return;
      collisionChecker({
        direction,
        passive: door.locatedPos,
        active,
        callback: () => {
          collisionDoor = doorAssets[i];
        },
      });
    });
    return collisionDoor;
  };

  return {
    collisionController,
    npcCollisionController,
    doorCollisionController,
  };
}

export default useCollisionController;
