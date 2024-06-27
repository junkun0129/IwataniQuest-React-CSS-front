import { directionType, picturePxType } from "./types/playerTypes";

type mapGridNumType = {
  column: number;
  row: number;
};
export const mapGridNum: mapGridNumType = {
  column: 50,
  row: 30,
};
export const originalTilesSize: number = 32;
export const scale: number = 1;
export const screenTileSize: number = originalTilesSize * scale;
export const collisionIndex: number = 4;
export const playerSpeed: number = 5;

export const screenWidth =
  window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth;
export const screenHeight =
  window.innerHeight ||
  document.documentElement.clientHeight ||
  document.body.clientHeight;

type spriteRowPattern = "stand" | "move1" | "move2";

const picturePxPatterns = (
  columnNum: number,
  rowPattern: spriteRowPattern
): picturePxType => {
  let row;
  switch (rowPattern) {
    case "move1":
      row = screenTileSize;
      break;
    case "stand":
      row = screenTileSize * 2;
      break;
    case "move2":
      row = 0;
      break;
  }

  return { row, column: columnNum };
};

export const downSpritePattern = (
  rowPattern: spriteRowPattern
): picturePxType => {
  return picturePxPatterns(screenTileSize * 0, rowPattern);
};
export const upSpritePattern = (
  rowPattern: spriteRowPattern
): picturePxType => {
  return picturePxPatterns(screenTileSize * 1, rowPattern);
};
export const leftSpritePattern = (
  rowPattern: spriteRowPattern
): picturePxType => {
  return picturePxPatterns(screenTileSize * 3, rowPattern);
};
export const rightSpritePattern = (
  rowPattern: spriteRowPattern
): picturePxType => {
  return picturePxPatterns(screenTileSize * 2, rowPattern);
};

export const spriteController = (
  direction: directionType,
  frameCount: number,
  preCollisionDirection: directionType
) => {
  let rowPattern: spriteRowPattern = "move1";
  let picturePx: picturePxType = { column: 0, row: 0 };
  if (frameCount < 10) {
    rowPattern = "move1";
  } else if (10 <= frameCount) {
    rowPattern = "move2";
  }

  switch (direction) {
    case "down":
      picturePx = downSpritePattern(rowPattern);
      break;
    case "up":
      picturePx = upSpritePattern(rowPattern);
      break;
    case "left":
      picturePx = leftSpritePattern(rowPattern);
      break;
    case "right":
      picturePx = rightSpritePattern(rowPattern);
      break;
    case undefined:
      switch (preCollisionDirection) {
        case "down":
          picturePx = downSpritePattern("stand");
          break;
        case "up":
          picturePx = upSpritePattern("stand");
          break;
        case "left":
          picturePx = leftSpritePattern("stand");
          break;
        case "right":
          picturePx = rightSpritePattern("stand");
          break;
      }
      break;
  }

  return picturePx;
};

//map consts------------------------------------------------------------------
