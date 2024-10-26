/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import Header from "@components/common/Header";
import Content from "@components/common/Content";
import * as size from "@constants/size";
import * as margins from "@constants/margins";
import { useTypedDispatch, useTypedSelector } from "@hooks/useStore";
import LoginWarningModal from "modals/LoginWarningModal";
import { useEffect } from "react";
import { actions as errorActions } from "@store/slices/errorSlice";
import { actions as modalActions } from "@store/slices/modalSlice";
import { actions as authActions } from "@store/slices/authSlice";
import { actions as userActions } from "@store/slices/authSlice";
import { actions as navigationActions } from "@store/slices/navigationSlice";
import { actions as viewActions } from "@store/slices/viewSlice";
import Button from "@material-ui/core/Button";
import Side from "@components/common/Side";
import Scroll from "@components/common/Scroll";

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

  const sideWidth = useTypedSelector((state) => state.rootReducer.viewReducer.sideWidth);
  const dispatch = useTypedDispatch();

  //초기화 코드
  useEffect(() => {
    dispatch(userActions.initialize()); //TODO 임시
    dispatch(authActions.initialize());
    dispatch(viewActions.initialize());
    dispatch(navigationActions.initialize());
    dispatch(modalActions.initialize());
    dispatch(errorActions.initialize());
  }, []);

  return (
    <>
      <Header title="랜딩페이지" mode="service"></Header>
      {isAuthenticated && <Side width={sideWidth} />}
      <Content left={isAuthenticated ? sideWidth : "0px"} top={size.HEADER_HEIGHT} bottom="0">
        <Scroll direction="y" height={`calc(100% - 0px)`}>
          Landing Page
        </Scroll>
      </Content>
    </>
  );
};

export default Landing;
