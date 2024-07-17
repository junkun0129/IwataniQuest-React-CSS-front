import * as React from "react";
import { Component, useState } from "react";
function useEncounter() {
  const [isEncount, setisEncount] = useState<boolean>(false);
  const [encounterCoolDown, setencounterCoolDown] = useState<number>(0);

  const encounter = () => {
    console.log("encounterCoolDown :>> ", encounterCoolDown);

    setisEncount(false);
    if (encounterCoolDown <= 0) {
      console.log("happen");
      const ramdomNum: number = Math.floor(Math.random() * 100);

      if (ramdomNum === 50) {
        console.log("object");
        setencounterCoolDown(500);
        setisEncount(true);
      }
    }
  };

  return { isEncount, encounter };
}

export default useEncounter;
