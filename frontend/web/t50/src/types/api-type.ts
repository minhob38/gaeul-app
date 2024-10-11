import { ECAR_SEARCH_TYPE, ETELCOM_KIND_TYPE } from "./enum";

export interface IApiResponse {
  data: any;
  errorCode: string;
  message: string;
  result: "SUCCESS" | "FAIL";
}

export interface ISignUpRequest {
  fullName: string;
  email: string;
  password: string;
  rePassword: string;
}

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface IUpdateMeRequest {
  userId: number;
  name: string;
  phoneNumber: string;
}

export interface IPickupRequest {
  userId: number;
  arrival: string;
  date: string;
  departure: string;
  flightNumber: string;
  hour: string;
  minute: string;
  month: string;
  year: string;
}
// <e.g>
// arrival: "GCF";
// date: "9";
// departure: "Incheon Airport";
// flightNumber: "123";
// hour: "10";
// minute: "30";
// month: "Jun";
// year: "2024";

export interface ITelcomRequest {
  userId: number;
  kind: ETELCOM_KIND_TYPE[];
  month: string;
  year: string;
}
// <e.g>
// kind: ["internet", "mobile"];
// month: "Apr";
// year: "2024";

export interface IMoveRequest {
  userId: number;
  year: string;
  month: string;
  date: string;
  departureNation: string;
  departureAddress: string;
  arrivalNation: string;
  arrivalAddress: string;
}
// <e.g>
// arrivalAddress: "강남";
// arrivalNation: "Korea";
// date: "8";
// departureAddress: "텍사스";
// departureNation: "USA";
// month: "Jun";
// year: "2024";

export interface ICarRequest {
  userId: number;
  carBasicId: number;
}

export interface IPickupCancelRequest {
  pickUpId: number;
}

export interface ITelcomCancelRequest {
  telcomId: number;
}

export interface IMoveCancelRequest {
  moveId: number;
}

export interface ICarCancelRequest {
  carToSaleId: number;
}

// react query의 response data type
export interface ICarSaleResponse {
  carBasicId: number;
  brandCode: string;
  brandName: string;
  carModelCode: string;
  carModelName: string;
  newAndUsed: ECAR_SEARCH_TYPE;
  generationName: string;
  fuelType: string;
  segment: string;
  bodyType: string;
  seatCount: number;
  price: number;
  carImageUrl: string;
  buyerUserId: number;
  carYear: string;
}

export type TSaleStatus = "Applied" | "Prepared" | "Completed" | "Canceled";

export interface IMyCarResponse {
  carToSaleId: number;
  carBasicId: number;
  brandCode: string;
  brandName: string;
  carModelCode: string;
  carModelName: string;
  newAndUsed: string;
  generationName: string;
  fuelType: string;
  segment: string;
  bodyType: string;
  seatCount: number;
  price: number;
  carImageUrl: string;
  buyerUserId: number;
  saleStatus: TSaleStatus;
}
