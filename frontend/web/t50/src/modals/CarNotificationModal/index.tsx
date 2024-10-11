/** @jsxImportSource @emotion/react */
import React from "react";
import styled from "@emotion/styled";
import * as colors from "@constants/colors";
import * as fonts from "@constants/fonts";
import { useTypedDispatch } from "@hooks/useStore";
import { actions as modalActions } from "@store/slices/modalSlice";
import { useNavigate } from "react-router-dom";

interface IProps {
  notification: string;
  buttonText: string;
  path: string;
}

const Modal = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
`;

const Box = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  align-items: center;
  width: calc(100% - 35px - 35px);
  height: 150px;
  margin: 0 auto;
  padding: 25px 0 25px 0;
  border-radius: 4px;
  background-color: ${colors.WHITE_1};
  font: ${fonts.FONT_MEDIUM_400};
  color: ${colors.BLACK_1};
`;

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 240px;
  height: 46px;
  margin: 0 auto;
  border-radius: 4px;
  background-color: ${colors.PRIMARY_1};
  font: ${fonts.FONT_MEDIUM_400};
  color: ${colors.WHITE_1};
`;

const CarNotificationModal: React.FC<IProps> = ({ notification, buttonText, path }) => {
  const navigate = useNavigate();
  const dispatch = useTypedDispatch();
  const handleClickModal: React.MouseEventHandler<HTMLDivElement> = (ev) => {
    // if (ev.currentTarget !== ev.target) return;
    // dispatch(modalActions.hideSignUpNotification());
  };
  const handleClickButton: React.MouseEventHandler<HTMLDivElement> = (ev) => {
    dispatch(modalActions.hideCarNotification());
    navigate(path);
  };

  return (
    <Modal onClick={handleClickModal}>
      <Box>
        {notification}
        <Button onClick={handleClickButton}>{buttonText}</Button>
      </Box>
    </Modal>
  );
};

export default CarNotificationModal;
