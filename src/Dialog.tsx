import * as React from "react";
import { Component, useEffect, useState } from "react";
import * as Const from "./const";
import { Npc } from "./types/playerTypes";
type Props = {
  collisionNpc: Npc;
  onDialogClose: () => void;
};
function Dialog({ collisionNpc, onDialogClose }: Props) {
  const [textArrayCount, setTextArrayCount] = useState<number>(0);
  const [isShowDialog, setisShowDialog] = useState<boolean>(false);

  useEffect(() => {
    addEventListener("keydown", handleDialog);
    return () => {
      removeEventListener("keydown", handleDialog);
      setTextArrayCount(0);
    };
  }, []);

  useEffect(() => {
    if (textArrayCount > collisionNpc.dialog.length - 1) {
      onDialogClose();
    }
  }, [textArrayCount]);

  const handleDialog = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      setTextArrayCount((pre) => pre + 1);
    }
  };

  return (
    <>
      <div className="w-full h-[100px] absolute bg-white">
        {collisionNpc.dialog[textArrayCount]}
      </div>
    </>
  );
}

export default Dialog;
