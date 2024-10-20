import axios, { API_SERVER_ADDRESS } from "@configs/axios-config";
import { convertEnglishToNumberMonth, convertTelcomServiceInputToApiRequest } from "@utils/common";
import { ECAR_SEARCH_TYPE, ESALE_STATUS, ESERVER_ERROR_CODE } from "types/enum";
import {
  IPickupRequest,
  ILoginRequest,
  ISignUpRequest,
  IApiResponse,
  ITelcomRequest,
  IMoveRequest,
  IMoveCancelRequest,
  IPickupCancelRequest,
  ITelcomCancelRequest,
  ICarRequest,
  IMyCarResponse,
  TSaleStatus,
  ICarSaleResponse,
  ICarCancelRequest,
  IUpdateMeRequest,
} from "types/api-type";
import { UNAUTHORIZED } from "@constants/variables";

export const testGetApi = async () => {
  const response = await axios.get("https://jsonplaceholder.typicode.com/posts/1");
  const { data } = response;
  await new Promise((resolve, reject) => setTimeout(() => resolve("..."), 3000));
  // throw new Error("error"); -> onError로 감 / onError로 가면 ErrorBoundary 동작
  return data;
};

export const testPostApi = async (input) => {
  const body = { title: "foo", body: "bar", userId: 1 };
  const response = await axios.post("https://jsonplaceholder.typicode.com/posts", body);
  const { data } = response;
  // throw new Error("error"); -> onError로 감
  return data;
};

/**
 * @description 초기 인증 체크
 */
export const checkInitialAuth = async () => {
  const response = await axios.get<IApiResponse>(`${API_SERVER_ADDRESS}/api/v1/users/login-status`);

  const data = response.data;
  const status = response.status;

  // if (status === 401) throw new Error(UNAUTHORIZED);

  // 개발환경에서는 cookie 체크안함
  if (process.env.NODE_ENV === "development") return;

  if (data.status === "success") {
    const apiData = data.data;
    if (apiData.validLogin) return;
    throw new Error(UNAUTHORIZED);
  }

  throw new Error("auth check error");
};

/**
 * @description 회원가입 api
 */
export const signUpApi = async (input: ISignUpRequest) => {
  const { name, email, password } = input;
  const body: {
    email: string;
    name: string;
    password: string;
  } = {
    email,
    name,
    password,
  };

  const response = await axios.post<IApiResponse>(
    `${API_SERVER_ADDRESS}/api/v1/auth/signup`,
    body,
    {
      // withCredentials: true,
    },
  );

  const data = response.data;
  const apiData = data.data;
  const status = response.status;

  if (data.status === "success") return;

  if (data.code === ESERVER_ERROR_CODE.AUTH_0000) {
    throw new Error("회원가입에 실패하였습니다.");
  }

  if (data.code === ESERVER_ERROR_CODE.AUTH_0001) {
    throw new Error("이미 가입된 회원이 존재합니다.");
  }

  throw new Error("로그인에 실패하였습니다.");
};

export const signInApi = async (input: ILoginRequest) => {
  const { email, password } = input;
  const body: { email: string; password: string } = { email, password };

  const response = await axios.post<IApiResponse>(
    `${API_SERVER_ADDRESS}/api/v1/auth/signin`,
    body,
    // { withCredentials: true },
  );

  const data = response.data;

  console.log("@@@ api data");
  console.log(data);

  if (data.status === "success") return data.data;

  if (data.code === ESERVER_ERROR_CODE.AUTH_0011) {
    throw new Error("비밀번호가 맞지 않습니다.");
  }

  if (data.code === ESERVER_ERROR_CODE.AUTH_0002) {
    throw new Error("존재하지 않는 회원입니다.");
  }

  throw new Error("로그인에 실패하였습니다.");
};

// export const logoutApi = async () => {
//   const response = await axios.post<IApiResponse>(`${API_SERVER_ADDRESS}/api/v1/users/logout`);

//   const data = response.data;
//   const apiData = data.data;
//   const status = response.status;

//   // 로그아웃은 별도 응답처리할 필요 없음

//   // if (status === 401) throw new Error(UNAUTHORIZED);

//   // if (data.result === "SUCCESS") {
//   //   return;
//   // }

//   // if (data.result === "FAIL") {
//   //   throw new Error("logout error");
//   // }
// };

// export const updateMeApi = async (input: IUpdateMeRequest) => {
//   await checkInitialAuth();
//   const { userId, name, phoneNumber } = input;
//   const body: { userId: number; name: string; phoneNumber: string } = { userId, name, phoneNumber };

//   const response = await axios.post<IApiResponse>(
//     `${API_SERVER_ADDRESS}/api/v1/mypage/user-profiles/${userId}`,
//     body,
//     // { withCredentials: true },
//   );

//   const data = response.data;
//   const apiData = data.data;
//   const status = response.status;

//   // if (status === 401) throw new Error(UNAUTHORIZED);

//   if (data.result === "SUCCESS") {
//     return { userId: apiData.userId };
//   }

//   if (data.result === "FAIL") {
//     throw new Error("update my information error");
//   }
// };

// /**
//  * @description 나의 정보 조회 api
//  */
// export const findMeApi = async (userId: number) => {
//   await checkInitialAuth();
//   const response = await axios.get<IApiResponse>(
//     `${API_SERVER_ADDRESS}/api/v1/mypage/users/${userId}`,
//     // { withCredentials: true },
//   );

//   const data = response.data;
//   const status = response.status;

//   // if (status === 401) throw new Error(UNAUTHORIZED);

//   if (data.result === "SUCCESS") {
//     const apiData = data.data as unknown as {
//       email: string;
//       fullName: string;
//       phoneNumber: string;
//     };

//     if (!apiData) return null;

//     return {
//       email: apiData.email,
//       fullName: apiData.fullName,
//       phoneNumber: apiData.phoneNumber,
//     };
//   }

//   if (data.result === "FAIL") {
//     throw new Error("find my information  error");
//   }
// };

// /**
//  * @description pickup 요청 api
//  */
// export const pickUpRequestApi = async (input: IPickupRequest) => {
//   await checkInitialAuth();
//   const { userId, year, month, date, hour, minute, departure, arrival, flightNumber } = input;
//   const body: {
//     userId: number;
//     year: number;
//     month: number;
//     day: number;
//     hour: number;
//     minute: number;
//     departure: string;
//     arrival: string;
//     flightNumber: string;
//   } = {
//     userId,
//     year: parseInt(year),
//     month: convertEnglishToNumberMonth(month),
//     day: parseInt(date),
//     hour: parseInt(hour),
//     minute: parseInt(minute),
//     departure,
//     arrival,
//     flightNumber,
//   };

//   const response = await axios.post<IApiResponse>(
//     `${API_SERVER_ADDRESS}/api/v1/pickups/request`,
//     body,
//     // { withCredentials: true },
//   );

//   const data = response.data;
//   const status = response.status;

//   // if (status === 401) throw new Error(UNAUTHORIZED);

//   if (data.result === "SUCCESS") return;

//   if (data.result === "FAIL") {
//     // 입력데이터가 없을때
//     if (data.errorCode === "COMMON_INVALID_PARAMETER") {
//       throw new Error("enter pickup schedule form");
//     }

//     throw new Error("pick up error");
//   }
// };

// /**
//  * @description 통신서비스 요청 api
//  */
// export const telcomRequestApi = async (input: ITelcomRequest) => {
//   await checkInitialAuth();

//   const { userId, year, month, kind } = input;
//   const body: {
//     userId: number;
//     year: number;
//     month: number;
//     arrApplyTelecommunicationTypeStr: string;
//   } = {
//     userId,
//     year: parseInt(year),
//     month: convertEnglishToNumberMonth(month),
//     arrApplyTelecommunicationTypeStr: convertTelcomServiceInputToApiRequest(kind),
//   };

//   const response = await axios.post<IApiResponse>(
//     `${API_SERVER_ADDRESS}/api/v1/telecommunications/request`,
//     body,
//     // { withCredentials: true },
//   );

//   const data = response.data;
//   const status = response.status;

//   // if (status === 401) throw new Error(UNAUTHORIZED);

//   if (data.result === "SUCCESS") return;

//   if (data.result === "FAIL") {
//     // 입력데이터가 없을때
//     if (data.errorCode === "COMMON_INVALID_PARAMETER") {
//       throw new Error("enter telecommunication schedule form");
//     }

//     throw new Error("telcom error");
//   }
// };

// /**
//  * @description 이사 서비스 요청 api
//  */
// export const moveRequestApi = async (input: IMoveRequest) => {
//   await checkInitialAuth();

//   const {
//     userId,
//     year,
//     month,
//     date,
//     departureNation,
//     departureAddress,
//     arrivalNation,
//     arrivalAddress,
//   } = input;
//   const body: {
//     userId: number;
//     year: number;
//     month: number;
//     day: number;
//     departureNation: string;
//     departureAddress: string;
//     arrivalNation: string;
//     arrivalAddress: string;
//   } = {
//     userId,
//     year: parseInt(year),
//     month: convertEnglishToNumberMonth(month),
//     day: parseInt(date),
//     departureNation,
//     departureAddress,
//     arrivalNation,
//     arrivalAddress,
//   };

//   const response = await axios.post<IApiResponse>(
//     `${API_SERVER_ADDRESS}/api/v1/moves/request`,
//     body,
//     // { withCredentials: true },
//   );

//   const data = response.data;
//   const status = response.status;

//   // if (status === 401) throw new Error(UNAUTHORIZED);

//   if (data.result === "SUCCESS") return;

//   if (data.result === "FAIL") {
//     // 입력데이터가 없을때
//     if (data.errorCode === "COMMON_INVALID_PARAMETER") {
//       throw new Error("enter move schedule form");
//     }

//     throw new Error("move error");
//   }
// };

// /**
//  * @description car 서비스 요청 api
//  */
// export const carBuyRequestApi = async (input: ICarRequest) => {
//   await checkInitialAuth();

//   const { userId, carBasicId } = input;
//   const body: { userId: number; carBasicId: number } = { userId, carBasicId };

//   const response = await axios.post<IApiResponse>(
//     `${API_SERVER_ADDRESS}/api/v1/car-sales/apply`,
//     body,
//     // { withCredentials: true },
//   );

//   const data = response.data;
//   const status = response.status;

//   // if (status === 401) throw new Error(UNAUTHORIZED);

//   if (data.result === "SUCCESS") return;

//   if (data.result === "FAIL") {
//     // 입력데이터가 없을때
//     if (data.errorCode === "COMMON_SYSTEM_ERROR") {
//       throw new Error("enter car buy form");
//     }

//     if (data.errorCode === "COMMON_ILLEGAL_STATUS") {
//       throw new Error("the car has already been purchased");
//     }

//     throw new Error("car service error");
//   }
// };

// /**
//  * @description pickup 서비스 취소 api
//  */
// export const pickupCancelApi = async (input: IPickupCancelRequest) => {
//   await checkInitialAuth();

//   const { pickUpId } = input;
//   const body: { pickUpId: number } = { pickUpId };

//   const response = await axios.post<IApiResponse>(
//     `${API_SERVER_ADDRESS}/api/v1/pickups/cancel`,
//     body,
//     // { withCredentials: true },
//   );

//   const data = response.data;
//   const status = response.status;

//   // if (status === 401) throw new Error(UNAUTHORIZED);

//   if (data.result === "SUCCESS") return;

//   if (data.result === "FAIL") {
//     throw new Error("move error");
//   }
// };

// /**
//  * @description telcom 서비스 취소 api
//  */
// export const telcomCancelApi = async (input: ITelcomCancelRequest) => {
//   await checkInitialAuth();

//   const { telcomId } = input;
//   const body: { telecommunicationId: number } = { telecommunicationId: telcomId };

//   const response = await axios.post<IApiResponse>(
//     `${API_SERVER_ADDRESS}/api/v1/telecommunications/cancel`,
//     body,
//     // { withCredentials: true },
//   );

//   const data = response.data;
//   const status = response.status;

//   // if (status === 401) throw new Error(UNAUTHORIZED);

//   if (data.result === "SUCCESS") return;

//   if (data.result === "FAIL") {
//     throw new Error("telcom error");
//   }
// };

// /**
//  * @description move 서비스 취소 api
//  */
// export const moveCancelApi = async (input: IMoveCancelRequest) => {
//   await checkInitialAuth();

//   const { moveId } = input;
//   const body: { moveId: number } = { moveId };

//   const response = await axios.post<IApiResponse>(
//     `${API_SERVER_ADDRESS}/api/v1/moves/cancel`,
//     body,
//     // { withCredentials: true },
//   );

//   const data = response.data;
//   const status = response.status;

//   if (data.result === "SUCCESS") return;

//   if (data.result === "FAIL") {
//     throw new Error("move error");
//   }
// };

// /**
//  * @description 차량 구매 취소 api
//  */
// export const carCancelApi = async (input: ICarCancelRequest) => {
//   await checkInitialAuth();

//   const { carToSaleId } = input;
//   const body: { carToSaleId: number } = { carToSaleId };

//   const response = await axios.post<IApiResponse>(
//     `${API_SERVER_ADDRESS}/api/v1/car-sales/withdraw`,
//     body,
//     // { withCredentials: true },
//   );

//   const data = response.data;
//   const status = response.status;

//   // if (status === 401) throw new Error(UNAUTHORIZED);

//   if (data.result === "SUCCESS") return;

//   if (data.result === "FAIL") {
//     throw new Error("move error");
//   }
// };

// /**
//  * @description 나의 pickup 조회 api
//  */
// export const findMyPickupApi = async ({ queryKey }) => {
//   await checkInitialAuth();

//   const [key, userId] = queryKey;
//   const response = await axios.get<IApiResponse>(
//     `${API_SERVER_ADDRESS}/api/v1/pickups/${userId}/retrieve`,
//     // { withCredentials: true },
//   );

//   const data = response.data;
//   const status = response.status;

//   // if (status === 401) throw new Error(UNAUTHORIZED);

//   if (data.result === "SUCCESS") {
//     const apiData = data.data as unknown as {
//       pickUpId: number;
//       applyStatus: string;
//       arrival: string;
//       day: number;
//       departure: string;
//       flightNumber: string;
//       hour: number;
//       minute: number;
//       month: number;
//       year: number;
//     };

//     if (!apiData) return null;

//     return {
//       pickUpId: apiData.pickUpId,
//       applyStatus: apiData.applyStatus,
//       arrival: apiData.arrival,
//       date: apiData.day,
//       departure: apiData.departure,
//       flightNumber: apiData.flightNumber,
//       hour: apiData.hour,
//       minute: apiData.minute,
//       month: apiData.month,
//       year: apiData.year,
//       status: apiData.applyStatus,
//     };
//   }

//   if (data.result === "FAIL") {
//     // if (data.errorCode === "COMMON_INVALID_PARAMETER") return null;
//     throw new Error("find my pickup booking error");
//   }
// };

// /**
//  * @description 나의 telcom 조회 api
//  */
// export const findMyTelcomApi = async ({ queryKey }) => {
//   await checkInitialAuth();

//   const [key, userId] = queryKey;
//   const response = await axios.get<IApiResponse>(
//     `${API_SERVER_ADDRESS}/api/v1/telecommunications/${userId}/retrieve`,
//     // { withCredentials: true },
//   );

//   const data = response.data;
//   const status = response.status;

//   // if (status === 401) throw new Error(UNAUTHORIZED);

//   if (data.result === "SUCCESS") {
//     const apiData = data.data as unknown as {
//       telecommunicationId: number;
//       year: number;
//       month: number;
//       applyMobilePhone: boolean;
//       applyInternet: boolean;
//       applyTv: boolean;
//       applyStatus: string;
//     };

//     if (!apiData) return null;

//     return {
//       telecommunicationId: apiData.telecommunicationId,
//       year: apiData.year,
//       month: apiData.month,
//       isMobilePhone: apiData.applyMobilePhone,
//       isInternet: apiData.applyInternet,
//       isTv: apiData.applyTv,
//       status: apiData.applyStatus,
//     };
//   }

//   if (data.result === "FAIL") {
//     // if (data.errorCode === "COMMON_INVALID_PARAMETER") return null;
//     throw new Error("find my pickup booking error");
//   }
// };

// /**
//  * @description 나의 move 조회 api
//  */
// export const findMyMoveApi = async ({ queryKey }) => {
//   await checkInitialAuth();

//   const [key, userId] = queryKey;
//   const response = await axios.get<IApiResponse>(
//     `${API_SERVER_ADDRESS}/api/v1/moves/${userId}/retrieve`,
//     // { withCredentials: true },
//   );

//   const data = response.data;
//   const status = response.status;

//   // if (status === 401) throw new Error(UNAUTHORIZED);

//   if (data.result === "SUCCESS") {
//     const apiData = data.data as unknown as {
//       moveId: number;
//       year: number;
//       month: number;
//       departureNation: string;
//       departureAddress: string;
//       arrivalNation: string;
//       arrivalAddress: string;
//       applyStatus: string;
//     };

//     if (!apiData) return null;

//     return {
//       moveId: apiData.moveId,
//       year: apiData.year,
//       month: apiData.month,
//       departureNation: apiData.departureNation,
//       departureAddress: apiData.departureAddress,
//       arrivalNation: apiData.arrivalNation,
//       arrivalAddress: apiData.arrivalAddress,
//       status: apiData.applyStatus,
//     };
//   }

//   if (data.result === "FAIL") {
//     // if (data.errorCode === "COMMON_INVALID_PARAMETER") return null;
//     throw new Error("find my pickup booking error");
//   }
// };

// /**
//  * @description 구매가능한 car들 조회 api
//  */
// export const findCarSalesApi = async ({ queryKey }): Promise<ICarSaleResponse[]> => {
//   await checkInitialAuth();

//   const [key, searchType, { priceStart, priceEnd }] = queryKey;
//   const body: { newAndUsed: ECAR_SEARCH_TYPE; priceStart: number; priceEnd: number } = {
//     newAndUsed: searchType,
//     priceStart,
//     priceEnd,
//   };

//   const response = await axios.post<IApiResponse>(
//     `${API_SERVER_ADDRESS}/api/v1/car-sales/available`,
//     body,

//     // { withCredentials: true },
//   );

//   const data = response.data;
//   const status = response.status;

//   // if (status === 401) throw new Error(UNAUTHORIZED);

//   if (data.result === "SUCCESS") {
//     const apiData = data.data as unknown as {
//       carBasicId: number;
//       brandCode: string;
//       brandName: string;
//       carModelCode: string;
//       carModelName: string;
//       newAndUsed: ECAR_SEARCH_TYPE;
//       generationName: string;
//       fuelType: string;
//       segment: string;
//       bodyType: string;
//       seatCount: number;
//       price: number;
//       imagePath: string;
//       imageFileName: string;
//       buyerUserId: number;
//       carYear: string;
//     }[];

//     if (!apiData) return [];

//     return apiData.map((data) => {
//       let bodyType: string;

//       switch (data.bodyType) {
//         case "SEDAN":
//           bodyType = "Sedan";
//           break;
//         case "HATCHBACK":
//           bodyType = "Hatch";
//           break;
//         default:
//           bodyType = data.bodyType;
//       }

//       return {
//         carBasicId: data.carBasicId,
//         brandCode: data.brandCode,
//         brandName: data.brandName,
//         carModelCode: data.carModelCode,
//         carModelName: data.carModelName,
//         newAndUsed: data.newAndUsed,
//         generationName: data.generationName,
//         fuelType: data.fuelType,
//         segment: data.segment,
//         bodyType,
//         seatCount: data.seatCount,
//         price: data.price,
//         carImageUrl: (data.imagePath || "") + (data.imageFileName || ""),
//         buyerUserId: data.buyerUserId, // ?
//         carYear: data.carYear,
//       };
//     });
//   }

//   if (data.result === "FAIL") {
//     throw new Error("find car sale list error");
//   }

//   return [];
// };

// /**
//  * @description car 상세 조회 api
//  */
// export const findCarDetailApi = async ({ queryKey }) => {
//   await checkInitialAuth();

//   const [key, carBasicId] = queryKey;
//   const response = await axios.get<IApiResponse>(
//     `${API_SERVER_ADDRESS}/api/v1/car-sales/${carBasicId}`,
//     // { withCredentials: true },
//   );

//   const data = response.data;
//   const status = response.status;

//   // if (status === 401) throw new Error(UNAUTHORIZED);

//   if (data.result === "SUCCESS") {
//     const apiData = data.data as unknown as {
//       carBasicId: number;
//       brandCode: string;
//       brandName: string;
//       carModelCode: string;
//       carModelName: string;
//       newAndUsed: ECAR_SEARCH_TYPE;
//       generationName: string;
//       fuelType: string;
//       segment: string;
//       bodyType: string;
//       seatCount: number;
//       price: number;
//       imagePath: string;
//       imageFileName: string;
//       buyerUserId: number;
//     };

//     if (!apiData) return null;

//     let bodyType: string;

//     switch (apiData.bodyType) {
//       case "SEDAN":
//         bodyType = "Sedan";
//         break;
//       case "HATCHBACK":
//         bodyType = "Hatch";
//         break;
//       default:
//         bodyType = apiData.bodyType;
//     }

//     return {
//       carBasicId: apiData.carBasicId,
//       brandCode: apiData.brandCode,
//       brandName: apiData.brandName,
//       carModelCode: apiData.carModelCode,
//       carModelName: apiData.carModelName,
//       newAndUsed: apiData.newAndUsed,
//       generationName: apiData.generationName,
//       fuelType: apiData.fuelType,
//       segment: apiData.segment,
//       bodyType,
//       seatCount: apiData.seatCount,
//       price: apiData.price,
//       carImageUrl: (apiData.imagePath || "") + (apiData.imageFileName || ""),
//       buyerUserId: apiData.buyerUserId, // ?
//     };
//   }

//   if (data.result === "FAIL") {
//     throw new Error("find car detail  error");
//   }
// };

// /**
//  * @description 구매신청한 car들 조회 api
//  */
// export const findMyCarsApi = async ({ queryKey }): Promise<IMyCarResponse[]> => {
//   await checkInitialAuth();

//   const [key, userId] = queryKey;
//   const response = await axios.get<IApiResponse>(
//     `${API_SERVER_ADDRESS}/api/v1/car-sales/users/${userId}`,
//     // { withCredentials: true },
//   );

//   const data = response.data;
//   const status = response.status;

//   // if (status === 401) throw new Error(UNAUTHORIZED);

//   if (data.result === "SUCCESS") {
//     const apiData = data.data as unknown as {
//       carToSaleId: number;
//       carBasicId: number;
//       brandCode: string;
//       brandName: string;
//       carModelCode: string;
//       carModelName: string;
//       newAndUsed: ECAR_SEARCH_TYPE;
//       generationName: string;
//       fuelType: string;
//       segment: string;
//       bodyType: string;
//       seatCount: number;
//       price: number;
//       imagePath: string;
//       imageFileName: string;
//       buyerUserId: number;
//       saleStatus: ESALE_STATUS;
//     }[];

//     if (!apiData) return [];

//     return apiData.map((data) => {
//       let bodyType: string;
//       let saleStatus: TSaleStatus;
//       let newAndUsed: string;

//       switch (data.bodyType) {
//         case "SEDAN":
//           bodyType = "Sedan";
//           break;
//         case "HATCHBACK":
//           bodyType = "Hatch";
//           break;
//         default:
//           bodyType = data.bodyType;
//       }

//       switch (data.saleStatus) {
//         case ESALE_STATUS.APPLIED:
//           saleStatus = "Applied";
//           break;
//         case ESALE_STATUS.PREPARED:
//           saleStatus = "Prepared";
//           break;
//         case ESALE_STATUS.DELIVERY_COMPLETE:
//           saleStatus = "Completed";
//           break;
//         case ESALE_STATUS.WITHDRAWAL:
//           saleStatus = "Canceled";
//           break;
//         default:
//           saleStatus = data.saleStatus;
//       }

//       switch (data.newAndUsed) {
//         case ECAR_SEARCH_TYPE.NEW:
//           newAndUsed = "New car";
//           break;
//         case ECAR_SEARCH_TYPE.USED:
//           newAndUsed = "Used car";
//           break;
//         default:
//           newAndUsed = data.newAndUsed;
//       }

//       return {
//         carToSaleId: data.carToSaleId,
//         carBasicId: data.carBasicId,
//         brandCode: data.brandCode,
//         brandName: data.brandName,
//         carModelCode: data.carModelCode,
//         carModelName: data.carModelName,
//         newAndUsed,
//         generationName: data.generationName,
//         fuelType: data.fuelType,
//         segment: data.segment,
//         bodyType,
//         seatCount: data.seatCount,
//         price: data.price,
//         carImageUrl: data.imagePath + data.imageFileName,
//         buyerUserId: data.buyerUserId,
//         saleStatus,
//       };
//     });
//   }

//   if (data.result === "FAIL") {
//     throw new Error("find my cars error");
//   }

//   return [];
// };
