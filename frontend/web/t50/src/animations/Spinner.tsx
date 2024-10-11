/** @jsxImportSource @emotion/react */
import React from 'react';
import styled from '@emotion/styled';
import { keyframes, css } from '@emotion/react';

interface IProps {
  lineWidth: number;
  diameter: number;
  backgroundColor: string;
  lineColor: string;
  speed: number;
}

const SpinAnime = keyframes`
  from {transform: rotate(0deg);}
  to {transform: rotate(360deg);}
`;

const Wrapper = styled.div`
  width: ${(props: IProps) => `${props.diameter}px`};
  height: ${(props: IProps) => `${props.diameter}px`};
  border: ${(props: IProps) => {
    return `${props.lineWidth}px solid ${props.backgroundColor}`;
  }};
  border-top: ${(props: IProps) => {
    return `${props.lineWidth}px solid ${props.lineColor}`;
  }};
  border-radius: 50%;
  animation: ${(props: IProps) => {
    return css`${SpinAnime} ${props.speed}s infinite linear normal}`;
  }};
`;

const Spinner: React.FC<IProps> = ({
  lineWidth,
  diameter,
  backgroundColor,
  lineColor,
  speed,
}) => {
  return (
    <Wrapper
      diameter={diameter}
      lineWidth={lineWidth}
      backgroundColor={backgroundColor}
      lineColor={lineColor}
      speed={speed}
    />
  );
};

export default Spinner;
