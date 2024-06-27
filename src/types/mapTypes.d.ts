import { playerPosType } from "./playerTypes";

export type collisionTileArrayType = number[];
export type mapUrlType = string;
export type mapedCollisionMapType = {
  x: number;
  y: number;
};
export type mapNamesType = "dami1" | "dami2";
export type mapAssetsType = {
  name: mapNamesType;
  collisionTileArray: mapedCollisionMapType[];
  mapUrl: mapUrlType;
};

export type doorPosType = {
  x: number;
  y: number;
};

export type doorAssetType = {
  toPos: doorPosType;
  locatedPos: doorPosType;
  toMapName: mapNamesType;
  locatedMapName: mapNamesType;
  toPlayerPos: playerPosType;
};
