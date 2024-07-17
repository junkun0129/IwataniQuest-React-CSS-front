import { doorAssetType } from "../types/mapTypes";

export const doorAssets: doorAssetType[] = [
  {
    toMapName: "dami1",
    locatedMapName: "dami2",
    toPos: { x: 1000, y: 500 },
    locatedPos: { x: 230, y: 280 },
    toPlayerPos: { x: 900, y: 550 },
  },
  {
    toMapName: "dami2",
    locatedMapName: "dami1",
    toPos: { x: 900, y: 500 },
    locatedPos: { x: 900, y: 600 },
    toPlayerPos: { x: 230, y: 250 },
  },
];
