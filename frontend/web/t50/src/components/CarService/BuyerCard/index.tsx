/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import * as fonts from "@constants/fonts";
import * as colors from "@constants/colors";
import * as margins from "@constants/margins";
import { useTypedSelector } from "@hooks/useStore";

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

const TextContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font: ${fonts.FONT_MEDIUM_600};
  color: ${colors.BLACK_1};
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

const BuyerCard: React.FC = () => {
  const email = useTypedSelector((state) => state.rootReducer.userReducer.email);
  const name = useTypedSelector((state) => state.rootReducer.userReducer.name);
  const phoneNumber = useTypedSelector((state) => state.rootReducer.userReducer.phoneNumber);

  return (
    <Wrapper>
      <TextContainer>
        <BulletText>Name</BulletText>
        <PlainText>{name}</PlainText>
      </TextContainer>
      <TextContainer>
        <BulletText>Email</BulletText>
        <PlainText>{email}</PlainText>
      </TextContainer>
      <TextContainer>
        <BulletText>Mobile</BulletText>
        <PlainText>{phoneNumber}</PlainText>
      </TextContainer>
    </Wrapper>
  );
};

export default BuyerCard;
