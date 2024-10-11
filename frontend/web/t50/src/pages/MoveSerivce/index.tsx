/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import Header from "@components/common/Header";
import Content from "@components/common/Content";
import * as size from "@constants/size";
import * as margins from "@constants/margins";
import * as fonts from "@constants/fonts";
import * as colors from "@constants/colors";
import PlaceSelect from "@components/common/Select/PlaceSelect";
import { EPLACE_TYPE, ESCHEDULE_TYPE, ESERVICE_TYPE } from "types/enum";
import ScheduleSelect from "@components/common/Select/ScheduleSelect";
import TextInput from "@components/common/Input/TextInput";
import PickupTelcomMoveRequestButton from "@components/PickupTelcomMoveService/PickupTelcomMoveRequestButton";
import Scroll from "@components/common/Scroll";
import PickupTelcomMoveNotificationModal from "modals/PickupTelcomMoveNotificationModal";
import { useTypedDispatch, useTypedSelector } from "@hooks/useStore";
import { actions as errorActions } from "@store/slices/errorSlice";
import * as variables from "@constants/variables";
import { useMyMoveBookingQuery } from "@hooks/useApiQuery";

const YearContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: ${`calc(100% - ${margins.SIDE_MAIN_MARGIN} - ${margins.SIDE_MAIN_MARGIN})`};
  margin: 0 auto 10px auto;
`;

const MonthDateContainer = styled(YearContainer)``;
const PlaceContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 20px 0;
  width: ${`calc(100% - ${margins.SIDE_MAIN_MARGIN} - ${margins.SIDE_MAIN_MARGIN})`};
  margin: 0 auto 10px auto;
`;

const SelectContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  margin: 0 20px 0 0;
`;

const SelectTitle = styled.div`
  width: 100%;
  display: flex;
  /* justify-content: center; */
  align-items: center;
  font: ${fonts.FONT_SMALL_400};
  color: ${colors.BLACK_1};
`;

const Title = styled.div`
  margin: ${margins.TOP_MARGIN} 0 5px ${margins.SIDE_MAIN_MARGIN};
  font: ${fonts.FONT_LARGE_600};
  color: ${colors.BLACK_1};
`;

const Gap = styled.div`
  height: 20px;
`;

const ArrivalContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
  gap: 15px 0;
  width: 100%;
`;

const RequestButtonContainer = styled.div`
  position: fixed;
  bottom: ${margins.SIDE_MAIN_MARGIN};
  left: 50%;
  transform: translate(-50%, 0);
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${`calc(100% - ${margins.SIDE_MAIN_MARGIN} - ${margins.SIDE_MAIN_MARGIN})`};
`;

// = button 영역 + margin을 줄 height
// prettier-ignore
const SCROLL_BOTTOM_MARGIN = size.REQUEST_BUTTON_SCROLL_HEIGHT;

const MoveService = () => {
  const dispatch = useTypedDispatch();
  const isPickupTelcomMoveNotification = useTypedSelector(
    (state) => state.rootReducer.modalReducer.isPickupTelcomMoveNotification,
  );
  const query = useMyMoveBookingQuery();
  const apiData = query.data;

  const handleFocus = () => dispatch(errorActions.catchPickUpTelcomMoveError());

  return (
    <>
      {apiData && (
        <PickupTelcomMoveNotificationModal
          notification="You have a booking in progress"
          buttonText="Go to my booking"
          path="/my-booking"
        />
      )}
      {isPickupTelcomMoveNotification && (
        <PickupTelcomMoveNotificationModal
          notification="Request success"
          buttonText="Go to home"
          path="/"
        />
      )}
      <Header title="Move" mode="back"></Header>
      <Content top={size.HEADER_HEIGHT} bottom="0">
        <Scroll direction="y" height={`calc(100% - ${SCROLL_BOTTOM_MARGIN}px)`}>
          <Title>Schedule</Title>
          <YearContainer>
            <SelectContainer onFocus={handleFocus}>
              <SelectTitle>Year</SelectTitle>
              <ScheduleSelect
                service={ESERVICE_TYPE.MOVE}
                type={ESCHEDULE_TYPE.YEAR}
                size={{ width: "160px", height: "30px" }}
              />
            </SelectContainer>
          </YearContainer>
          <MonthDateContainer>
            <SelectContainer onFocus={handleFocus}>
              <SelectTitle>Month</SelectTitle>
              <ScheduleSelect
                service={ESERVICE_TYPE.MOVE}
                type={ESCHEDULE_TYPE.MONTH}
                size={{ width: "120px", height: "30px" }}
              />
            </SelectContainer>
            <SelectContainer onFocus={handleFocus}>
              <SelectTitle>Date</SelectTitle>
              <ScheduleSelect
                service={ESERVICE_TYPE.MOVE}
                type={ESCHEDULE_TYPE.DATE}
                size={{ width: "120px", height: "30px" }}
              />
            </SelectContainer>
          </MonthDateContainer>
          <Gap />
          <Title>Place</Title>
          <PlaceContainer>
            <ArrivalContainer>
              <SelectContainer onFocus={handleFocus}>
                <SelectTitle>Departure</SelectTitle>
                <PlaceSelect
                  service={ESERVICE_TYPE.MOVE}
                  type={EPLACE_TYPE.DEPARTURE}
                  size={{ width: "160px", height: "30px" }}
                  places={variables.DEPARTURE_NATIONS}
                />
              </SelectContainer>
              <TextInput
                service={ESERVICE_TYPE.MOVE}
                name="departureAddress"
                placeholder="Departure Address"
              />
            </ArrivalContainer>
            <ArrivalContainer>
              <SelectContainer onFocus={handleFocus}>
                <SelectTitle>Arrival</SelectTitle>
                <PlaceSelect
                  service={ESERVICE_TYPE.MOVE}
                  type={EPLACE_TYPE.ARRIVAL}
                  size={{ width: "160px", height: "30px" }}
                  places={variables.ARRIVAL_NATIONS}
                />
              </SelectContainer>
              <TextInput
                service={ESERVICE_TYPE.MOVE}
                name="arrivalAddress"
                placeholder="Arrival Address"
              />
            </ArrivalContainer>
          </PlaceContainer>
        </Scroll>
        <RequestButtonContainer>
          <PickupTelcomMoveRequestButton service={ESERVICE_TYPE.MOVE} />
        </RequestButtonContainer>
      </Content>
    </>
  );
};

export default MoveService;
