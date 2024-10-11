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
import Header from "@components/common/Header";
import Content from "@components/common/Content";
import { Link } from "react-router-dom";
import TextInput from "@components/Auth/TextInput";
import SignButton from "@components/Auth/SignButton";
import ErrorText from "@components/Auth/ErrorText";
import LoadingModal from "modals/SpinnerLoadingModal";
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

const SLink = styled(Link)`
  all: unset;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 0 0 ${margins.SIDE_MAIN_MARGIN};
  font: ${fonts.FONT_MEDIUM_600};
  color: ${colors.BLACK_1};
  text-decoration: underline;
`;

const LinkButton: React.FC<{ path: string; title: string }> = ({ path, title }) => {
  return <SLink to={path}>{title}</SLink>;
};

const Login: React.FC = () => {
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
      <Header title="Welcome" mode="back"></Header>
      <Content top={size.HEADER_HEIGHT} bottom="0">
        <Margin />
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
        <ErrorText text={errorMessage} />
        <SignButtonContainer>
          <SignButton onClick={handleLoginButtonClick} label="Login" />
        </SignButtonContainer>
        <LinkButton path={signUpPath} title="create an account ?" />
      </Content>
    </>
  );
};

export default Login;
