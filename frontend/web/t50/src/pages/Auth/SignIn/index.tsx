/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import * as fonts from "@constants/fonts";
import * as colors from "@constants/colors";
import * as margins from "@constants/margins";
import * as size from "@constants/size";
import { useTypedDispatch, useTypedSelector } from "@hooks/useStore";
import { actions as authActions } from "@store/slices/authSlice";
import { actions as errorActions } from "@store/slices/errorSlice";
import { useLoginMutation } from "@hooks/useApiMutation";
import Content from "@components/common/Content";
import { Link } from "react-router-dom";
import TextInput from "@components/Auth/TextInput";
import SignButton from "@components/Auth/SignButton";
import ErrorText from "@components/Auth/ErrorText";
import LoadingModal from "modals/SpinnerLoadingModal";
import { checkIsEmailFormat } from "@utils/common";
import { css } from "@emotion/react";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";

const WIDTH = "300px";
const HEIGHT = "40px";

const InputBox = styled.div`
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  margin: 0 auto 0 auto;
`;

const SignButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 0 auto;
`;

const SLink = styled(Link)`
  all: unset;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  /* padding: 0 0 0 ${margins.SIDE_MAIN_MARGIN}; */
  font: ${fonts.FONT_TINY_400};
  color: ${colors.GRAY_1};
  text-decoration: underline;
  cursor: pointer;
`;

const SignInBackground = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: ${colors.GRAY_1};
`;

const SignInBox = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
  padding: 40px;
  /* width: calc(2 * 40px + ${WIDTH}); */
  height: 500px;
  background-color: ${colors.WHITE_1};
  border: 1px solid ${colors.GRAY_3};
  border-radius: ${size.BORDER_RADIUS_1};
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

const SocialDescription = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px auto 20px auto;
  font: ${fonts.FONT_SMALL_400};
  color: ${colors.BLACK_1};
  text-align: center;
`;

const LinkTextContainer = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  margin: 10px auto 0 auto;
  width: ${WIDTH};
`;

const LinkText: React.FC<{ path: string; title: string }> = ({ path, title }) => {
  return <SLink to={path}>{title}</SLink>;
};

const SocialButton = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  width: ${WIDTH};
  height: ${HEIGHT};
  box-sizing: border-box;
  border: 1.5px solid ${colors.BLACK_1};
  border-radius: ${size.BORDER_RADIUS_1};
`;

const SignIn: React.FC = () => {
  const signUpPath = "/sign-up";

  const errorMessage = useTypedSelector(
    (state) => state.rootReducer.errorReducer.loginErrorMessage,
  );
  const email = useTypedSelector((state) => state.rootReducer.authReducer.email);
  const password = useTypedSelector((state) => state.rootReducer.authReducer.password);
  const isLoading = useTypedSelector((state) => state.rootReducer.modalReducer.isLoading);

  const dispatch = useTypedDispatch();
  const loginMutation = useLoginMutation();

  const handleTextInputChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(authActions.textInput(ev.target));
  };

  const handleLoginButtonClick = async () => {
    // 입력정보가 없으면 에러
    if (!email || !password) {
      dispatch(errorActions.throwLoginError("Enter email and password"));
      return;
    }

    // email 형식 체크
    const isEmailFormat = checkIsEmailFormat(email);
    if (!isEmailFormat) {
      dispatch(errorActions.throwLoginError("Invalid email format"));
      return;
    }

    await loginMutation.mutateAsync({ email, password });
  };

  const handleFocus = () => dispatch(errorActions.catchLoginError());

  return (
    <>
      {isLoading && <LoadingModal />}
      {/* <Header title="Welcome" mode="back"></Header> */}
      <Content top="0" bottom="0">
        <SignInBackground>
          <SignInBox>
            <Welcome>Welcome Todo Service</Welcome>
            <InputBox onFocus={handleFocus}>
              <TextInput
                placeholder="Email"
                type="email"
                name="email"
                onChange={handleTextInputChange}
                width={WIDTH}
                height={HEIGHT}
              />
            </InputBox>
            <div
              css={css`
                height: 10px;
              `}
            />
            <InputBox onFocus={handleFocus}>
              <TextInput
                placeholder="Password"
                type="password"
                name="password"
                onChange={handleTextInputChange}
                width={WIDTH}
                height={HEIGHT}
              />
            </InputBox>
            <ErrorText text={errorMessage} />
            <SignButtonContainer>
              <SignButton onClick={handleLoginButtonClick} label="로그인" />
            </SignButtonContainer>
            <LinkTextContainer>
              <LinkText path={""} title="비밀번호 찾기" />
            </LinkTextContainer>
            <SocialDescription>또는 다음을 사용하여 로그인하기</SocialDescription>
            <SocialButton>
              <GoogleIcon />
              <div
                css={css`
                  width: 10px;
                `}
              />
              Google
            </SocialButton>
            <div
              css={css`
                height: 10px;
              `}
            />
            <SocialButton>
              <GitHubIcon />
              <div
                css={css`
                  width: 10px;
                `}
              />
              Github
            </SocialButton>
            <LinkTextContainer>
              <LinkText path={""} title="회원가입" />
            </LinkTextContainer>
            {/* <LinkText path={signUpPath} title="create an account ?" /> */}
          </SignInBox>
        </SignInBackground>
      </Content>
    </>
  );
};

export default SignIn;
