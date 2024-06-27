import { collisionArray } from "../assets/collisionTiles";
import * as Const from "../const";
import { directionType } from "../types/playerTypes";

export type elementType = {
  x: number;
  y: number;
};
type collisionCheckerType = {
  direction: directionType;
  passive: elementType;
  active: elementType;
  callback: () => void;
};
export const collisionChecker = ({
  direction,
  passive,
  active,
  callback,
}: collisionCheckerType) => {
  let passiveX: number = passive.x - active.x;
  let passiveY: number = passive.y - active.y;
  switch (direction) {
    case "up": {
      if (
        active.x + Const.screenTileSize >= passiveX + passive.x - 3 &&
        active.x <= passiveX + Const.screenTileSize + passive.x - 3 &&
        active.y + Const.screenTileSize >= passiveY + passive.y &&
        active.y <=
          passiveY + Const.screenTileSize + passive.y + Const.screenTileSize / 2
      ) {
        callback();
      }
      break;
    }
    case "down": {
      if (
        active.x + Const.screenTileSize >= passiveX + passive.x &&
        active.x <= passiveX + Const.screenTileSize + passive.x &&
        active.y + Const.screenTileSize + 80 >=
          passiveY + passive.y + Const.screenTileSize &&
        active.y <= passiveY + Const.screenTileSize + passive.y - 20
      ) {
        callback();
      }
      break;
    }
    case "left": {
      if (
        active.x + Const.screenTileSize >= passiveX + passive.x &&
        active.x <=
          passiveX + Const.screenTileSize + passive.x + Const.screenTileSize &&
        active.y + Const.screenTileSize >= passiveY + passive.y - 20 &&
        active.y <= passiveY + Const.screenTileSize + passive.y - 20
      ) {
        callback();
      }
      break;
    }
    case "right": {
      if (
        active.x + Const.screenTileSize + 20 >= passiveX + passive.x &&
        active.x <= passiveX + Const.screenTileSize + passive.x &&
        active.y + Const.screenTileSize >= passiveY + passive.y - 20 &&
        active.y <= passiveY + Const.screenTileSize + passive.y - 20
      ) {
        callback();
      }
      break;
    }
  }
};
