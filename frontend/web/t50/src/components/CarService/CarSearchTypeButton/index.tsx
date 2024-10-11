/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import * as colors from "@constants/colors";
import * as fonts from "@constants/fonts";

interface IProps extends IStyleProps {
  title: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

interface IStyleProps {
  width: string;
  height: string;
  clicked: boolean;
}

const Wrapper = styled.button`
  all: unset;
  display: block;
  box-sizing: border-box;
  background-color: ${(props: IStyleProps) => (props.clicked ? `${colors.PRIMARY_2}` : `none`)};
  width: ${(props: IStyleProps) => props.width};
  height: ${(props: IStyleProps) => props.height};
  border: ${(props: IStyleProps) => (props.clicked ? `none` : `2px solid ${colors.PRIMARY_2}`)};
  border-radius: 8px;
  font: ${fonts.FONT_LARGE_600};
  color: ${colors.BLACK_1};
  text-align: center;
  /* &:hover {
    background-color: #ebc7c7;
    border: none;
  } */
  cursor: pointer;
`;

const CarSearchTypeButton: React.FC<IProps> = ({ title, width, height, clicked, onClick }) => {
  return (
    <Wrapper width={width} height={height} clicked={clicked} onClick={onClick}>
      {title}
    </Wrapper>
  );
};

export default CarSearchTypeButton;
