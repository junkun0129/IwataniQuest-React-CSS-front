// defaultValuesSlice.ts
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Player } from "../../types/playerTypes";
import { playerDamiData } from "../../damidata/playerDamiData";
type Props = {
  player: Player;
};
const initialState: Props = {
  player: playerDamiData,
};
export const UserSlice = createSlice({
  name: "defaultValue",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Player>) => {
      return { player: action.payload };
    },
  },
});

export const UserReducer = UserSlice.reducer;
export const { setUser } = UserSlice.actions;
