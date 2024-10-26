/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import * as margins from "@constants/margins";
import * as fonts from "@constants/fonts";
import * as colors from "@constants/colors";
import Image from "@components/common/Image";
import information from "@assets/images/information.png";
import { Link } from "react-router-dom";
import { LANDING_PATH } from "@constants/route-path";

const Wrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  padding: 0 ${margins.SIDE_MAIN_MARGIN} 0 ${margins.SIDE_MAIN_MARGIN};
  width: 100%;
  height: 100%;
`;

const ErrorTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0 0 0;
  font: ${fonts.FONT_LARGE_600};
  color: ${colors.BLACK_1};
  text-align: center;
`;

const ResetButton = styled(Link)`
  all: unset;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0 0 0;
  width: 80px;
  height: 40px;
  border-radius: 10px;
  font: ${fonts.FONT_LARGE_600};
  color: ${colors.WHITE_1};
  background-color: ${colors.BLACK_1};
`;

const NotFound = () => {
  return (
    <Wrapper>
      <Image src={information} alt="back" height="50px" />
      <ErrorTitle>{`Not Found Page 😢`}</ErrorTitle>
      <ResetButton to={LANDING_PATH}>Home</ResetButton>
    </Wrapper>
  );
};

export default NotFound;
