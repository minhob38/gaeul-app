import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@store/store";
import { actions as authActions } from "@store/slices/authSlice";

export const useTypedDispatch = () => useDispatch<AppDispatch>();
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useInitialization = () => {
  const dispatch = useTypedDispatch();

  const initializeStore = () => {
    dispatch(authActions.initialize());
  };

  return initializeStore;
};
