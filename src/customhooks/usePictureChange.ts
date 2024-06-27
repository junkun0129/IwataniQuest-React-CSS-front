import * as React from "react";
import { Component, useState } from "react";
import { directionType } from "../types/playerTypes";
type usePictureChangeProps = {
  direction: directionType;
};
function usePictureChange(direction: directionType) {
  const [pictureURL, setPictureURL] = useState<string>();
  return pictureURL;
}

export default usePictureChange;
