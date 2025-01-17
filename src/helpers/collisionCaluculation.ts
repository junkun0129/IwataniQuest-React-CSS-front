import * as Const from "../const";
import {
  collisionTileArrayType,
  mapedCollisionMapType,
} from "../types/mapTypes";

export const getCollisionArrayByColumn = (
  array: number[],
  columnNum: number,
  collisionNum: number
): mapedCollisionMapType[] => {
  let newArray: number[][] = [];
  for (let i = 0; i < array.length; i += columnNum) {
    newArray.push(array.slice(i, columnNum + i));
  }

  let collisionMap: mapedCollisionMapType[] = [];

  newArray.forEach((row, rowIndex) => {
    row.forEach((column, columnIndex) => {
      if (column !== collisionNum) return;
      const x = columnIndex * Const.screenTileSize;
      const y = rowIndex * Const.screenTileSize;
      collisionMap.push({ x, y });
    });
  });

  return collisionMap;
};

export const getCollisionArray = (
  collisionTileArray: collisionTileArrayType
): mapedCollisionMapType[] =>
  getCollisionArrayByColumn(
    collisionTileArray,
    Const.mapGridNum.column,
    Const.collisionIndex
  );
