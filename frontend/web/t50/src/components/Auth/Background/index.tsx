import styled from "@emotion/styled";

import * as colors from "@constants/colors";

const Wrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: ${colors.GRAY_1};
`;

const Background: React.FC = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

export default Background;
