/** @jsxImportSource @emotion/react */

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
import ClickButton from "@components/Auth/ClickButton";
import ErrorText from "@components/Auth/ErrorText";
import { checkIsEmailFormat } from "@utils/common";
import SignUpBackground from "@components/Auth/Background";
import SignUpBox from "@components/Auth/Box";
import { css } from "@emotion/react";
import CloseButton from "@components/Auth/CloseButton";
import { useNavigate } from "react-router-dom";

const WIDTH = "300px";
const HEIGHT = "40px";
const GAP = "10px";

const InputBox = styled.div`
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  margin: 0 auto 0 auto;
`;

const SignUpButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 0 auto;
`;

const Welcome = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 20px auto;
  font: ${fonts.FONT_LARGE_400};
  color: ${colors.BLACK_1};
  text-align: center;
`;

const CloseContainer = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
`;

const SignUpSuccess = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font: ${fonts.FONT_MEDIUM_400};
  color: ${colors.BLACK_1};
  text-align: center;
  width: ${WIDTH};
`;

const GoSignInButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 0 auto;
`;

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useTypedDispatch();
  const isSignUpNotification = useTypedSelector(
    (state) => state.rootReducer.authReducer.isSignUpNotification,
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
    signUpMutation.mutate({ name, email, password });
  };

  const handleCloseButtonClick = () => {
    dispatch(authActions.hideSignUpNotification());
    navigate("/");
  };
  const handleGoSignInButtonClick = () => {
    dispatch(authActions.hideSignUpNotification());
    navigate("/signin");
  };

  const handleFocus = () => dispatch(errorActions.catchSignUpError());

  return (
    <>
      <Content top="0" bottom="0">
        <SignUpBackground>
          <SignUpBox>
            {/* {!isSignUpNotification && <SignUpNotificationModal />} */}
            <CloseContainer onClick={handleCloseButtonClick}>
              <CloseButton />
            </CloseContainer>
            {isSignUpNotification ? (
              <>
                <Welcome>Todo 서비스</Welcome>
                <InputBox onFocus={handleFocus}>
                  <TextInput
                    placeholder="이름"
                    type="text"
                    name="name"
                    onChange={handleTextInputChange}
                    width={WIDTH}
                    height={HEIGHT}
                  />
                </InputBox>
                <div
                  css={css`
                    height: ${GAP};
                  `}
                />
                <InputBox onFocus={handleFocus}>
                  <TextInput
                    placeholder="이메일"
                    type="email"
                    name="email"
                    onChange={handleTextInputChange}
                    width={WIDTH}
                    height={HEIGHT}
                  />
                </InputBox>
                <div
                  css={css`
                    height: ${GAP};
                  `}
                />
                <InputBox onFocus={handleFocus}>
                  <TextInput
                    placeholder="비밀번호(8자 이상)"
                    type="password"
                    name="password"
                    onChange={handleTextInputChange}
                    width={WIDTH}
                    height={HEIGHT}
                  />
                </InputBox>
                <div
                  css={css`
                    height: ${GAP};
                  `}
                />
                <InputBox onFocus={handleFocus}>
                  <TextInput
                    placeholder="비밀번호 확인"
                    type="password"
                    name="re-password"
                    onChange={handleTextInputChange}
                    width={WIDTH}
                    height={HEIGHT}
                  />
                </InputBox>
                <ErrorText text={errorMessage} />
                <SignUpButtonContainer>
                  <ClickButton
                    label="회원가입"
                    onClick={handleSignUpButtonClick}
                    width={WIDTH}
                    height={HEIGHT}
                  />
                </SignUpButtonContainer>
              </>
            ) : (
              <>
                <SignUpSuccess>회원가입이 되었습니다.</SignUpSuccess>
                <div
                  css={css`
                    height: 50px;
                  `}
                />
                <GoSignInButtonContainer>
                  <ClickButton
                    label="로그인 하러가기"
                    onClick={handleGoSignInButtonClick}
                    width={WIDTH}
                    height={HEIGHT}
                  />
                </GoSignInButtonContainer>
              </>
            )}
          </SignUpBox>
        </SignUpBackground>
      </Content>
    </>
  );
};

export default SignUp;
