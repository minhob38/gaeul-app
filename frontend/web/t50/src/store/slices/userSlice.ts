import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IState {
  userId: number | null;
  name: string | null;
  email: string | null;
  phoneNumber: string | null;
  isAuthenticated: boolean;
}

const initialState: IState = {
  isAuthenticated: false, // process.env.NODE_ENV === "production" ? false : true,
  userId: null, //process.env.NODE_ENV === "production" ? null : 1,
  name: null,
  email: null,
  phoneNumber: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    initialize: (state) => {
      for (const key in state) {
        state[key] = initialState[key];
      }
    },

    authenticate: (state) => {
      state.isAuthenticated = true;
      // 나중에 401 error 받으면, 로그인 정보 지우기
    },
    unAuthenticate: (state) => {
      state.isAuthenticated = false;

      for (const key in state) {
        state[key] = initialState[key];
      }
      // 나중에 401 error 받으면, 로그인 정보 지우기
    },

    findMe: (
      state,
      action: PayloadAction<{
        userId: number;
        email: string;
        fullName: string;
        phoneNumber: string;
      }>,
    ) => {
      const { userId, email, fullName, phoneNumber } = action.payload;
      state.userId = userId;
      state.name = fullName;
      state.email = email;
      state.phoneNumber = phoneNumber;
    },
  },
});

export const actions = userSlice.actions;
export default userSlice.reducer;
