import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IState {
  question: string;
  answer: string;
}

const initialState: IState = {
  question: "",
  answer: "",
};

const testSlice = createSlice({
  name: "test",
  initialState,
  reducers: {
    initialize: (state) => {
      for (const key in state) {
        state[key] = initialState[key];
      }
    },
    textInput: (state, action: PayloadAction<React.ChangeEvent<HTMLInputElement>["target"]>) => {
      const { name, value } = action.payload;
      switch (name) {
        case "question":
          state.question = value.trim();
          break;
        // case "answer":
        //   state.answer = value.trim();
        //   break;
        default:
      }
    },
  },
});

export const actions = testSlice.actions;
export default testSlice.reducer;
