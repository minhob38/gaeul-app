import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as size from "@constants/size";

interface IState {
  // side menu 설정
  selectedMenu: "board" | "todo" | "candidate" | "trash" | null;
}

const initialState: IState = {
  selectedMenu: null,
};

const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    initialize: (state) => {
      for (const key in state) {
        state[key] = initialState[key];
      }
    },

    selectMenu: (state, action: PayloadAction<IState["selectedMenu"]>) => {
      state.selectedMenu = action.payload;
    },
  },
});

export const actions = navigationSlice.actions;
export default navigationSlice.reducer;
