/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import * as size from "@constants/size";
import * as colors from "@constants/colors";
import * as fonts from "@constants/fonts";
import * as margins from "@constants/margins";
import { Link } from "react-router-dom";
import Image from "@components/common/Image";
import leftArrowImage from "@assets/images/left-arrow-24x24.svg";
import { useTypedDispatch, useTypedSelector } from "@hooks/useStore";
import { actions as userActions } from "@store/slices/userSlice";
import Profile from "./Profile";
import { HOME_PATH, SIGNIN_PATH } from "@constants/route-path";

interface IProps {
  title: string;
  // logo 없애기
  mode: "service" | "logo" | "back" | "close";
  path?: string;
  // login
}

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  display: flex;
  flex-flow: row nowrap;
  /* justify-content: space-between;
  align-items: center; */
  width: 100%;
  height: ${size.HEADER_HEIGHT};
  padding: 0 ${margins.SIDE_MAIN_MARGIN} 0 ${margins.SIDE_MAIN_MARGIN};
  /* box-shadow: ${colors.SHADOW}; */
  background-color: ${colors.WHITE_1};
  border-bottom: 2px solid ${colors.GRAY_3};
  z-index: 1;
`;

const LogoTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font: ${fonts.FONT_HEADER_400};
  color: ${colors.BLACK_1};
`;

const BackTitle = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  font: ${fonts.FONT_BIG_600};
  color: ${colors.PRIMARY_1};
`;

const LinkButton: React.FC<{ path: string; title: string }> = ({ path, title }) => {
  const SLink = styled(Link)`
    all: unset;
    display: flex;
  `;

  const Wrapper = styled.div`
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(-${margins.SIDE_MAIN_MARGIN}, -50%);
    justify-content: center;
    align-items: center;
    font: ${fonts.FONT_SMALL_400};
    color: ${colors.BLACK_1};
  `;

  return (
    <Wrapper>
      <SLink to={path}>{title}</SLink>
    </Wrapper>
  );
};

const Logout = styled.div`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translate(-${margins.SIDE_MAIN_MARGIN}, -50%);
  justify-content: center;
  align-items: center;
  font: ${fonts.FONT_SMALL_400};
  color: ${colors.BLACK_1};
`;

const Header: React.FC<IProps> = ({ title, mode, path }) => {
  const dispatch = useTypedDispatch();

  const isAuthenticated = useTypedSelector(
    (state) => state.rootReducer.userReducer.isAuthenticated,
  );

  const handleSignOutClick = () => {
    dispatch(userActions.unAuthenticate());
  };

  // logo 없애기
  switch (mode) {
    case "service":
    case "logo":
      return (
        <Wrapper>
          <LogoTitle>{title}</LogoTitle>
          <Profile />
          {/* {!isAuthenticated ? <LinkButton path={SIGNIN_PATH} title="로그인" /> : <Profile />} */}
        </Wrapper>
      );
    case "back":
      return (
        <Wrapper>
          <Link to={path || HOME_PATH}>
            <Image src={leftArrowImage} alt="back" height="24px" />
          </Link>
          <BackTitle>{title}</BackTitle>
        </Wrapper>
      );
    default:
      return (
        <Wrapper>
          <LogoTitle>{title}</LogoTitle>
          {!isAuthenticated ? <LinkButton path={SIGNIN_PATH} title="로그인" /> : <Profile />}
        </Wrapper>
      );
  }
};

export default Header;
