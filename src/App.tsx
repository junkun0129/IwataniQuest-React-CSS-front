import { useEffect, useState } from "react";
import Game from "./Game";
import { playerDamiData } from "./damidata/playerDamiData";
import { Player } from "./types/playerTypes";
import Zakoowl from "./components/enemies/Zakoowl";
import Ameiba from "./components/enemies/Ameiba";
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
