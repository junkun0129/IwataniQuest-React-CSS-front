import * as React from "react";
import { Component, useEffect, useState } from "react";
import * as Const from "./const";
import { useAppDispatch, useAppSelector } from "./store/store";
function Dialog() {
  const dispatch = useAppDispatch();
  const [textArrayCount, setTextArrayCount] = useState<number>(0);
  useEffect(() => {}, [textArrayCount]);
  useEffect(() => {
    addEventListener("keydown", handleDialog);
  }, []);

  const handleDialog = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      setTextArrayCount((pre) => pre + 1);
    }
  };

  return <></>;
}

export default Dialog;
