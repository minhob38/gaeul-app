import { useMutation } from "react-query";
import * as api from "@apis/functions";
import { useTypedDispatch, useTypedSelector } from "./useStore";
import { actions as authActions } from "@store/slices/authSlice";
import { actions as modalActions } from "@store/slices/modalSlice";
import { actions as errorActions } from "@store/slices/errorSlice";
import { actions as userActions } from "@store/slices/userSlice";
import { UNAUTHORIZED } from "@constants/variables";
import { useUnauthorizedNavigate } from "./useAuth";

export const useApiMutation = <T>(api: any) => {
  const { mutate, isLoading, isError, error, isSuccess } = useMutation<unknown, unknown, T, void>(
    api,
    {
      // mutation.mutate의 callback (.mutate 실행되면 호출)
      onMutate: (variables) => {
        console.log("mutate", variables);
      },
      // error
      onError: (error, variables, context) => {
        console.log("error", error, variables, context);
      },
      // success
      onSuccess: (data, variables, context) => {
        console.log("success", data, variables, context);
      },
      // error + success
      onSettled: () => {
        console.log("settled");
      },
    },
  );

  return { mutate, isLoading, isError, error, isSuccess };
};

/**
 * @description 초기 인증체크 mutation 함수
 */
export const useCheckInitialAuthMutation = () => {
  const dispatch = useTypedDispatch();
  const mutation = useMutation(api.checkInitialAuth, {
    onMutate: (variables) => {
      // dispatch(modalActions.showLoading());
    },
    onError: (error, variables, context) => {
      const errorMessage = (error as Error).message;
      if (errorMessage === UNAUTHORIZED) {
        dispatch(userActions.unAuthenticate());
      }
    },
    onSuccess: (data, variables, context) => {
      dispatch(userActions.authenticate());
    },
    onSettled: () => {
      // dispatch(modalActions.hideLoading());
    },
  });

  return mutation;
};

/**
 * @description 회원가입 mutation 함수
 */
export const useSignUpMutation = () => {
  const dispatch = useTypedDispatch();
  const mutation = useMutation(api.signUpApi, {
    onMutate: (variables) => {
      dispatch(modalActions.showLoading());
    },
    onError: (error, variables, context) => {
      const errorMessage = (error as Error).message;
      dispatch(errorActions.throwSignUpError(errorMessage));
    },
    onSuccess: (data, variables, context) => {
      dispatch(authActions.showSignUpNotification());
    },
    onSettled: () => {
      dispatch(modalActions.hideLoading());
    },
  });

  return mutation;
};

/**
 * @description 로그인 mutation 함수
 */
export const useSignInMutation = () => {
  const dispatch = useTypedDispatch();
  const mutation = useMutation(api.signInApi, {
    onMutate: (variables) => {
      dispatch(modalActions.showLoading());
    },
    onError: (error, variables, context) => {
      const errorMessage = (error as Error).message;
      dispatch(errorActions.throwLoginError(errorMessage));
    },
    onSuccess: async (data, variables, context) => {
      dispatch(userActions.authenticate());
      dispatch(userActions.findMe({ key: data.key, name: data.name, email: data.email }));

      return;
    },
    onSettled: () => {
      dispatch(modalActions.hideLoading());
    },
  });

  return mutation;
};

// /**
//  * @description 로그아웃 mutation 함수
//  */
// export const useLogoutMutation = () => {
//   const dispatch = useTypedDispatch();
//   const mutation = useMutation(api.logoutApi, {
//     onMutate: (variables) => {
//       dispatch(modalActions.showLoading());
//     },
//     onError: (error, variables, context) => {
//       const errorMessage = (error as Error).message;
//       if (errorMessage === UNAUTHORIZED) {
//         dispatch(userActions.unAuthenticate());
//         return;
//       }
//     },
//     onSuccess: (data, variables, context) => {
//       dispatch(userActions.unAuthenticate());
//     },
//     onSettled: () => {
//       dispatch(modalActions.hideLoading());
//     },
//   });

//   return mutation;
// };

// /**
//  * @description 회원정보수정 mutation 함수
//  */
// export const useUpdateMeMutation = () => {
//   const unauthorizedNavigate = useUnauthorizedNavigate();
//   const dispatch = useTypedDispatch();
//   const mutation = useMutation(api.updateMeApi, {
//     onMutate: (variables) => {
//       dispatch(modalActions.showLoading());
//     },
//     onError: (error, variables, context) => {
//       const errorMessage = (error as Error).message;
//       if (errorMessage === UNAUTHORIZED) {
//         unauthorizedNavigate();

//         return;
//       }
//       dispatch(errorActions.throwUpdateMeError(errorMessage));
//     },
//     onSuccess: (data, variables, context) => {
//       dispatch(modalActions.showUpdateMeNotification());
//     },
//     onSettled: () => {
//       dispatch(modalActions.hideLoading());
//     },
//   });

//   return mutation;
// };

// /**
//  * @description pickup 요청 mutation 함수
//  */
// export const usePickUpMutation = () => {
//   const unauthorizedNavigate = useUnauthorizedNavigate();
//   const dispatch = useTypedDispatch();
//   const mutation = useMutation(api.pickUpRequestApi, {
//     onMutate: (variables) => {
//       dispatch(modalActions.showLoading());
//     },
//     onError: (error, variables, context) => {
//       const errorMessage = (error as Error).message;
//       if (errorMessage === UNAUTHORIZED) {
//         unauthorizedNavigate();

//         return;
//       }
//       dispatch(errorActions.throwPickUpTelcomMoveError(errorMessage));
//     },
//     onSuccess: (data, variables, context) => {
//       dispatch(modalActions.showPickupTelcomMoveNotification());
//     },
//     onSettled: () => {
//       dispatch(modalActions.hideLoading());
//     },
//   });

//   return mutation;
// };

// /**
//  * @description telcom 요청 mutation 함수
//  */
// export const useTelcomMutation = () => {
//   const unauthorizedNavigate = useUnauthorizedNavigate();
//   const dispatch = useTypedDispatch();
//   const mutation = useMutation(api.telcomRequestApi, {
//     onMutate: (variables) => {
//       dispatch(modalActions.showLoading());
//     },
//     onError: (error, variables, context) => {
//       const errorMessage = (error as Error).message;
//       if (errorMessage === UNAUTHORIZED) {
//         unauthorizedNavigate();

//         return;
//       }
//       dispatch(errorActions.throwPickUpTelcomMoveError(errorMessage));
//     },
//     onSuccess: (data, variables, context) => {
//       dispatch(modalActions.showPickupTelcomMoveNotification());
//     },
//     onSettled: () => {
//       dispatch(modalActions.hideLoading());
//     },
//   });

//   return mutation;
// };

// /**
//  * @description move 요청 mutation 함수
//  */
// export const useMoveMutation = () => {
//   const unauthorizedNavigate = useUnauthorizedNavigate();
//   const dispatch = useTypedDispatch();
//   const mutation = useMutation(api.moveRequestApi, {
//     onMutate: (variables) => {
//       dispatch(modalActions.showLoading());
//     },
//     onError: (error, variables, context) => {
//       const errorMessage = (error as Error).message;
//       if (errorMessage === UNAUTHORIZED) {
//         unauthorizedNavigate();

//         return;
//       }
//       dispatch(errorActions.throwPickUpTelcomMoveError(errorMessage));
//     },
//     onSuccess: (data, variables, context) => {
//       dispatch(modalActions.showPickupTelcomMoveNotification());
//     },
//     onSettled: () => {
//       dispatch(modalActions.hideLoading());
//     },
//   });

//   return mutation;
// };

// /**
//  * @description car buy 요청 mutation 함수
//  */
// export const useCarBuyRequestMutation = () => {
//   const unauthorizedNavigate = useUnauthorizedNavigate();
//   const dispatch = useTypedDispatch();
//   const mutation = useMutation(api.carBuyRequestApi, {
//     onMutate: (variables) => {
//       dispatch(modalActions.showLoading());
//     },
//     onError: (error, variables, context) => {
//       const errorMessage = (error as Error).message;
//       if (errorMessage === UNAUTHORIZED) {
//         unauthorizedNavigate();

//         return;
//       }
//       dispatch(errorActions.throwCarSaleError(errorMessage));
//     },
//     onSuccess: (data, variables, context) => {
//       dispatch(modalActions.showCarNotification());
//     },
//     onSettled: () => {
//       dispatch(modalActions.hideLoading());
//     },
//   });

//   return mutation;
// };

// /**
//  * @description pickup cancel mutation 함수
//  */
// export const usePickupCancelMutation = () => {
//   const unauthorizedNavigate = useUnauthorizedNavigate();
//   const dispatch = useTypedDispatch();
//   const mutation = useMutation(api.pickupCancelApi, {
//     onMutate: (variables) => {
//       dispatch(modalActions.showLoading());
//     },
//     onError: (error, variables, context) => {
//       const errorMessage = (error as Error).message;
//       if (errorMessage === UNAUTHORIZED) {
//         unauthorizedNavigate();

//         return;
//       }
//       dispatch(errorActions.throwPickUpTelcomMoveError(errorMessage));
//     },
//     onSuccess: (data, variables, context) => {
//       // 여기에 매개변수를 넣게???
//       dispatch(modalActions.showPickupTelcomMoveNotification());
//     },
//     onSettled: () => {
//       dispatch(modalActions.hideLoading());
//     },
//   });

//   return mutation;
// };

// /**
//  * @description pickup cancel mutation 함수
//  */
// export const useTelocmCancelMutation = () => {
//   const unauthorizedNavigate = useUnauthorizedNavigate();
//   const dispatch = useTypedDispatch();
//   const mutation = useMutation(api.telcomCancelApi, {
//     onMutate: (variables) => {
//       dispatch(modalActions.showLoading());
//     },
//     onError: (error, variables, context) => {
//       const errorMessage = (error as Error).message;
//       if (errorMessage === UNAUTHORIZED) {
//         unauthorizedNavigate();

//         return;
//       }
//       dispatch(errorActions.throwPickUpTelcomMoveError(errorMessage));
//     },
//     onSuccess: (data, variables, context) => {
//       // 여기에 매개변수를 넣게???
//       dispatch(modalActions.showPickupTelcomMoveNotification());
//     },
//     onSettled: () => {
//       dispatch(modalActions.hideLoading());
//     },
//   });

//   return mutation;
// };

// /**
//  * @description move cancel mutation 함수
//  */
// export const useMoveCancelMutation = () => {
//   const unauthorizedNavigate = useUnauthorizedNavigate();
//   const dispatch = useTypedDispatch();
//   const mutation = useMutation(api.moveCancelApi, {
//     onMutate: (variables) => {
//       dispatch(modalActions.showLoading());
//     },
//     onError: (error, variables, context) => {
//       const errorMessage = (error as Error).message;
//       if (errorMessage === UNAUTHORIZED) {
//         unauthorizedNavigate();

//         return;
//       }
//       dispatch(errorActions.throwPickUpTelcomMoveError(errorMessage));
//     },
//     onSuccess: (data, variables, context) => {
//       // 여기에 매개변수를 넣게???
//       dispatch(modalActions.showPickupTelcomMoveNotification());
//     },
//     onSettled: () => {
//       dispatch(modalActions.hideLoading());
//     },
//   });

//   return mutation;
// };

// /**
//  * @description car cancel mutation 함수
//  */
// export const useCarCancelMutation = () => {
//   const unauthorizedNavigate = useUnauthorizedNavigate();
//   const dispatch = useTypedDispatch();
//   const mutation = useMutation(api.carCancelApi, {
//     onMutate: (variables) => {
//       dispatch(modalActions.showLoading());
//     },
//     onError: (error, variables, context) => {
//       const errorMessage = (error as Error).message;
//       if (errorMessage === UNAUTHORIZED) {
//         unauthorizedNavigate();

//         return;
//       }
//       dispatch(errorActions.throwCarSaleError(errorMessage));
//     },
//     onSuccess: (data, variables, context) => {
//       dispatch(modalActions.showCarNotification());
//     },
//     onSettled: () => {
//       dispatch(modalActions.hideLoading());
//     },
//   });

//   return mutation;
// };
