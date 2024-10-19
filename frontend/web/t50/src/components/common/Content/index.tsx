/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";

interface IProps {
  top: string;
  right?: string;
  bottom: string;
  left?: string;
  width?: string;
  height?: string;
  backgroundColor?: string;
}

const Wrapper = styled.div`
  position: fixed;
  top: ${(props: IProps) => props.top};
  right: ${(props: IProps) => props.right};
  bottom: ${(props: IProps) => props.bottom};
  left: ${(props: IProps) => props.left};
  overflow: hidden;
  background-color: ${(props: IProps) => props.backgroundColor};
`;

const Content: React.FC<IProps> = ({
  children,
  top,
  right = "0",
  bottom,
  left = "0",
  width = "auto",
  height = "auto",
  backgroundColor = "transparent",
}) => {
  return (
    <Wrapper
      top={top}
      right={right}
      bottom={bottom}
      left={left}
      width={width}
      height={height}
      backgroundColor={backgroundColor}
    >
      {children}
    </Wrapper>
  );
};

export default Content;
