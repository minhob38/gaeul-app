import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ESERVICE_TYPE } from "types/enum";

interface IState {
  isLoginWarning: boolean;
  isLoading: boolean;
  isSignUpNotification: boolean;
  isUpdateMeNotification: boolean;
  isPickupTelcomMoveNotification: boolean;
  isMyBookingCancelNotification: boolean;
  isCarNotification: boolean;
  isMyCarCancelNotification: boolean;
  myBookingCancelCurrentService: ESERVICE_TYPE | null;
}

const initialState: IState = {
  isLoginWarning: false,
  isLoading: false,
  isSignUpNotification: false,
  isUpdateMeNotification: false,
  isPickupTelcomMoveNotification: false,
  isMyBookingCancelNotification: false,
  isCarNotification: false,
  isMyCarCancelNotification: false,
  myBookingCancelCurrentService: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    initialize: (state) => {
      for (const key in state) {
        if (key === "isLoginWarning") continue;
        state[key] = initialState[key];
      }
    },
    // 로그인이 필요한 서비스 경고 모달
    showLoginWarning: (state) => {
      state.isLoginWarning = true;
    },
    hideLoginWarning: (state) => {
      state.isLoginWarning = false;
    },
    // 로딩 모달
    showLoading: (state) => {
      state.isLoading = true;
    },
    hideLoading: (state) => {
      state.isLoading = false;
    },
    // 회원가입 성공 알림 모달
    showSignUpNotification: (state) => {
      state.isSignUpNotification = true;
    },
    hideSignUpNotification: (state) => {
      state.isSignUpNotification = false;
    },
    // 회원정보수정 성공 알림 모달
    showUpdateMeNotification: (state) => {
      state.isUpdateMeNotification = true;
    },
    hideUpdateMeNotification: (state) => {
      state.isUpdateMeNotification = false;
    },
    // pickup/telcom/move 성공 알림 모달
    showPickupTelcomMoveNotification: (state) => {
      state.isPickupTelcomMoveNotification = true;
    },
    hidePickupTelcomMoveNotification: (state) => {
      state.isPickupTelcomMoveNotification = false;
    },
    // my booking 취소 물어보기 모달
    showMyBookingCancelNotification: (state, action: PayloadAction<ESERVICE_TYPE>) => {
      state.isMyBookingCancelNotification = true;
      state.myBookingCancelCurrentService = action.payload;
    },
    hideMyBookingCancelNotification: (state) => {
      state.isMyBookingCancelNotification = false;
      state.myBookingCancelCurrentService = null;
    },
    // car 성공 알림 모달
    showCarNotification: (state) => {
      state.isCarNotification = true;
    },
    hideCarNotification: (state) => {
      state.isCarNotification = false;
    },
    // car 취소 물어보기 모달
    showMyCarCancelNotification: (state) => {
      state.isMyCarCancelNotification = true;
    },
    hideMyCarCancelNotification: (state) => {
      state.isMyCarCancelNotification = false;
    },
  },
});

export const actions = modalSlice.actions;
export default modalSlice.reducer;
