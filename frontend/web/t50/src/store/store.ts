import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
import logger from "redux-logger";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "@store/slices/authSlice";
import viewReducer from "@store/slices/viewSlice";
import navigationReducer from "@store/slices/navigationSlice";
import modalReducer from "@store/slices/modalSlice";
import userReducer from "@store/slices/userSlice";
import errorReducer from "@store/slices/errorSlice";

export function* rootSaga() {
  yield all([]);
}

const sagaMiddleware = createSagaMiddleware();
const middleware: any = [sagaMiddleware];

if (process.env.NODE_ENV === "development") {
  middleware.push(logger);
}

// combine으로 합치지 않아도 됩니다. (코드정리를 위해 rootReducer로 묶었습니다.)
const rootReducer = combineReducers({
  authReducer,
  userReducer,
  viewReducer,
  navigationReducer,
  modalReducer,
  errorReducer,
});

// redux persist 설정
const persistConfig = { key: "root", version: 1, storage, blacklist: ["authReducer"] };
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: { rootReducer: persistedReducer },
  middleware,
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
