/** @jsxImportSource @emotion/react */
import { Route, Routes } from "react-router-dom";
import styled from "@emotion/styled";
import Landing from "./pages/Landing";
import * as colors from "@constants/colors";
import SignIn from "pages/Auth/Signin";
import { ErrorBoundary } from "react-error-boundary";
import ErrorPage from "pages/Error";
import { Suspense } from "react";
import SignUp from "pages/Auth/SignUp";
import { Navigate } from "react-router-dom";
import { useTypedSelector } from "@hooks/useStore";
import MyPage from "pages/MyPage";
import LoadingModal from "modals/SpinnerLoadingModal";
import { useInitialAuthentication } from "@hooks/useAuth";
import CandidateService from "pages/CandidateService";
import BoardService from "pages/BoardService";
import TodoService from "pages/TodoService";
import TrashService from "pages/TrashService";
import {
  SIGNIN_PATH,
  SIGNUP_PATH,
  BOARD_PATH,
  CANDIDATE_PATH,
  MY_PAGE_PATH,
  TODO_PATH,
  TRASH_PATH,
  LANDING_PATH,
} from "@constants/route-path";

// useMutation은 suspense fallback 반영 X
// useQuery는 suspense fallback 반영 O

const MobileWrapper = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: ${colors.BACKGROUND};
  overflow: hidden;
`;

const WebWrapper = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: ${colors.BACKGROUND};
  overflow: hidden;
`;

const App = () => {
  const Fallback = () => {
    return <LoadingModal />;
  };

  const isAuthenticated = useTypedSelector(
    (state) => state.rootReducer.userReducer.isAuthenticated,
  );

  useInitialAuthentication();

  return (
    <WebWrapper>
      <ErrorBoundary
        FallbackComponent={ErrorPage}
        onReset={() => {
          // reset the state of your app so the error doesn't happen again
        }}
      >
        <Suspense fallback={<Fallback />}>
          <Routes>
            {/* landing */}
            <Route
              path={LANDING_PATH}
              element={!isAuthenticated ? <Landing /> : <Navigate replace to="/candidate" />}
            />
            {/* auth */}
            <Route
              path={SIGNIN_PATH}
              element={!isAuthenticated ? <SignIn /> : <Navigate replace to="/" />}
            />
            <Route path={SIGNUP_PATH} element={<SignUp />} />
            {/* my page */}
            {/* <Route
              path={MY_PAGE_PATH}
              element={isAuthenticated ? <MyPage /> : <Navigate replace to="/" />}
            /> */}
            {/* board */}
            <Route
              path={BOARD_PATH}
              element={isAuthenticated ? <BoardService /> : <Navigate replace to="/" />}
            />
            {/* todo */}
            <Route
              path={TODO_PATH}
              element={isAuthenticated ? <TodoService /> : <Navigate replace to="/" />}
            />
            {/* candidate */}
            <Route
              path={CANDIDATE_PATH}
              element={isAuthenticated ? <CandidateService /> : <Navigate replace to="/" />}
            />
            {/* trash */}
            <Route
              path={TRASH_PATH}
              element={isAuthenticated ? <TrashService /> : <Navigate replace to="/" />}
            />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </WebWrapper>
  );
};

export default App;
