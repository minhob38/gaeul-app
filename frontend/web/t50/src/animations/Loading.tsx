/** @jsxImportSource @emotion/react */
import React from "react";
import styled from "@emotion/styled";
import { keyframes, css } from "@emotion/react";
// import Spinner from "@animations/Spinner";
import * as colors from "@constants/colors";
import * as fonts from "@constants/fonts";
import Spinner from "./Spinner";

interface IProps {
  text: string;
}

const TextAnime = keyframes`
  from {color: ${colors.BLACK_1};}
  to {color: ${colors.BACKGROUND};}
`;

const Wrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const Text = styled.div`
  margin: 30px 0 0 0;
  animation: ${TextAnime} 3s infinite linear alternate;
  font: ${fonts.FONT_LARGE_400};
`;

const Loading: React.FC<IProps> = ({ text }) => {
  return (
    <Wrapper>
      <Spinner
        diameter={35}
        lineWidth={5}
        backgroundColor={"rgba(0, 0, 0, 0.3)"}
        lineColor={colors.BLACK_1}
        speed={3}
      />
      <Text>{text}</Text>
    </Wrapper>
  );
};

export default Loading;
