/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import * as fonts from "@constants/fonts";
import * as colors from "@constants/colors";
import * as margins from "@constants/margins";
import * as size from "@constants/size";
import { useTypedDispatch, useTypedSelector } from "@hooks/useStore";
import { actions as authActions } from "@store/slices/authSlice";
import { actions as errorActions } from "@store/slices/errorSlice";
import { actions as userActions } from "@store/slices/userSlice";
import { useUpdateMeMutation } from "@hooks/useApiMutation";
import Header from "@components/common/Header";
import Content from "@components/common/Content";
import TextInput from "@components/Auth/TextInput";
import SignButton from "@components/Auth/Button";
import ErrorText from "@components/Auth/ErrorText";
import { useEffect, useState } from "react";
import UpdateMeNotificationModal from "modals/UpdateMeNotificationModal";
import * as api from "@apis/functions";

const SubTitle = styled.div`
  font: ${fonts.FONT_MEDIUM_600};
  color: ${colors.BLACK_1};
  margin: 0 0 5px 0;
`;

const InputBox = styled.div`
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: flex-start;
  width: calc(100% - 2 * ${margins.SIDE_MAIN_MARGIN});
  margin: 0 auto 20px auto;
`;

const Margin = styled.div`
  height: ${margins.TOP_MARGIN};
`;

const SignButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 15px auto 15px auto;
`;

const MyPage: React.FC = () => {
  const [isEdit, setIsEdit] = useState(false);
  const errorMessage = useTypedSelector(
    (state) => state.rootReducer.errorReducer.updateMeErrorMessage,
  );
  const userId = useTypedSelector((state) => state.rootReducer.userReducer.userId);
  const defaultEmail = useTypedSelector((state) => state.rootReducer.userReducer.email || "");
  const email = useTypedSelector((state) => state.rootReducer.authReducer.email);
  const defaultName = useTypedSelector((state) => state.rootReducer.userReducer.name || "");
  const name = useTypedSelector((state) => state.rootReducer.authReducer.name);
  const defaultPhoneNumber = useTypedSelector(
    (state) => state.rootReducer.userReducer.phoneNumber || "",
  );
  const phoneNumber = useTypedSelector((state) => state.rootReducer.authReducer.phoneNumber);

  const isUpdateMeNotification = useTypedSelector(
    (state) => state.rootReducer.modalReducer.isUpdateMeNotification,
  );

  const dispatch = useTypedDispatch();
  const mutation = useUpdateMeMutation();

  useEffect(() => {
    dispatch(
      authActions.clickEdit({
        name: defaultName,
        email: defaultEmail,
        phoneNumber: defaultPhoneNumber,
      }),
    );
  }, [dispatch, defaultEmail, defaultName, defaultPhoneNumber]);

  const handleTextInputChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(authActions.textInput(ev.target));
  };

  const handleButtonClick = async () => {
    if (isEdit) {
      if (!userId || !name || !phoneNumber) {
        dispatch(errorActions.throwUpdateMeError("user id, name and phone number are required"));
        return;
      }

      await mutation.mutateAsync({ userId, name, phoneNumber });

      const myInfo = await api.findMeApi(userId);

      if (!myInfo) return;
      dispatch(userActions.findMe({ userId, ...myInfo }));

      return;
    }

    setIsEdit(!isEdit);
  };

  const handleFocus = () => dispatch(errorActions.catchUpdateMeError());

  return (
    <>
      {isUpdateMeNotification && (
        <UpdateMeNotificationModal
          notification="Request success"
          buttonText="Go to home"
          path="/"
        />
      )}
      <Header title="My page" mode="back"></Header>
      <Content top={size.HEADER_HEIGHT} bottom="0">
        <Margin />
        {/* <InputBox onFocus={handleFocus}>
          <SubTitle>Email</SubTitle>
          <TextInput
            value={email || ""}
            placeholder={defaultEmail}
            type="email"
            name="email"
            onChange={handleTextInputChange}
            disabled={true}
          />
        </InputBox>
        <InputBox onFocus={handleFocus}>
          <SubTitle>Name</SubTitle>
          <TextInput
            value={name || ""}
            placeholder={defaultName}
            type="text"
            name="name"
            onChange={handleTextInputChange}
            disabled={isEdit ? false : true}
          />
        </InputBox>
        <InputBox onFocus={handleFocus}>
          <SubTitle>Mobile</SubTitle>
          <TextInput
            value={phoneNumber || ""}
            placeholder={defaultPhoneNumber}
            type="text"
            name="phoneNumber"
            onChange={handleTextInputChange}
            disabled={isEdit ? false : true}
          />
        </InputBox> */}
        <ErrorText text={errorMessage} />
        <SignButtonContainer>
          <SignButton onClick={handleButtonClick} label={isEdit ? "Save" : "Edit"} />
        </SignButtonContainer>
      </Content>
    </>
  );
};

export default MyPage;
