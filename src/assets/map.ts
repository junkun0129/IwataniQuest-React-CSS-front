import {
  damiMap2CollisionTilesArray,
  damiMapCollisionTilesArray,
} from "./collisionTiles";

export type MapPropaty = {
  name: string;
  collisionTile: number[];
  image: string;
};

export type Map = {
  [key: string]: MapPropaty;
};

export const DamyMaps: Map = {
  dami1: {
    name: "dami1",
    collisionTile: damiMapCollisionTilesArray,
    image: "DamiMap.png",
  },
  dami2: {
    name: "dami2",
    collisionTile: damiMap2CollisionTilesArray,
    image: "DamiMap2.png",
  },
};
