/** @jsxImportSource @emotion/react */
import React from "react";
import styled from "@emotion/styled";
import * as colors from "@constants/colors";
import Spinner from "@animations/Spinner";

const Modal = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
`;

const Loading: React.FC = () => {
  return (
    <Modal>
      <Spinner
        diameter={35}
        lineWidth={5}
        backgroundColor={"rgba(0, 0, 0, 0.3)"}
        lineColor={colors.BLACK_1}
        speed={3}
      />
    </Modal>
  );
};

export default Loading;
