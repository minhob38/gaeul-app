/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import * as fonts from "@constants/fonts";
import * as colors from "@constants/colors";
import * as margins from "@constants/margins";
import * as size from "@constants/size";

interface IProps {
  label: string;
  onClick: React.MouseEventHandler<HTMLInputElement>;
}

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 40px;
  border-radius: ${size.BORDER_RADIUS_1};
  background-color: ${colors.BLACK_1};
  font: ${fonts.FONT_SMALL_400};
  color: ${colors.WHITE_1};
  cursor: pointer;
`;

const SignButton: React.FC<IProps> = ({ label, onClick }) => {
  return <Button onClick={onClick}>{label}</Button>;
};

export default SignButton;
