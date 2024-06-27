import { motion } from "framer-motion";
import * as React from "react";
import { Component, useEffect, useState } from "react";
import { enemiesGenerate } from "../helpers/enemiesReducer";
import { enemiesType } from "../types/enemiesType";
import { battleSequenceType } from "../types/gameStateTypes";
import BattleSelectButton from "./BattleSelectButton";
import BattleSelectPanel from "./BattleSelectPanel";
import { useAppDispatch, useAppSelector } from "../store/store";
import { enemiesAttack, playerSelect } from "../store/slices/BattleSystemSlice";
type Props = {};
function BattleDialog({}: Props) {
  const dispatch = useAppDispatch();
  const [dialogCount, setdialogCount] = useState(0);
  const [displayedDialog, setdisplayedDialog] = useState<string>("");

  const battleDialog = useAppSelector(
    (state) => state.battleSystemReducer.battleDialog
  );
  const sequence = useAppSelector(
    (state) => state.battleSystemReducer.sequence
  );
  const fieldState = useAppSelector(
    (state) => state.fieldStateReducer.fieldState
  );
  useEffect(() => {}, []);

  useEffect(() => {
    if (fieldState === "battle") {
      document.addEventListener("keydown", handleKeyDown);
      if (fieldState !== "battle") {
    }
      document.removeEventListener("keydown", handleKeyDown);
    }
  }, [fieldState]);

  useEffect(() => {
    if (!battleDialog) return;
    console.log(dialogCount);
    if (battleDialog.length > dialogCount) {
      setdisplayedDialog(battleDialog[dialogCount]);
    } else if (battleDialog.length - 1 < dialogCount) {
      if (sequence === "enemy-move") {
        dispatch(playerSelect());
      } else if (sequence === "player-move") {
        dispatch(enemiesAttack());
      }
      setdialogCount(0);
    }
  }, [dialogCount]);

  useEffect(() => {
    if (!battleDialog) return;
    // setdialogCount(0);
    setdisplayedDialog(battleDialog[dialogCount]);
  }, [battleDialog]);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!battleDialog) return;
    switch (e.key) {
      case "Enter":
        console.log("dddd");
        setdialogCount((pre) => (pre += 1));
        break;
    }
  };

  return (
    <>
      <div style={wrapperStyle}>
        <div style={containerStyle}>
          {sequence === "player-select" ? (
            <BattleSelectPanel />
          ) : (
            displayedDialog
          )}
        </div>
      </div>
    </>
  );
}

export default BattleDialog;

const wrapperStyle: React.CSSProperties = {
  width: "100%",
  height: "30%",
  position: "absolute",
  bottom: "0px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const containerStyle: React.CSSProperties = {
  width: "98%",
  height: "90%",
  backgroundColor: "black",
  borderRadius: "15px",
  border: "white solid 7px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "white",
};
