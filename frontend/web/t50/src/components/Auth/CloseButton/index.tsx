/** @jsxImportSource @emotion/react */

import styled from "@emotion/styled";
import CloseIcon from "@mui/icons-material/Close";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CloseButton: React.FC = () => {
  return (
    <Wrapper>
      <CloseIcon fontSize="small" />
    </Wrapper>
  );
};

export default CloseButton;
