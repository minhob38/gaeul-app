import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as variables from "@constants/variables";
import { ETELCOM_KIND_TYPE } from "types/enum";

interface IState {
  // checkStatus: "sign-up" | "sign-in";
  // name: string | null;
  // email: string | null;
  // password: string | null;

  year: string;
  month: string;
  kind: ETELCOM_KIND_TYPE[];
}

const initialState: IState = {
  year: variables.SELECT_DEFAULT_TEXT,
  month: variables.SELECT_DEFAULT_TEXT,
  kind: [],
};

const telcomSlice = createSlice({
  name: "telcom",
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

    checkboxInput: (
      state,
      action: PayloadAction<React.ChangeEvent<HTMLInputElement>["target"]>,
    ) => {
      const { name, value, type } = action.payload;

      if (type === "checkbox") {
        const idx = (state[name] as string[]).indexOf(value);

        if (idx === -1) {
          state[name].push(value);
          return;
        }

        (state[name] as string[]).splice(idx, 1);
      }
    },
  },
});

export const actions = telcomSlice.actions;
export default telcomSlice.reducer;
