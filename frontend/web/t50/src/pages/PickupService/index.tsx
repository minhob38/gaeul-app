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
import Scroll from "@components/common/Scroll";
import PickupTelcomMoveRequestButton from "@components/PickupTelcomMoveService/PickupTelcomMoveRequestButton";
import { actions as errorActions } from "@store/slices/errorSlice";
import { useTypedDispatch, useTypedSelector } from "@hooks/useStore";
import PickupTelcomMoveNotificationModal from "modals/PickupTelcomMoveNotificationModal";
import { useMyPickupBookingQuery } from "@hooks/useApiQuery";
import * as variables from "@constants/variables";
import { useEffect, useState } from "react";

const YearContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: ${`calc(100% - ${margins.SIDE_MAIN_MARGIN} - ${margins.SIDE_MAIN_MARGIN})`};
  margin: 0 auto 10px auto;
`;

const MonthDateContainer = styled(YearContainer)``;
const HourMinuteContainer = styled(YearContainer)``;
const PlaceContainer = styled(YearContainer)``;
const FlightContainer = styled(YearContainer)``;

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

const Gap = styled.div`
  height: 20px;
`;

// = button 영역 + margin을 줄 height
// prettier-ignore
const SCROLL_BOTTOM_MARGIN = size.REQUEST_BUTTON_SCROLL_HEIGHT;

const PickupService = () => {
  const [isAirport, setIsAirport] = useState<boolean>(false);
  const dispatch = useTypedDispatch();
  const isPickupTelcomMoveNotification = useTypedSelector(
    (state) => state.rootReducer.modalReducer.isPickupTelcomMoveNotification,
  );
  const arrival = useTypedSelector((state) => state.rootReducer.pickupReducer.arrival);
  const departure = useTypedSelector((state) => state.rootReducer.pickupReducer.departure);

  const handleFocus = () => dispatch(errorActions.catchPickUpTelcomMoveError());

  const query = useMyPickupBookingQuery();
  const apiData = query.data;

  useEffect(() => {
    if (arrival === variables.EPICKUP_PLACE.IA || departure === variables.EPICKUP_PLACE.IA) {
      setIsAirport(true);
      return;
    }
    return setIsAirport(false);
  }, [arrival, departure]);

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
      <Header title="Pick up" mode="back"></Header>
      <Content top={size.HEADER_HEIGHT} bottom="0">
        <Scroll direction="y" height={`calc(100% - ${SCROLL_BOTTOM_MARGIN}px)`}>
          <Title>Schedule</Title>
          <YearContainer>
            <SelectContainer onFocus={handleFocus}>
              <SelectTitle>Year</SelectTitle>
              <ScheduleSelect
                service={ESERVICE_TYPE.PICKUP}
                type={ESCHEDULE_TYPE.YEAR}
                size={{ width: "160px", height: "30px" }}
              />
            </SelectContainer>
          </YearContainer>
          <MonthDateContainer>
            <SelectContainer onFocus={handleFocus}>
              <SelectTitle>Month</SelectTitle>
              <ScheduleSelect
                service={ESERVICE_TYPE.PICKUP}
                type={ESCHEDULE_TYPE.MONTH}
                size={{ width: "120px", height: "30px" }}
              />
            </SelectContainer>
            <SelectContainer onFocus={handleFocus}>
              <SelectTitle>Date</SelectTitle>
              <ScheduleSelect
                service={ESERVICE_TYPE.PICKUP}
                type={ESCHEDULE_TYPE.DATE}
                size={{ width: "120px", height: "30px" }}
              />
            </SelectContainer>
          </MonthDateContainer>
          <HourMinuteContainer>
            <SelectContainer onFocus={handleFocus}>
              <SelectTitle>Hour</SelectTitle>
              <ScheduleSelect
                service={ESERVICE_TYPE.PICKUP}
                type={ESCHEDULE_TYPE.HOUR}
                size={{ width: "120px", height: "30px" }}
              />
            </SelectContainer>
            <SelectContainer onFocus={handleFocus}>
              <SelectTitle>Minute</SelectTitle>
              <ScheduleSelect
                service={ESERVICE_TYPE.PICKUP}
                type={ESCHEDULE_TYPE.MINUTE}
                size={{ width: "120px", height: "30px" }}
              />
            </SelectContainer>
          </HourMinuteContainer>
          <Gap />
          <Title>Place</Title>
          <PlaceContainer>
            <SelectContainer onFocus={handleFocus}>
              <SelectTitle>Departure</SelectTitle>
              <PlaceSelect
                service={ESERVICE_TYPE.PICKUP}
                type={EPLACE_TYPE.DEPARTURE}
                size={{ width: "160px", height: "30px" }}
                places={variables.DEPARTURE_PLACES}
              />
            </SelectContainer>
            <SelectContainer onFocus={handleFocus}>
              <SelectTitle>Arrival</SelectTitle>
              <PlaceSelect
                service={ESERVICE_TYPE.PICKUP}
                type={EPLACE_TYPE.ARRIVAL}
                size={{ width: "160px", height: "30px" }}
                places={variables.ARRIVAL_PLACES}
              />
            </SelectContainer>
          </PlaceContainer>
          <Gap />
          {isAirport && (
            <>
              <Title>Flight</Title>
              <FlightContainer>
                <TextInput
                  service={ESERVICE_TYPE.PICKUP}
                  name="flightNumber"
                  placeholder="Flight Number"
                />
              </FlightContainer>
            </>
          )}
        </Scroll>
        <RequestButtonContainer>
          <PickupTelcomMoveRequestButton service={ESERVICE_TYPE.PICKUP} />
        </RequestButtonContainer>
      </Content>
    </>
  );
};

export default PickupService;
