/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import * as fonts from "@constants/fonts";
import * as colors from "@constants/colors";
import { actions as modalActions } from "@store/slices/modalSlice";
import { ESERVICE_TYPE } from "types/enum";
import { useTypedDispatch } from "@hooks/useStore";

interface IProps {
  service: ESERVICE_TYPE;
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 30px;
  border-radius: 8px;
  border: 2px solid ${colors.ERROR_RED};
  font: ${fonts.FONT_MEDIUM_600};
  color: ${colors.ERROR_RED};
`;

const CancelButton: React.FC<IProps> = ({ service }) => {
  const dispatch = useTypedDispatch();

  const handleClick = async () => {
    dispatch(modalActions.showMyBookingCancelNotification(service));
  };

  return <Wrapper onClick={handleClick}>Cancel</Wrapper>;
};

export default CancelButton;
