/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import * as fonts from "@constants/fonts";
import * as colors from "@constants/colors";
import { useTypedDispatch, useTypedSelector } from "@hooks/useStore";
import { useMoveMutation, usePickUpMutation, useTelcomMutation } from "@hooks/useApiMutation";
import { ESERVICE_TYPE } from "types/enum";
import { shallowEqual } from "react-redux";
import * as variables from "@constants/variables";
import { actions as errorActions } from "@store/slices/errorSlice";
import * as margins from "@constants/margins";

interface IProps {
  service: ESERVICE_TYPE;
}

const Wrapper = styled.div`
  display: flex;
  justify-content: fl;
  align-items: center;
  flex-flow: column nowrap;
  width: 100%;
  height: 100px;
  margin: 0 auto;
`;

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex: 1;
  border-radius: 8px;
  background-color: ${colors.PRIMARY_1};
  font: ${fonts.FONT_LARGE_400};
  color: ${colors.WHITE_1};
`;

const ErrorText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  width: 100%;
  font: ${fonts.FONT_SMALL_400};
  color: ${colors.ERROR_RED};
  text-align: center;
`;

const PickupTelcomMoveRequestButton: React.FC<IProps> = ({ service }) => {
  const userId = useTypedSelector((state) => state.rootReducer.userReducer.userId);
  const pickupState = useTypedSelector((state) => state.rootReducer.pickupReducer, shallowEqual);
  const telcomState = useTypedSelector((state) => state.rootReducer.telcomReducer, shallowEqual);
  const moveState = useTypedSelector((state) => state.rootReducer.moveReducer, shallowEqual);
  const errorMessage = useTypedSelector(
    (state) => state.rootReducer.errorReducer.pickUpTelcomMoveErrorMessage,
  );
  const dispatch = useTypedDispatch();
  const pickUpMutation = usePickUpMutation();
  const telcomMutation = useTelcomMutation();
  const moveMutation = useMoveMutation();

  const handleClick = () => {
    if (!userId) return null;

    switch (service) {
      case ESERVICE_TYPE.PICKUP:
        if (
          pickupState.year === variables.SELECT_YEAR_DEFAULT_TEXT ||
          pickupState.month === variables.SELECT_MONTH_DEFAULT_TEXT ||
          pickupState.date === variables.SELECT_DATE_DEFAULT_TEXT
        ) {
          dispatch(errorActions.throwPickUpTelcomMoveError("Enter year, month and date"));
          return;
        }

        if (
          pickupState.hour === variables.SELECT_HOUR_DEFAULT_TEXT ||
          pickupState.minute === variables.SELECT_MINUTE_DEFAULT_TEXT
        ) {
          dispatch(errorActions.throwPickUpTelcomMoveError("Enter hour and minute"));
          return;
        }

        if (
          pickupState.departure === variables.SELECT_DEFAULT_TEXT ||
          pickupState.arrival === variables.SELECT_DEFAULT_TEXT
          // flightNumber === variables.SELECT_DEFAULT_TEXT
        ) {
          dispatch(errorActions.throwPickUpTelcomMoveError("Enter departure and arrival"));
          return;
        }

        pickUpMutation.mutate({
          userId,
          year: pickupState.year,
          month: pickupState.month,
          date: pickupState.date,
          hour: pickupState.hour,
          minute: pickupState.minute,
          departure: pickupState.departure,
          arrival: pickupState.arrival,
          flightNumber: pickupState.flightNumber,
        });
        return;
      case ESERVICE_TYPE.TELCOM:
        if (
          telcomState.year === variables.SELECT_YEAR_DEFAULT_TEXT ||
          telcomState.month === variables.SELECT_MONTH_DEFAULT_TEXT
        ) {
          dispatch(errorActions.throwPickUpTelcomMoveError("Enter year, month"));
          return;
        }

        if (!telcomState.kind.length) {
          dispatch(errorActions.throwPickUpTelcomMoveError("Enter telcom service kind"));
          return;
        }

        telcomMutation.mutate({
          userId,
          year: telcomState.year,
          month: telcomState.month,
          kind: telcomState.kind,
        });
        return;
      case ESERVICE_TYPE.MOVE:
        if (
          moveState.year === variables.SELECT_YEAR_DEFAULT_TEXT ||
          moveState.month === variables.SELECT_MONTH_DEFAULT_TEXT ||
          moveState.date === variables.SELECT_DATE_DEFAULT_TEXT
        ) {
          dispatch(errorActions.throwPickUpTelcomMoveError("Enter year, month and date"));
          return;
        }

        if (
          moveState.departureNation === variables.SELECT_DEFAULT_TEXT ||
          moveState.departureNation === variables.SELECT_DEFAULT_TEXT ||
          moveState.arrivalNation === variables.SELECT_DEFAULT_TEXT ||
          moveState.arrivalAddress === variables.SELECT_DEFAULT_TEXT
        ) {
          dispatch(errorActions.throwPickUpTelcomMoveError("Enter departure and arrival"));
          return;
        }

        moveMutation.mutate({
          userId,
          year: moveState.year,
          month: moveState.month,
          date: moveState.date,
          departureNation: moveState.departureNation,
          departureAddress: moveState.departureAddress,
          arrivalNation: moveState.arrivalNation,
          arrivalAddress: moveState.arrivalAddress,
        });
        return;
      default:
        return;
    }
  };

  return (
    <Wrapper>
      <ErrorText>{errorMessage}</ErrorText>
      <Button onClick={handleClick}>Request</Button>
    </Wrapper>
  );
};

export default PickupTelcomMoveRequestButton;
