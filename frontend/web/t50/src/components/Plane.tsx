/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import kfx from "../assets/images/kfx.jpeg";

/*
emotion
https://emotion.sh/docs/introduction
*/
const CSS = css`
  font: normal normal 16px / 30px Noto Sans CJK KR;
`;
const Img = styled.img``;

const Plane: React.FC = () => {
  return (
    <>
      <div css={CSS}>Plane 🛩</div>
      <Img src={kfx} alt="kfx" width={150} />
    </>
  );
};

export default Plane;
