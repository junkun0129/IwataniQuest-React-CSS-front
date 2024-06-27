import * as React from "react";
import { useEffect } from "react";
import { directionType } from "../types/playerTypes";

function useDirectionHandler() {
  const [heldDirection, setHeldDirection] = React.useState<directionType[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          onPressed("up");
          break;
        case "ArrowDown":
          onPressed("down");
          break;
        case "ArrowLeft":
          onPressed("left");
          break;
        case "ArrowRight":
          onPressed("right");
          break;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          onReleased("up");
          break;
        case "ArrowDown":
          onReleased("down");
          break;
        case "ArrowLeft":
          onReleased("left");
          break;
        case "ArrowRight":
          onReleased("right");
          break;
      }
    };

    const onPressed = (pressedDirection: directionType) => {
      if (heldDirection.indexOf(pressedDirection) === -1) {
        setHeldDirection((pre) => [pressedDirection, ...pre]);
      }
    };

    const onReleased = (releasedDirection: directionType) => {
      const index = heldDirection.indexOf(releasedDirection);
      if (index === -1) return;
      const newArray = [...heldDirection];
      newArray.splice(index, 1);
      setHeldDirection(newArray);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [heldDirection]); // useEffect の依存リストに heldDirection を含める

  return heldDirection[0];
}

export default useDirectionHandler;
