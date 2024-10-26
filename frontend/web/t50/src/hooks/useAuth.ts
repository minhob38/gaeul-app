import { useNavigate } from "react-router-dom";
import { useTypedDispatch } from "./useStore";
import { actions as userActions } from "@store/slices/userSlice";
import { useEffect } from "react";
import { useCheckInitialAuthMutation } from "./useApiMutation";
import { SIGNIN_PATH } from "@constants/route-path";

export const useUnauthorizedNavigate = () => {
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();
  const unauthorizedNavigate = () => {
    dispatch(userActions.unAuthenticate());
    navigate(SIGNIN_PATH);
  };
  return unauthorizedNavigate;
};

export const useInitialAuthentication = () => {
  // const mutate = useCheckInitialAuthMutation();
  // useEffect(() => {
  //   mutate.mutate();
  // }, []);
};
