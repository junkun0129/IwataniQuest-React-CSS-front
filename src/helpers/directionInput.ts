import { directionType } from "../types/playerTypes";

export const directionInput = (heldDirection: directionType[]) => {
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
      heldDirection.unshift(pressedDirection);
    }
  };

  const onReleased = (releasedDirection: directionType) => {
    const index = heldDirection.indexOf(releasedDirection);
    if (index === -1) return;
    const newArray = [...heldDirection];
    newArray.splice(index, 1);
    heldDirection = newArray;
  };
  window.addEventListener("keydown", handleKeyDown);
  window.addEventListener("keyup", handleKeyUp);

  return heldDirection[0];
};
