export type fieldStateType = "walk" | "event" | "talk" | "battle";
export type battleSequenceType =
  | "start"
  | "player-select"
  | "player-move"
  | "enemy-move"
  | "end";

export type commandType = "fight" | "magic" | "item" | "escape" | null;
