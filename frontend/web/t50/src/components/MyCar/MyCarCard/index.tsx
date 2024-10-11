/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import * as fonts from "@constants/fonts";
import * as colors from "@constants/colors";
import * as margins from "@constants/margins";
import Image from "@components/common/Image";
import { actions as carActions } from "@store/slices/carSlice";
import CancelButton from "../CancelButton";
import { useTypedDispatch } from "@hooks/useStore";

interface IProps {
  carToSaleId: number;
  carBasicId: number;
  carImageUrl: string;
  brandName: string;
  carModelName: string;
  segment: string;
  fuelType: string;
  bodyType: string;
  price: number;
  seatCount: number;
  saleStatus: string;
  newAndUsed: string;
}

interface IStyleProps {
  isCanceled: boolean;
}

const PADDING = "15px";

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: flex-start;
  width: calc(100% - 2 * ${margins.SIDE_MAIN_MARGIN});
  margin: 0 auto 0 auto;
  padding: ${PADDING};
  border-radius: 8px;
  background-color: ${colors.WHITE_1};
  box-shadow: ${colors.SHADOW};
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 10px auto;
  width: 80%;
`;

const TextContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font: ${fonts.FONT_MEDIUM_600};
  color: ${colors.BLACK_1};
`;

const StateBox = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 10px auto 0 auto;
  height: 40px;
  border-radius: 8px;
  background: ${(props: IStyleProps) =>
    props.isCanceled ? `${colors.ERROR_RED}` : `${colors.PRIMARY_1}`};
  font: ${fonts.FONT_MEDIUM_600};
  color: ${colors.WHITE_1};
`;

const BulletText = styled.div`
  width: 80px;
  font: ${fonts.FONT_MEDIUM_600};
  color: ${colors.BLACK_1};
`;

const PlainText = styled.div`
  font: ${fonts.FONT_MEDIUM_400};
  color: ${colors.BLACK_1};
`;

/* transform: translate(0, -100%); */
const CancelButtonContainer = styled.div`
  position: absolute;
  right: 0;
  top: -100%;
  z-index: 3;
`;

const MyCarCard: React.FC<IProps> = ({
  carToSaleId,
  carBasicId,
  carImageUrl,
  brandName,
  carModelName,
  segment,
  fuelType,
  bodyType,
  price,
  seatCount,
  saleStatus,
  newAndUsed,
}) => {
  const dispatch = useTypedDispatch();
  const handleCancelClick = () => {
    dispatch(carActions.clickCarToCancel(carToSaleId));
  };

  return (
    <Wrapper>
      <ImageContainer>
        <Image src={carImageUrl} alt="car" width="100%" />
      </ImageContainer>
      <TextContainer>
        <BulletText>Type</BulletText>
        <PlainText>{newAndUsed}</PlainText>
      </TextContainer>
      <TextContainer>
        <BulletText>Brand</BulletText>
        <PlainText>{brandName}</PlainText>
      </TextContainer>
      <TextContainer>
        <BulletText>Model</BulletText>
        <PlainText>{carModelName}</PlainText>
      </TextContainer>
      <TextContainer>
        <BulletText>Fuel</BulletText>
        <PlainText>{fuelType}</PlainText>
      </TextContainer>
      <TextContainer>
        <BulletText>Segment</BulletText>
        <PlainText>{segment}</PlainText>
      </TextContainer>
      <TextContainer>
        <BulletText>Body</BulletText>
        <PlainText>{bodyType}</PlainText>
      </TextContainer>
      <TextContainer>
        <BulletText>Seat</BulletText>
        <PlainText>{seatCount}</PlainText>
      </TextContainer>
      <TextContainer>
        <BulletText>Price</BulletText>
        <PlainText>{`$ ${price}`}</PlainText>
      </TextContainer>
      <StateBox isCanceled={saleStatus === "Canceled"}>
        {saleStatus}
        {saleStatus !== "Canceled" && (
          <CancelButtonContainer onClick={handleCancelClick}>
            <CancelButton>Cancel</CancelButton>
          </CancelButtonContainer>
        )}
      </StateBox>
    </Wrapper>
  );
};

export default MyCarCard;
