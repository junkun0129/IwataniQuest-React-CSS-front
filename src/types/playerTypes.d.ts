import { Item, MapItem } from "../data/items";
import { Map } from "../Game";
import { mapNamesType } from "./mapTypes";

export type directionType = "up" | "down" | "left" | "right" | undefined;
export type playerPosType = {
  x: number;
  y: number;
};

export type picturePxType = {
  column: number;
  row: number;
};

export type dialogType = string[];
export type Npc = {
  id: number;
  x: number;
  y: number;
  dialog: dialogType;
  locatedMap: mapNamesType;
};

export type playerStatsType = {
  name: string;
  hp: number;
  at: number;
};

export type Status = {
  hp: number;
  ap: number;
  mp: number;
  lev: number;
};

export type Player = {
  user_id: string;
  user_name: string;
  status: Status;
  magics: Magic[];
  items: Item[];
  position: playerPosType;
  map: Map;
};

export type RowPlayer = {
  user_id: string;
  user_name: string;
  status: Status;
  magics: Magic[];
  items: Item[];
  position: playerPosType;
  map_name: string;
};

export type Magic = {
  magic_id: string;
  magic_name: string;
  magic_type: string;
  magic_ap: number;
};
