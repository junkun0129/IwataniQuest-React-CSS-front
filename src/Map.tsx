import * as React from "react";
import { Component, useEffect } from "react";
import * as Const from "./const";
import { useAppSelector } from "./store/store";
import { doorAssets } from "./assets/doors";
import { mapDamiData } from "./assets/collisionTiles";
type PlayerPosType = {
  x: number;
  y: number;
};
function Map({ x, y }: PlayerPosType) {
  return (
    <>
      {/* map */}
      <div
        style={{
          position: "absolute",
          width: `${Const.screenTileSize * Const.mapGridNum.column}px`,
          height: `${Const.screenTileSize * Const.mapGridNum.row}px`,
          backgroundColor: "lightskyblue",
          transform: `translate(${-x + Const.screenWidth / 2}px, ${
            -y + Const.screenHeight / 2
          }px)`,
          backgroundImage: `url(${mapDamiData[0].mapUrl})`,
          backgroundSize: "cover",
        }}
      ></div>

      {/* doors */}
      {doorAssets.map((door, i) => {
        return (
          door.locatedMapName === mapDamiData[0].name && (
            <div
              key={i}
              style={{
                position: "absolute",
                width: `${Const.screenTileSize}px`,
                height: `${Const.screenTileSize}px`,
                backgroundColor: "lightskyblue",
                transform: `translate(${
                  -x + Const.screenWidth / 2 + door.locatedPos.x
                }px, ${-y + Const.screenHeight / 2 + door.locatedPos.y}px)`,
                backgroundImage: `url(${mapDamiData[0].mapUrl})`,
                backgroundSize: "cover",
              }}
            ></div>
          )
        );
      })}
    </>
  );
}

export default Map;
