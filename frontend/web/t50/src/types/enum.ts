export enum ESERVER_ERROR_CODE {
  AUTH_0000 = "AUTH_0000",
  AUTH_0001 = "AUTH_0001",
  AUTH_0002 = "AUTH_0002",
  AUTH_0011 = "AUTH_0011",
  AUTH_0012 = "AUTH_0012",
  AUTH_0013 = "AUTH_0013",
  AUTH_0021 = "AUTH_0021",
  AUTH_0022 = "AUTH_0022",
  AUTH_0023 = "AUTH_0023",

  // AUTH_0000("auth error"),

  // // user
  // AUTH_0001("user already exists"), AUTH_0002("user does not exists"),

  // // password
  // AUTH_0011("password does not match"), AUTH_0012("both current and new password are required"),
  // AUTH_0013("current password is same as new password"),

  // // jwt
  // AUTH_0021("jwt does not exist"), AUTH_0022("jwt is invalid"), AUTH_0023("jwt is expired");
}

export enum ESERVICE_TYPE {
  PICKUP = "pickup",
  MOVE = "move",
  CAR = "car",
  TELCOM = "telcom",
}

export enum EPLACE_TYPE {
  ARRIVAL = "arrival",
  DEPARTURE = "departure",
}

export enum ESCHEDULE_TYPE {
  YEAR = "year",
  MONTH = "month",
  DATE = "date",
  HOUR = "hour",
  MINUTE = "minute",
}

export enum ETELCOM_KIND_TYPE {
  MOBILE = "mobile",
  INTERNET = "internet",
  TV = "tv",
}

export enum EENGLISH_MONTH {
  JAN = "Jan",
  FEB = "Feb",
  MAR = "Mar",
  APR = "Apr",
  MAY = "May",
  JUN = "Jun",
  JUL = "Jul",
  AUG = "Aug",
  SEP = "Sep",
  OCT = "Oct",
  NOV = "Nov",
  DEC = "Dec",
}

export enum ECAR_SEARCH_TYPE {
  NEW = "NEW",
  USED = "USED",
}

export enum EPRICE_TYPE {
  MIN = "min",
  MAX = "max",
}

export enum ESALE_STATUS {
  APPLIED = "APPLIED",
  PREPARED = "PREPARED",
  WITHDRAWAL = "WITHDRAWAL",
  DELIVERY_COMPLETE = "DELIVERY_COMPLETE",
}
