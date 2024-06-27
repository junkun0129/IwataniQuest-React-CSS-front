import { Magic, Player } from "../types/playerTypes";

const magicArray: Magic[] = [
  {
    magic_id: "001",
    magic_name: "Fireball",
    magic_type: "Fire",
    magic_ap: 2,
  },
  {
    magic_id: "002",
    magic_name: "Ice Shard",
    magic_type: "Ice",
    magic_ap: 4,
  },
  {
    magic_id: "003",
    magic_name: "Thunder Strike",
    magic_type: "Electric",
    magic_ap: 8,
  },
];
export const playerDamiData: Player = {
  user_id: "user_id",
  user_name: "junpei iwatani",
  status: {
    hp: 10,
    ap: 2,
    mp: 3,
    lev: 1,
    magics: magicArray,
  },
  position: { x: 1000, y: 600 },
};
