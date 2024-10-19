import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as variables from "@constants/variables";
import { ECAR_SEARCH_TYPE } from "types/enum";
import * as size from "@constants/size";
import { stat } from "fs";

interface IState {
  // side menu 설정
  isSide: boolean;
  sideWidth: string;
}

const initialState: IState = {
  isSide: true,
  sideWidth: size.SIDE_WIDTH,
};

const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    initialize: (state) => {
      for (const key in state) {
        state[key] = initialState[key];
      }
    },

    showSide: (state, action: PayloadAction<void>) => {
      state.isSide = true;
      state.sideWidth = size.SIDE_WIDTH;
    },

    hideSide: (state, action: PayloadAction<void>) => {
      state.isSide = false;
      state.sideWidth = size.HIDDEN_SIDE_WIDTH;
    },
  },
});

export const actions = settingSlice.actions;
export default settingSlice.reducer;
