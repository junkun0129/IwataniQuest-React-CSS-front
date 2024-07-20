export type MapItem = {
  name: string;
  point: number;
  map_name: string;
  x: number;
  y: number;
};

export type Item = {
  name: string;
  point: number;
};

export const damyMapItems: MapItem[] = [
  { name: "potion", point: 5, x: 900, y: 900, map_name: "world" },
  { name: "potion", point: 5, x: 500, y: 800, map_name: "world" },
  { name: "potion", point: 5, x: 400, y: 900, map_name: "world" },
];
