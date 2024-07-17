import { useEffect, useState } from "react";
import Game from "./Game";
import { playerDamiData } from "./data/playerDamiData";
import { Player } from "./types/playerTypes";
function App() {
  const [player, setPlayer] = useState<Player>();

  useEffect(() => {
    setPlayer(playerDamiData);
  }, []);

  const handleSavePlayer = (updatedPlayer: Player) => {
    setPlayer(updatedPlayer);
  };

  return (
    <>
      {player && <Game player={player} onSavePlayer={handleSavePlayer}></Game>}
    </>
  );
}

export default App;
