/** @jsxImportSource @emotion/react */
import Header from "@components/common/Header";
import Content from "@components/common/Content";
import styled from "@emotion/styled";
import * as fonts from "@constants/fonts";
import * as colors from "@constants/colors";
import * as margins from "@constants/margins";
import * as size from "@constants/size";
import { useTypedDispatch, useTypedSelector } from "@hooks/useStore";
import { actions as authActions } from "@store/slices/authSlice";
import { actions as errorActions } from "@store/slices/errorSlice";
import { useSignUpMutation } from "@hooks/useApiMutation";
import TextInput from "@components/Auth/TextInput";
import SignButton from "@components/Auth/SignButton";
import ErrorText from "@components/Auth/ErrorText";
import SignUpNotificationModal from "modals/SignUpNotificationModal";
import { checkIsEmailFormat } from "@utils/common";

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

const SignUp = () => {
  const dispatch = useTypedDispatch();
  const isSignUpNotification = useTypedSelector(
    (state) => state.rootReducer.modalReducer.isSignUpNotification,
  );
  const errorMessage = useTypedSelector(
    (state) => state.rootReducer.errorReducer.signUpErrorMessage,
  );
  const email = useTypedSelector((state) => state.rootReducer.authReducer.email);
  const password = useTypedSelector((state) => state.rootReducer.authReducer.password);
  const rePassword = useTypedSelector((state) => state.rootReducer.authReducer.rePassword);
  const name = useTypedSelector((state) => state.rootReducer.authReducer.name);

  const signUpMutation = useSignUpMutation();

  const handleTextInputChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(authActions.textInput(ev.target));
  };

  const handleSignUpButtonClick = () => {
    // 입력정보가 없으면 에러
    if (!email || !password || !name || !rePassword) {
      dispatch(errorActions.throwSignUpError("Enter name, email and password"));
      return;
    }

    // email 형식 체크
    const isEmailFormat = checkIsEmailFormat(email);
    if (!isEmailFormat) {
      dispatch(errorActions.throwSignUpError("Invalid email format"));
      return;
    }

    // 비밀번호/재확인 비밀번호가 같은 에러
    if (password !== rePassword) {
      dispatch(errorActions.throwSignUpError("Password and re-password should be same"));
      return;
    }

    // 비밀번호 길이 에러
    if (password.length < 8 || password.length > 20) {
      dispatch(errorActions.throwSignUpError("Password should be between 8 and 20 characters"));
      return;
    }

    // TODO: 비밀번호 정규식
    signUpMutation.mutate({ fullName: name, email, password, rePassword });
  };

  const handleFocus = () => dispatch(errorActions.catchSignUpError());

  return (
    <>
      {isSignUpNotification && <SignUpNotificationModal />}
      <Header title="Welcome" mode="back"></Header>
      <Content top={size.HEADER_HEIGHT} bottom="0">
        <Margin />
        <InputBox onFocus={handleFocus}>
          <SubTitle>First and last name</SubTitle>
          <TextInput
            placeholder="John Doe"
            type="text"
            name="name"
            onChange={handleTextInputChange}
          />
        </InputBox>
        <InputBox onFocus={handleFocus}>
          <SubTitle>Email</SubTitle>
          <TextInput
            placeholder="email"
            type="email"
            name="email"
            onChange={handleTextInputChange}
          />
        </InputBox>
        <InputBox onFocus={handleFocus}>
          <SubTitle>Password</SubTitle>
          <TextInput
            placeholder="password"
            type="password"
            name="password"
            onChange={handleTextInputChange}
          />
        </InputBox>
        <InputBox onFocus={handleFocus}>
          {/* <SubTitle>Confirm Password</SubTitle> */}
          <TextInput
            placeholder="confirm password"
            type="password"
            name="re-password"
            onChange={handleTextInputChange}
          />
        </InputBox>
        <ErrorText text={errorMessage} />
        <SignButtonContainer>
          <SignButton label="Sign up" onClick={handleSignUpButtonClick} />
        </SignButtonContainer>
      </Content>
    </>
  );
};

export default SignUp;
