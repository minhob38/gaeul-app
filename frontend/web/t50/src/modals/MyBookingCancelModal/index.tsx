/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import styled from "@emotion/styled";
import * as colors from "@constants/colors";
import * as fonts from "@constants/fonts";
import { useTypedDispatch, useTypedSelector } from "@hooks/useStore";
import { actions as modalActions } from "@store/slices/modalSlice";
import {
  useMyMoveBookingQuery,
  useMyPickupBookingQuery,
  useMyTelcomBookingQuery,
} from "@hooks/useApiQuery";
import { useQueryClient } from "react-query";
import { EQUERY_KEY } from "@constants/query-key";
import { ESERVICE_TYPE } from "types/enum";
import {
  useMoveCancelMutation,
  usePickupCancelMutation,
  useTelocmCancelMutation,
} from "@hooks/useApiMutation";

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

const YesNoButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 110px;
  height: 46px;
  border-radius: 4px;
  background-color: ${colors.PRIMARY_1};
  font: ${fonts.FONT_MEDIUM_400};
  color: ${colors.WHITE_1};
`;

const Button = styled(YesNoButton)`
  width: 240px;
  margin: 0 auto;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 240px;
`;

const MyBookingCancelModal: React.FC = () => {
  const [isYesClicked, setIsYesClicked] = useState<boolean>(false);
  const dispatch = useTypedDispatch();
  const service = useTypedSelector(
    (state) => state.rootReducer.modalReducer.myBookingCancelCurrentService,
  );
  const userId = useTypedSelector((state) => state.rootReducer.userReducer.userId);

  const pickUpMutation = usePickupCancelMutation();
  const telcomMutation = useTelocmCancelMutation();
  const moveMutation = useMoveCancelMutation();

  const queryClient = useQueryClient();
  const myPickupBookingQuery = useMyPickupBookingQuery();
  const myTelcomBookingQuery = useMyTelcomBookingQuery();
  const myMoveBookingQuery = useMyMoveBookingQuery();

  const pickUpId = myPickupBookingQuery.data?.pickUpId || null;
  const telcomId = myTelcomBookingQuery.data?.telecommunicationId || null;
  const moveId = myMoveBookingQuery.data?.moveId || null;

  const handleClickModal: React.MouseEventHandler<HTMLDivElement> = (ev) => {
    if (ev.currentTarget !== ev.target) return;
    dispatch(modalActions.hideMyBookingCancelNotification());
  };

  const handleYesClickButton: React.MouseEventHandler<HTMLDivElement> = async (ev) => {
    switch (service) {
      case ESERVICE_TYPE.PICKUP:
        if (!pickUpId) throw new Error("pickUpId does not exists");
        await pickUpMutation.mutateAsync({ pickUpId });
        queryClient.invalidateQueries([EQUERY_KEY.PICKUP, userId]);
        break;
      case ESERVICE_TYPE.TELCOM:
        if (!telcomId) throw new Error("telcomId does not exists");
        await telcomMutation.mutateAsync({ telcomId });
        queryClient.invalidateQueries([EQUERY_KEY.TELCOM, userId]);
        break;
      case ESERVICE_TYPE.MOVE:
        if (!moveId) throw new Error("moveId does not exists");
        await moveMutation.mutateAsync({ moveId });
        queryClient.invalidateQueries([EQUERY_KEY.MOVE, userId]);
        break;
      default:
    }

    setIsYesClicked(true);
  };

  const handleNoClickButton: React.MouseEventHandler<HTMLDivElement> = (ev) => {
    dispatch(modalActions.hideMyBookingCancelNotification());
  };
  const handleCloseClick: React.MouseEventHandler<HTMLDivElement> = (ev) => {
    dispatch(modalActions.hideMyBookingCancelNotification());
  };

  return (
    <Modal onClick={handleClickModal}>
      {isYesClicked ? (
        <Box>
          Cancel success
          <Button onClick={handleCloseClick}>Close</Button>
        </Box>
      ) : (
        <Box>
          Are you sure you want to cancel?
          <ButtonContainer>
            <YesNoButton onClick={handleYesClickButton}>Yes</YesNoButton>
            <YesNoButton onClick={handleNoClickButton}>No</YesNoButton>
          </ButtonContainer>
        </Box>
      )}
    </Modal>
  );
};

export default MyBookingCancelModal;
