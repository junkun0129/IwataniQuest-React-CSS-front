export type MapItem = {
  id: string;
  name: string;
  point: number;
  map_name: string;
  x: number;
  y: number;
};

export type Item = {
  id: string;
  name: string;
  point: number;
};

export type MapItemObeject = {
  [key: string]: MapItem;
};

export const damyMapItems: MapItemObeject = {
  portion1: {
    id: "portion1",
    name: "potion",
    point: 5,
    x: 900,
    y: 900,
    map_name: "world",
  },
  portion2: {
    id: "portion2",
    name: "potion",
    point: 5,
    x: 500,
    y: 500,
    map_name: "world",
  },
};
