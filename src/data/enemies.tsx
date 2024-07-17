import Ameiba from "../components/enemies/Ameiba";
import Zakoowl from "../components/enemies/Zakoowl";

export const enemies: enemiesType[] = [
  { name: "Ameiba", hp: 10, at: 2 },
  { name: "Zakoowl", hp: 6, at: 4 },
];

export const enemiesComponentMapping = {
  Ameiba: <Ameiba />,
  Zakoowl: <Zakoowl />,
} as const;

type EnemyName = keyof typeof enemiesComponentMapping;

export type enemiesType = {
  name: EnemyName;
  hp: number;
  at: number;
};
