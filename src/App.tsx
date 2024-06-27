import { useState } from "react";
import Game from "./Game";
import { playerDamiData } from "./damidata/playerDamiData";
function App() {
  return (
    <>
      <Game player={playerDamiData}></Game>
    </>
  );
}

export default App;
