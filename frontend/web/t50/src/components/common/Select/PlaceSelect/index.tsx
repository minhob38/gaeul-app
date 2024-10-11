/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { v4 as uuid4 } from "uuid";
import * as fonts from "@constants/fonts";
import * as colors from "@constants/colors";
import * as variables from "@constants/variables";
import { useTypedDispatch, useTypedSelector } from "@hooks/useStore";
import { actions as pickUpActions } from "@store/slices/pickupSlice";
import { actions as moveActions } from "@store/slices/moveSlice";
import { EPLACE_TYPE, ESERVICE_TYPE } from "types/enum";
import { useEffect, useState } from "react";

interface IProps {
  service: ESERVICE_TYPE;
  type: EPLACE_TYPE;
  size: { width: string; height: string };
  places: string[];
}

interface IStyleProps {
  selected: boolean;
}

/**
 * @description arrival/departure select box (item들은 인자로 전달)
 */
const PlaceSelect: React.FC<IProps> = ({ service, type, size, places }) => {
  const dispatch = useTypedDispatch();
  const pickupArrival = useTypedSelector((state) => state.rootReducer.pickupReducer.arrival);
  const pickupDeparture = useTypedSelector((state) => state.rootReducer.pickupReducer.departure);
  const moveArrival = useTypedSelector((state) => state.rootReducer.moveReducer.arrivalNation);
  const moveDeparture = useTypedSelector((state) => state.rootReducer.moveReducer.departureNation);
  const [isSelected, setIsSelected] = useState<boolean>(false);

  useEffect(() => {
    switch (service) {
      case ESERVICE_TYPE.PICKUP:
        switch (type) {
          case EPLACE_TYPE.ARRIVAL:
            if (pickupArrival === variables.SELECT_DEFAULT_TEXT) {
              setIsSelected(false);
              return;
            }
            setIsSelected(true);
            break;
          case EPLACE_TYPE.DEPARTURE:
            if (pickupDeparture === variables.SELECT_DEFAULT_TEXT) {
              setIsSelected(false);
              return;
            }
            setIsSelected(true);
            break;
          default:
            setIsSelected(false);
        }
        break;
      case ESERVICE_TYPE.MOVE:
        switch (type) {
          case EPLACE_TYPE.ARRIVAL:
            if (moveArrival === variables.SELECT_DEFAULT_TEXT) {
              setIsSelected(false);
              return;
            }
            setIsSelected(true);
            break;
          case EPLACE_TYPE.DEPARTURE:
            if (moveDeparture === variables.SELECT_DEFAULT_TEXT) {
              setIsSelected(false);
              return;
            }
            setIsSelected(true);
            break;
          default:
            setIsSelected(false);
        }
        break;
      default:
    }
  }, [service, type, pickupArrival, pickupDeparture, moveDeparture, moveArrival]);

  // const departures = [variables.SELECT_DEFAULT_TEXT, "Incheon Airport"];
  // const arrivals = [variables.SELECT_DEFAULT_TEXT, "GCF"];

  let value: string;
  let name: string;
  const options = places;

  switch (service) {
    case ESERVICE_TYPE.PICKUP:
      switch (type) {
        case EPLACE_TYPE.ARRIVAL:
          value = pickupArrival;
          name = "arrival";
          break;
        case EPLACE_TYPE.DEPARTURE:
          value = pickupDeparture;
          name = "departure";
          break;
        default:
          value = "";
          name = "";
      }
      break;
    case ESERVICE_TYPE.MOVE:
      switch (type) {
        case EPLACE_TYPE.ARRIVAL:
          value = moveArrival;
          name = "arrivalNation";
          break;
        case EPLACE_TYPE.DEPARTURE:
          value = moveDeparture;
          name = "departureNation";
          break;
        default:
          value = "";
          name = "";
      }
      break;
    default:
      value = "";
      name = "";
  }

  const Options = options.map((option) => {
    return (
      <option key={uuid4()} value={option}>
        {option}
      </option>
    );
  });

  const Select = styled.select`
    all: unset;
  `;

  const Wrapper = styled.div`
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${size.width};
    height: ${size.height};
    border-radius: 8px;
    background: ${colors.WHITE_1};
    border: ${(props: IStyleProps) => (props.selected ? `2px solid ${colors.PRIMARY_3}` : `none`)};
    text-align: center;
    font: ${fonts.FONT_SMALL_400};
    color: ${(props: IStyleProps) => (props.selected ? `${colors.BLACK_1}` : `${colors.GRAY_1}`)};
    overflow: hidden;
  `;

  const handleClick = (ev) => {
    switch (service) {
      case ESERVICE_TYPE.PICKUP:
        dispatch(pickUpActions.selectInput(ev.target));
        return;
      case ESERVICE_TYPE.MOVE:
        dispatch(moveActions.selectInput(ev.target));
        return;
      default:
    }
  };

  return (
    <Wrapper selected={isSelected}>
      <Select name={name} value={value} onChange={handleClick}>
        {Options}
      </Select>
    </Wrapper>
  );
};

export default PlaceSelect;
