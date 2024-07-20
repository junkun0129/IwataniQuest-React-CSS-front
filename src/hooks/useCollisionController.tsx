import * as React from "react";
import { directionType, Npc, playerPosType } from "../types/playerTypes";
import { collisionChecker } from "../helpers/collisionChecker";
import { doorAssets } from "../data/doors";
import { doorAssetType, mapedCollisionMapType } from "../types/mapTypes";
import { MapItem } from "../data/items";

type useCollisionControllerProps = {
  active: playerPosType;
  direction: directionType;
  npcArray: Npc[];
};
function useCollisionController({
  active,
  direction,
  npcArray,
}: useCollisionControllerProps) {
  let isCollision = false;

  const collisionController = (collisionTileArray: mapedCollisionMapType[]) => {
    collisionTileArray.forEach((collisionBlock, i) => {
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

  let CollisionNpc: Npc | null;
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
  const doorCollisionController = (mapName: string) => {
    doorAssets.forEach((door, i) => {
      if (mapName !== door.locatedMapName) return;
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

  let collisionItem: MapItem | null;
  const itemCollisionController = (mapName: string, items: MapItem[]) => {
    items.forEach((item, i) => {
      if (mapName !== item.map_name) return;
      collisionChecker({
        direction,
        passive: { x: item.x, y: item.y },
        active,
        callback: () => {
          collisionItem = items[i];
        },
      });
    });
    return collisionItem;
  };

  return {
    collisionController,
    npcCollisionController,
    doorCollisionController,
    itemCollisionController,
  };
}

export default useCollisionController;
