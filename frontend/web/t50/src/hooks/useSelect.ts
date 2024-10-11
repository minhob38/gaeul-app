import { ESERVICE_TYPE } from "types/enum";
import { useTypedSelector } from "./useStore";

export const useDateSelector = (service: ESERVICE_TYPE): string[] => {
  const pickupYear = useTypedSelector((state) => state.rootReducer.pickupReducer.year);
  const pickupMonth = useTypedSelector((state) => state.rootReducer.pickupReducer.month);
  const pickupDate = useTypedSelector((state) => state.rootReducer.pickupReducer.date);
  const pickupHour = useTypedSelector((state) => state.rootReducer.pickupReducer.hour);
  const pickupMinute = useTypedSelector((state) => state.rootReducer.pickupReducer.minute);

  const telcomYear = useTypedSelector((state) => state.rootReducer.telcomReducer.year);
  const telcomMonth = useTypedSelector((state) => state.rootReducer.telcomReducer.month);
  // const telcomDate = useTypedSelector((state) => state.rootReducer.telcomReducer.date);
  // const telcomHour = useTypedSelector((state) => state.rootReducer.telcomReducer.hour);
  // const telcomMinute = useTypedSelector((state) => state.rootReducer.telcomReducer.minute);

  const moveYear = useTypedSelector((state) => state.rootReducer.moveReducer.year);
  const moveMonth = useTypedSelector((state) => state.rootReducer.moveReducer.month);
  const moveDate = useTypedSelector((state) => state.rootReducer.moveReducer.date);
  // const moveHour = useTypedSelector((state) => state.rootReducer.moveReducer.hour);
  // const moveMinute = useTypedSelector((state) => state.rootReducer.pickupReducer.minute);

  switch (service) {
    case ESERVICE_TYPE.PICKUP:
      return [pickupYear, pickupMonth, pickupDate, pickupHour, pickupMinute];
    case ESERVICE_TYPE.TELCOM:
      return [telcomYear, telcomMonth];
    case ESERVICE_TYPE.MOVE:
      return [moveYear, moveMonth, moveDate];
    default:
      return [];
  }
};
