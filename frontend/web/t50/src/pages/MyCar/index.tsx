/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import * as fonts from "@constants/fonts";
import * as colors from "@constants/colors";
import * as margins from "@constants/margins";
import * as size from "@constants/size";
import Header from "@components/common/Header";
import Content from "@components/common/Content";
import Scroll from "@components/common/Scroll";
import { useMyCarsQuery } from "@hooks/useApiQuery";
import MyBookingCancelModal from "modals/MyBookingCancelModal";
import { useTypedSelector } from "@hooks/useStore";
import MyCarCard from "@components/MyCar/MyCarCard";
import { v4 as uuid4 } from "uuid";
import EmptyCard from "@components/MyCar/EmptyCard";
import CancelButton from "@components/MyCar/CancelButton";
import MyCarCancelModal from "modals/MyCarCancelModal";

const PADDING = "15px";

const SubTitle = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: calc(100% - 2 * ${margins.SIDE_MAIN_MARGIN});
  margin: ${margins.SIDE_MAIN_MARGIN} auto 0 auto;
  font: ${fonts.FONT_LARGE_600};
  color: ${colors.BLACK_1};
  text-align: center;
`;

const Margin = styled.div`
  height: ${margins.TOP_MARGIN};
`;

const CardContainer = styled.div`
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const SCROLL_BOTTOM_MARGIN = 20;

const MyCar: React.FC = () => {
  const isMyCarCancelNotification = useTypedSelector(
    (state) => state.rootReducer.modalReducer.isMyCarCancelNotification,
  );
  const query = useMyCarsQuery();
  const apiData = query.data || [];

  const MyCarCards = apiData.map((apiData) => {
    return (
      <CardContainer key={uuid4()}>
        <MyCarCard
          key={uuid4()}
          carToSaleId={apiData.carToSaleId}
          carBasicId={apiData.carBasicId}
          carImageUrl={apiData.carImageUrl}
          brandName={apiData.brandName}
          carModelName={apiData.carModelName}
          segment={apiData.segment}
          fuelType={apiData.fuelType}
          bodyType={apiData.bodyType}
          price={apiData.price}
          seatCount={apiData.seatCount}
          saleStatus={apiData.saleStatus}
          newAndUsed={apiData.newAndUsed}
        />
      </CardContainer>
    );
  });

  return (
    <>
      {isMyCarCancelNotification && <MyCarCancelModal />}
      <Header title="My car" mode="back"></Header>
      <Content top={size.HEADER_HEIGHT} bottom="0">
        <Scroll direction="y" height={`calc(100% - ${SCROLL_BOTTOM_MARGIN}px)`}>
          <Margin />
          <SubTitle>My Car</SubTitle>
          {MyCarCards.length ? <CardContainer>{MyCarCards}</CardContainer> : <EmptyCard />}
        </Scroll>
      </Content>
    </>
  );
};

export default MyCar;
