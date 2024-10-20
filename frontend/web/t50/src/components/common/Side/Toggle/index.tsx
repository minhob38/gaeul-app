/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import * as colors from "@constants/colors";
import { useTypedDispatch } from "@hooks/useStore";
import { actions as settingActions } from "@store/slices/viewSlice";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

interface IProps {
  mode: "show" | "hide";
}

const Wrapper = styled.div`
  position: absolute;
  top: 30px;
  right: -8px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  border: 2px solid ${colors.BLACK_1};
  border-radius: 50%;
  background-color: ${colors.GRAY_3};
`;

const Toggle: React.FC<IProps> = ({ mode }) => {
  const dispatch = useTypedDispatch();

  const handleHideButtonClick = () => {
    dispatch(settingActions.hideSide());
  };

  const handleShowButtonClick = () => {
    dispatch(settingActions.showSide());
  };

  switch (mode) {
    case "hide":
      return (
        <Wrapper onClick={handleHideButtonClick}>
          <KeyboardArrowLeftIcon fontSize="medium" />
        </Wrapper>
      );

    case "show":
      return (
        <Wrapper onClick={handleShowButtonClick}>
          <KeyboardArrowRightIcon fontSize="medium" />
        </Wrapper>
      );

    default:
      return (
        <Wrapper onClick={handleShowButtonClick}>
          <KeyboardArrowRightIcon fontSize="medium" />
        </Wrapper>
      );
  }
};

export default Toggle;
