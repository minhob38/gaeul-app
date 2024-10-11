/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import Header from "@components/common/Header";
import Content from "@components/common/Content";
import Scroll from "@components/common/Scroll";
import * as size from "@constants/size";
import * as margins from "@constants/margins";
import { useCarDetailQuery } from "@hooks/useApiQuery";
import * as fonts from "@constants/fonts";
import * as colors from "@constants/colors";
import { useTypedSelector } from "@hooks/useStore";
import CarRequestButton from "@components/CarService/CarRequestButton";
import BuyerCard from "@components/CarService/BuyerCard";
import { useParams } from "react-router";
import CardDetailCard from "@components/CarService/CarDetatilCard";
import CarNotificationModal from "modals/CarNotificationModal";

const Subtitle = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: calc(100% - 2 * ${margins.SIDE_MAIN_MARGIN});
  margin: ${margins.SIDE_MAIN_MARGIN} auto 0 auto;
  font: ${fonts.FONT_LARGE_600};
  color: ${colors.BLACK_1};
  text-align: center;
`;

const NoticeText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px auto 0 auto;
  width: calc(100% - 2 * ${margins.SIDE_MAIN_MARGIN});
  font: ${fonts.FONT_LARGE_400};
  color: ${colors.BLACK_1};
  text-align: center;
`;

const ErrorText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  width: ${`calc(100% - ${margins.SIDE_MAIN_MARGIN} - ${margins.SIDE_MAIN_MARGIN})`};
  margin: 0 auto;
  font: ${fonts.FONT_SMALL_400};
  color: ${colors.ERROR_RED};
  text-align: center;
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 0 auto;
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

const SCROLL_BOTTOM_MARGIN = size.REQUEST_BUTTON_SCROLL_HEIGHT;

const CarBuy = () => {
  const { carBasicId } = useParams();
  const isCarNotification = useTypedSelector(
    (state) => state.rootReducer.modalReducer.isCarNotification,
  );
  const query = useCarDetailQuery(parseInt(carBasicId || ""));
  const apiData = query.data;

  return (
    <>
      {isCarNotification && (
        <CarNotificationModal notification="Request success" buttonText="Go to home" path="/" />
      )}
      <Header title="Car" mode="back" path="/car"></Header>
      <Content top={size.HEADER_HEIGHT} bottom="0">
        <Scroll direction="y" height={`calc(100% - ${SCROLL_BOTTOM_MARGIN}px)`}>
          <Subtitle>Car information</Subtitle>
          {apiData && (
            <CardContainer>
              <CardDetailCard
                carBasicId={apiData.carBasicId}
                carImageUrl={apiData.carImageUrl}
                brandName={apiData.brandName}
                carModelName={apiData.carModelName}
                segment={apiData.segment}
                fuelType={apiData.fuelType}
                bodyType={apiData.bodyType}
                price={apiData.price}
                seatCount={apiData.seatCount}
              />
            </CardContainer>
          )}
          <Subtitle>Buyer information</Subtitle>
          <CardContainer>
            <BuyerCard />
          </CardContainer>
          <NoticeText>If you apply, we will contact you separately within 7 days</NoticeText>
        </Scroll>
        <RequestButtonContainer>
          <CarRequestButton />
        </RequestButtonContainer>
      </Content>
    </>
  );
};

export default CarBuy;
