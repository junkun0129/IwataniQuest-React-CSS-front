import { enemies } from "../data/enemies";
import { enemiesType } from "../types/enemiesType";
import { getRandomNumber } from "./functions";
export const enemiesGenerate = () => {
  const maxEnemiesNum = getRandomNumber(1, 3);
  let choseEnemies: enemiesType[] = [];
  for (let i = 1; i <= maxEnemiesNum; i++) {
    const enemyIndex = getRandomNumber(0, enemies.length - 1);
    choseEnemies.push(enemies[enemyIndex]);
  }
  return choseEnemies;
};
