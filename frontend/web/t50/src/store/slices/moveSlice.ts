import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as variables from "@constants/variables";

interface IState {
  year: string;
  month: string;
  date: string;
  departureNation: string;
  departureAddress: string;
  arrivalNation: string;
  arrivalAddress: string;
}

const initialState: IState = {
  year: variables.SELECT_YEAR_DEFAULT_TEXT,
  month: variables.SELECT_MONTH_DEFAULT_TEXT,
  date: variables.SELECT_DATE_DEFAULT_TEXT,
  departureNation: variables.SELECT_DEFAULT_TEXT,
  departureAddress: variables.SELECT_DEFAULT_TEXT,
  arrivalNation: variables.SELECT_DEFAULT_TEXT,
  arrivalAddress: variables.SELECT_DEFAULT_TEXT,
};

const moveSlice = createSlice({
  name: "move",
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

    textInput: (state, action: PayloadAction<React.ChangeEvent<HTMLInputElement>["target"]>) => {
      const { name, value } = action.payload;
      state[name] = value;
    },
  },
});

export const actions = moveSlice.actions;
export default moveSlice.reducer;
