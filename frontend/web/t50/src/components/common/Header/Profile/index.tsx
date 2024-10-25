/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import * as size from "@constants/size";
import * as colors from "@constants/colors";
import * as fonts from "@constants/fonts";
import { useTypedDispatch, useTypedSelector } from "@hooks/useStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { actions as userActions } from "@store/slices/userSlice";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import { useLogoutMutation } from "@hooks/useApiMutation";

const PADDING = "10px";

const ProfileBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: row nowrap;
  height: ${size.HEADER_HEIGHT};
  font: ${fonts.FONT_SMALL_400};
  &:hover {
    font: ${fonts.FONT_SMALL_600};
  }
`;

const ProfileEmail = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column nowrap;
  margin: 0 0 0 5px;
  /* font: ${fonts.FONT_SMALL_400}; */
  color: ${colors.BLACK_1};
`;

const Wrapper = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  justify-content: start;
  padding: 0 0 0 ${PADDING};
  width: 200px;
`;

const ProfileDropBox = styled.div`
  position: absolute;
  right: 0;
  top: calc(10px + ${size.HEADER_HEIGHT});
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column nowrap;
  width: 100%;
  /* padding: 0 0 0 ${PADDING}; */
  background-color: ${colors.WHITE_1};
  border: 2px solid ${colors.GRAY_3};
`;

const ProfileDropBoxItemContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 0 0 ${PADDING};
  width: 100%;
  height: 40px;
  &:hover {
    text-decoration: underline;
  }
  cursor: pointer;
`;

// TODO: logout도 link로 바꾸기
const Logout = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100%;
  height: 100%;
  font: ${fonts.FONT_SMALL_400};
  color: ${colors.BLACK_1};
`;

const SLink = styled(Link)`
  all: unset;
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100%;
  height: 100%;
  font: ${fonts.FONT_SMALL_400};
  color: ${colors.BLACK_1};
`;

const LinkButton: React.FC<{ path: string; title: string }> = ({ path, title }) => {
  return <SLink to={path}>{title}</SLink>;
};

const Profile: React.FC = () => {
  const [isProfileClicked, setIsProfileClicked] = useState<boolean>(false);
  const userName = useTypedSelector((state) => state.rootReducer.userReducer.email);
  // const logoutMutation = useLogoutMutation();
  const handleProfileClick = () => setIsProfileClicked(!isProfileClicked);
  const handleLogoutClick = () => {
    // logoutMutation.mutate();
  };

  return (
    <Wrapper>
      <ProfileBox onClick={handleProfileClick}>
        <AccountCircleIcon fontSize="large" />
        <ProfileEmail>{userName}</ProfileEmail>
      </ProfileBox>
      {isProfileClicked && (
        <ProfileDropBox>
          <ProfileDropBoxItemContainer onClick={() => console.log("Clicked!")}>
            <LinkButton path="my-page" title="개인정보 설정" />
          </ProfileDropBoxItemContainer>
          <ProfileDropBoxItemContainer>
            <Logout onClick={handleLogoutClick}>로그아웃</Logout>
          </ProfileDropBoxItemContainer>
        </ProfileDropBox>
      )}
    </Wrapper>
  );
};

export default Profile;
