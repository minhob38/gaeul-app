import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IState {
  name: string | null;
  email: string | null;
  phoneNumber: string | null;
  password: string | null;
  rePassword: string | null;
  isSignUpNotification: boolean;
}

const initialState: IState = {
  name: null,
  email: null,
  phoneNumber: null,
  password: null,
  rePassword: null,
  isSignUpNotification: false,
};

const authSlice = createSlice({
  name: "auth",
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
        case "name":
          state.name = value.trim();
          break;
        case "email":
          state.email = value.trim();
          break;
        case "phoneNumber":
          state.phoneNumber = value.trim();
          break;
        case "password":
          state.password = value.trim();
          break;
        case "re-password":
          state.rePassword = value.trim();
          break;
        default:
      }
    },
    clickEdit: (
      state,
      action: PayloadAction<{
        name: string;
        email: string;
        phoneNumber: string;
      }>,
    ) => {
      const { name, email, phoneNumber } = action.payload;
      state.name = name.trim();
      state.email = email.trim();
      state.phoneNumber = phoneNumber.trim();
    },
    showSignUpNotification: (state, action: PayloadAction<void>) => {
      state.isSignUpNotification = true;
    },
    hideSignUpNotification: (state, action: PayloadAction<void>) => {
      state.isSignUpNotification = false;
    },
  },
});

export const actions = authSlice.actions;
export default authSlice.reducer;

// selectInput: (state, action: PayloadAction<React.ChangeEvent<HTMLSelectElement>["target"]>) => {
//   const { name, value } = action.payload;
//   state[name] = value;
// },
