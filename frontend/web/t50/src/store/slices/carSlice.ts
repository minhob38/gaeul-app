import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as variables from "@constants/variables";
import { ECAR_SEARCH_TYPE } from "types/enum";

interface IState {
  carSearchType: ECAR_SEARCH_TYPE;
  newMinimumPrice: string;
  newMaximumPrice: string;
  usedMinimumPrice: string;
  usedMaximumPrice: string;
  selectedCarSaleId: number | null;
}

const initialState: IState = {
  carSearchType: ECAR_SEARCH_TYPE.NEW,
  newMinimumPrice: variables.SELECT_MIN_PRICE_DEFAULT_TEXT,
  newMaximumPrice: variables.SELECT_MAX_PRICE_DEFAULT_TEXT,
  usedMinimumPrice: variables.SELECT_MIN_PRICE_DEFAULT_TEXT,
  usedMaximumPrice: variables.SELECT_MAX_PRICE_DEFAULT_TEXT,
  selectedCarSaleId: null,
};

const carSlice = createSlice({
  name: "car",
  initialState,
  reducers: {
    initialize: (state) => {
      for (const key in state) {
        state[key] = initialState[key];
      }
    },

    selectInput: (state, action: PayloadAction<React.ChangeEvent<HTMLSelectElement>["target"]>) => {
      const { name, value } = action.payload;
      state[name] = value;
    },

    changeSearchType: (state, action: PayloadAction<ECAR_SEARCH_TYPE>) => {
      state.carSearchType = action.payload;
    },
    clickCarToCancel: (state, action: PayloadAction<number>) => {
      state.selectedCarSaleId = action.payload;
    },
  },
});

export const actions = carSlice.actions;
export default carSlice.reducer;
