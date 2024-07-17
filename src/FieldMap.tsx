import * as React from "react";
import { Component, useEffect } from "react";
import * as Const from "./const";
import { useAppSelector } from "./store/store";
import { doorAssets } from "./data/doors";
import { Map } from "./Game";
import { damyMapItems } from "./data/items";
type PlayerPosType = {
  x: number;
  y: number;
  currentMap: Map;
};
function FieldMap({ x, y, currentMap }: PlayerPosType) {
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
          backgroundImage: `url(${currentMap.image})`,
          backgroundSize: "cover",
        }}
      ></div>

      {/* items */}
      {damyMapItems.map((item, i) => {
        return (
          <div
            key={"mapitem-" + i}
            style={{
              position: "absolute",
              width: `${Const.screenTileSize}px`,
              height: `${Const.screenTileSize}px`,
              backgroundColor: "lightskyblue",
              transform: `translate(${-x + Const.screenWidth / 2 + item.x}px, ${
                -y + Const.screenHeight / 2 + item.y
              }px)`,
            }}
          ></div>
        );
      })}

      {/* doors */}
      {doorAssets.map((door, i) => {
        return (
          door.locatedMapName === currentMap.name && (
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
                backgroundImage: `url(${currentMap.image})`,
                backgroundSize: "cover",
              }}
            ></div>
          )
        );
      })}
    </>
  );
}

export default FieldMap;
