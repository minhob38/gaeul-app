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
import { useLogoutMutation } from "@hooks/useApiMutation";

const ProfileBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column nowrap;
`;

const ProfileName = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column nowrap;
  font: ${fonts.FONT_SMALL_400};
  color: ${colors.BLACK_1};
`;

const Wrapper = styled.div``;

const ProfileDropBox = styled.div`
  position: absolute;
  top: ${size.HEADER_HEIGHT};
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column nowrap;
  width: 150px;
  background-color: ${colors.WHITE_1};
`;

const ProfileDropBoxItemContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
`;

const Logout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font: ${fonts.FONT_SMALL_400};
  color: ${colors.BLACK_1};
`;

const SLink = styled(Link)`
  all: unset;
  display: flex;
  justify-content: center;
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
  const userName = useTypedSelector((state) => state.rootReducer.userReducer.name);
  const logoutMutation = useLogoutMutation();
  const handleProfileClick = () => setIsProfileClicked(!isProfileClicked);
  const handleLogoutClick = () => {
    logoutMutation.mutate();
  };

  return (
    <Wrapper>
      <ProfileBox onClick={handleProfileClick}>
        <FontAwesomeIcon icon={faUser} fontSize={"24px"} />
        <ProfileName>{userName}</ProfileName>
      </ProfileBox>
      {isProfileClicked && (
        <ProfileDropBox>
          <ProfileDropBoxItemContainer>
            <LinkButton path="my-page" title="My Page" />
          </ProfileDropBoxItemContainer>
          <ProfileDropBoxItemContainer>
            <LinkButton path="my-booking" title="My Booking" />
          </ProfileDropBoxItemContainer>
          <ProfileDropBoxItemContainer>
            <LinkButton path="my-car" title="My Car" />
          </ProfileDropBoxItemContainer>
          <ProfileDropBoxItemContainer>
            <Logout onClick={handleLogoutClick}>Logout</Logout>
          </ProfileDropBoxItemContainer>
        </ProfileDropBox>
      )}
    </Wrapper>
  );
};

export default Profile;
