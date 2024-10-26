import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IState {
  signUpErrorMessage: string | null;
  signInErrorMessage: string | null;
  updateMeErrorMessage: string | null;
  pickUpTelcomMoveErrorMessage: string | null;
  carSaleErrorMessage: string | null;
}

const initialState: IState = {
  signUpErrorMessage: null,
  signInErrorMessage: null,
  updateMeErrorMessage: null,
  pickUpTelcomMoveErrorMessage: null,
  carSaleErrorMessage: null,
};

const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    initialize: (state) => {
      for (const key in state) {
        state[key] = initialState[key];
      }
    },
    // 회원가입 에러
    throwSignUpError: (state, action: PayloadAction<string>) => {
      state.signUpErrorMessage = action.payload;
    },
    catchSignUpError: (state) => {
      state.signUpErrorMessage = null;
    },
    // 로그인 에러
    throwSignInError: (state, action: PayloadAction<string>) => {
      state.signInErrorMessage = action.payload;
    },
    catchLoginError: (state) => {
      state.signInErrorMessage = null;
    },
    // 회원정보수정 에러
    throwUpdateMeError: (state, action: PayloadAction<string>) => {
      state.updateMeErrorMessage = action.payload;
    },
    catchUpdateMeError: (state) => {
      state.updateMeErrorMessage = null;
    },
    // pickup / telcom / move 요청 에러
    throwPickUpTelcomMoveError: (state, action: PayloadAction<string>) => {
      state.pickUpTelcomMoveErrorMessage = action.payload;
    },
    catchPickUpTelcomMoveError: (state) => {
      state.pickUpTelcomMoveErrorMessage = null;
    },
    // car sale service 에러
    throwCarSaleError: (state, action: PayloadAction<string>) => {
      state.carSaleErrorMessage = action.payload;
    },
    catchCarSaleError: (state) => {
      state.carSaleErrorMessage = null;
    },
  },
});

export const actions = errorSlice.actions;
export default errorSlice.reducer;
