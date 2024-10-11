/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import * as colors from "@constants/colors";
import * as fonts from "@constants/fonts";
import Image from "@components/common/Image";
import { Link } from "react-router-dom";

interface IProps {
  carBasicId: number;
  carImageUrl: string;
  brandName: string;
  carModelName: string;
  segment: string;
  fuelType: string;
  bodyType: string;
  price: number;
  seatCount: number;
  carYear: string | null;
}

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-flow: row;
  justify-content: start;
  margin: 0 0 10px 0;
  padding: 5px;
  box-shadow: 0 5px 10px -10px ${colors.GRAY_1}; // 아래에만 그림자 넣기
`;

const Info = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: start;
  width: 40%;
`;

const BrandName = styled.div`
  font: ${fonts.FONT_SMALL_400};
  color: ${colors.BLACK_1};
`;

const CarName = styled.div`
  font: ${fonts.FONT_SMALL_400};
  color: ${colors.BLACK_1};
`;

const Year = styled.div`
  font: ${fonts.FONT_TINY_600};
  color: ${colors.BLACK_1};
`;

const CarChipContainer = styled.div``;

const CarChip = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  font: ${fonts.FONT_TINY_400};
  color: ${colors.BLACK_1};
  background-color: ${colors.GRAY_2};
  padding: 5.5px 12px;
  border-radius: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  font: ${fonts.FONT_TINY_600};
  color: ${colors.BLACK_1};
  background-color: ${colors.PRIMARY_3};
  padding: 5.5px 12px;
  border-radius: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const BuyButton: React.FC<{ path: string; title: string }> = ({ path, title }) => {
  return <SLink to={path}>{title}</SLink>;
};

const CarCard: React.FC<IProps> = ({
  carBasicId,
  carImageUrl,
  brandName,
  carModelName,
  segment,
  fuelType,
  bodyType,
  price,
  seatCount,
  carYear,
}) => {
  // car id 심기 (attribute)
  return (
    <Wrapper>
      <Image src={carImageUrl} alt="car" width="55%" />
      <div
        css={css`
          margin: 0 0 0 5%;
        `}
      />
      <Info>
        <BrandName>{brandName}</BrandName>
        <CarName>{carModelName}</CarName>
        {carYear && <Year>{carYear}</Year>}
        {/* <CarChip> */}
        <CarChipContainer>
          {/* 세그먼트,연료 */}
          <div
            css={css`
              display: flex;
              flex-flow: row nowrap;
              margin: 0 0 5px 0;
              /* width: fit-content; */
            `}
          >
            <CarChip>{`${segment} Seg`}</CarChip>
            <div
              css={css`
                width: 5px;
              `}
            />
            <CarChip>{fuelType}</CarChip>
          </div>
          {/* 차종,인승 */}
          <div
            css={css`
              display: flex;
              flex-flow: row nowrap;
              margin: 0 0 5px 0;
              /* width: fit-content; */
            `}
          >
            <CarChip>{bodyType}</CarChip>
            <div
              css={css`
                width: 5px;
              `}
            />
            <CarChip>{`Seat ${seatCount}`}</CarChip>
          </div>
          {/* 가격 */}
          <BuyButton path={`/car/buy/${carBasicId}`} title={`Buy $${price}`}></BuyButton>
        </CarChipContainer>
      </Info>
    </Wrapper>
  );
};

export default CarCard;
