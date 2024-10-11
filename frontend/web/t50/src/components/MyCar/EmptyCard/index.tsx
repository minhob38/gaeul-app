/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import * as colors from "@constants/colors";
import * as margins from "@constants/margins";

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

const EmptyCard: React.FC = () => {
  return <Wrapper>No Car</Wrapper>;
};

export default EmptyCard;
