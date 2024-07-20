// defaultValuesSlice.ts
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Magic, Player, Status } from "../../types/playerTypes";
import { playerDamiData } from "../../data/playerDamiData";
import { Item } from "../../data/items";
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
    setStatus: (state, action: PayloadAction<Status>) => {
      return { ...state, status: action.payload };
    },
    addMagic: (state, action: PayloadAction<Magic>) => {
      const newMagics = [...state.player.magics, action.payload];
      return { ...state, magic: newMagics };
    },
    addItem: (state, action: PayloadAction<Item>) => {
      const newItems = [...state.player.items, action.payload];
      return { ...state, item: newItems };
    },
  },
});

export const UserReducer = UserSlice.reducer;
export const { setUser, setStatus, addMagic, addItem } = UserSlice.actions;
