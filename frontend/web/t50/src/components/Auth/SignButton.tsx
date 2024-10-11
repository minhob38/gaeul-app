/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import * as fonts from "@constants/fonts";
import * as colors from "@constants/colors";
import * as margins from "@constants/margins";

interface IProps {
  label: string;
  onClick: React.MouseEventHandler<HTMLInputElement>;
}

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${`calc(100% - ${margins.SIDE_MAIN_MARGIN} - ${margins.SIDE_MAIN_MARGIN})`};
  height: 50px;
  border-radius: 8px;
  background-color: ${colors.PRIMARY_1};
  font: ${fonts.FONT_LARGE_400};
  color: ${colors.WHITE_1};
`;

const SignButton: React.FC<IProps> = ({ label, onClick }) => {
  return <Button onClick={onClick}>{label}</Button>;
};

export default SignButton;
