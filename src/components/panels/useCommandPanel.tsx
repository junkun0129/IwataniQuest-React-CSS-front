import React, { useState } from "react";
import { commandType } from "../../types/gameStateTypes";

const useCommandPanel = () => {
  const [commandOutPut, setCommandOutPut] = useState<commandType>(null);

  const CommandPanel = () => {
    return (
      <>
        <div style={wrapperStyle}>
          <div style={containerStyle}>
            
            {!commandOutPut && (
              <div className="w-full h-full flex  items-center ml-4">
                <div style={optionEntryStyle}>
                  <div onClick={() => setCommandOutPut("fight")}>たたかう</div>
                  <div onClick={() => setCommandOutPut("magic")}>まほう</div>
                </div>
                <div style={optionEntryStyle}>
                  <div onClick={() => setCommandOutPut("item")}>どうぐ</div>
                  <div onClick={() => setCommandOutPut("escape")}>にげる</div>
                </div>
              </div>
            )}
            

          </div>
        </div>
      </>
    );
  };

  return { CommandPanel, commandOutPut, setCommandOutPut };
};

export default useCommandPanel;

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
  fontSize: "2rem",
};

const optionEntryStyle: React.CSSProperties = {
  width: "30%",
  height: "70%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
};
