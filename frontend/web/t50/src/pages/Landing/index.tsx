/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import Header from "@components/common/Header";
import Content from "@components/common/Content";
import * as size from "@constants/size";
import * as margins from "@constants/margins";
import ServiceBanner from "@components/Landing/ServiceBanner";
import { ESERVICE_TYPE } from "types/enum";
import { useTypedDispatch, useTypedSelector } from "@hooks/useStore";
import LoginWarningModal from "modals/LoginWarningModal";
import { useEffect } from "react";
import { actions as errorActions } from "@store/slices/errorSlice";
import { actions as modalActions } from "@store/slices/modalSlice";
import { actions as authActions } from "@store/slices/authSlice";
import { actions as navigationActions } from "@store/slices/navigationSlice";
import { actions as viewActions } from "@store/slices/viewSlice";
import Button from "@material-ui/core/Button";

const ServiceContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 200px;
  width: ${`calc(100% - ${margins.SIDE_MAIN_MARGIN} - ${margins.SIDE_MAIN_MARGIN})`};
  margin: 0 auto;
`;

const Margin = styled.div`
  height: ${margins.TOP_MARGIN};
`;

const Landing: React.FC = () => {
  const isAuthenticated = useTypedSelector(
    (state) => state.rootReducer.userReducer.isAuthenticated,
  );
  const isLoginWarning = useTypedSelector((state) => state.rootReducer.modalReducer.isLoginWarning);
  const dispatch = useTypedDispatch();
  const handleBannerClick = () => {
    if (isAuthenticated) return;
    dispatch(modalActions.showLoginWarning());
  };

  //초기화 코드
  useEffect(() => {
    // dispatch(userActions.initialize());
    dispatch(authActions.initialize());
    dispatch(viewActions.initialize());
    dispatch(navigationActions.initialize());
    dispatch(modalActions.initialize());
    dispatch(errorActions.initialize());
  }, []);

  return (
    <>
      {isLoginWarning && <LoginWarningModal />}
      <Header title="One Pick" mode="logo"></Header>
      <Content top={size.HEADER_HEIGHT} bottom="0">
        <Button variant="contained" color="primary">
          {"Click"}
        </Button>
        {/* <Margin />
        <ServiceContainer>
          <ServiceBanner type={ESERVICE_TYPE.PICKUP} onClick={handleBannerClick} />
          <ServiceBanner type={ESERVICE_TYPE.TELCOM} onClick={handleBannerClick} />
        </ServiceContainer>
        <ServiceContainer>
          <ServiceBanner type={ESERVICE_TYPE.MOVE} onClick={handleBannerClick} />
          <ServiceBanner type={ESERVICE_TYPE.CAR} onClick={handleBannerClick} />
        </ServiceContainer> */}
      </Content>
    </>
  );
};

export default Landing;
