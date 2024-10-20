import styled from "@emotion/styled";

import * as colors from "@constants/colors";
import * as size from "@constants/size";

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
  padding: 40px;
  height: 500px;
  background-color: ${colors.WHITE_1};
  border: 1px solid ${colors.GRAY_3};
  border-radius: ${size.BORDER_RADIUS_1};
`;

const Box: React.FC = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

export default Box;
