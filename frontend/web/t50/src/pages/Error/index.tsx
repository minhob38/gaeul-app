/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import * as margins from "@constants/margins";
import * as fonts from "@constants/fonts";
import * as colors from "@constants/colors";
import Image from "@components/common/Image";
import information from "@assets/images/information.png";
import { Link } from "react-router-dom";

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

const Description = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font: ${fonts.FONT_MEDIUM_400};
  color: ${colors.BLACK_1};
  text-align: center;
`;

const ResetButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 50px auto 0 auto;
  width: 180px;
`;

const ResetButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 0 0 0;
  width: 80px;
  height: 40px;
  border-radius: 10px;
  font: ${fonts.FONT_LARGE_600};
  color: ${colors.WHITE_1};
  background-color: ${colors.BLACK_1};
`;

const ErrorPage = ({ error, resetErrorBoundary }) => {
  const homePath = "/";

  return (
    <Wrapper>
      <Image src={information} alt="back" height="50px" />
      <ErrorTitle>{`Error occurs as below 😢`}</ErrorTitle>
      <Description>{`"${error.message}"`}</Description>
      <ResetButtonContainer>
        <Link to={homePath}>
          <ResetButton
            onClick={() => {
              resetErrorBoundary();
            }}
          >
            Home
          </ResetButton>
        </Link>
        <ResetButton
          onClick={() => {
            resetErrorBoundary();
          }}
        >
          Reload
        </ResetButton>
      </ResetButtonContainer>
    </Wrapper>
  );
};

export default ErrorPage;
