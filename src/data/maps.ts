import { worldMapCollisionRowData } from "./collisionTilesRow";

export type MapPropaty = {
  name: string;
  collisionTile: number[];
  image: string;
};

export type Map = {
  [key: string]: MapPropaty;
};

export const mapRowData: Map = {
  world: {
    name: "world",
    collisionTile: worldMapCollisionRowData,
    image: "WorldMap.png",
  },
};
