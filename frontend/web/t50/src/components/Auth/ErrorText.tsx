/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import * as fonts from "@constants/fonts";
import * as colors from "@constants/colors";
import * as margins from "@constants/margins";

interface IProps {
  text: string | null;
}

const Text = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  width: ${`calc(100% - ${margins.SIDE_MAIN_MARGIN} - ${margins.SIDE_MAIN_MARGIN})`};
  margin: 0 auto;
  font: ${fonts.FONT_SMALL_400};
  color: ${colors.ERROR_RED};
  text-align: center;
`;

const ErrorText: React.FC<IProps> = ({ text }) => {
  return <Text>{text}</Text>;
};

export default ErrorText;
