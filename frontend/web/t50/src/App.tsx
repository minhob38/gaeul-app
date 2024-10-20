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

function App() {
  const Fallback = () => {
    return <LoadingModal />;
  };

  const isAuthenticated = useTypedSelector(
    (state) => state.rootReducer.userReducer.isAuthenticated,
  );

  useInitialAuthentication();

  // TODO: 여기에 쿠키 확인해서, 로그인 체크하는 로직 넣기

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
            <Route path="/" element={<Landing />} />
            {/* auth */}
            <Route
              path={SIGNIN_PATH}
              element={<SignIn />}
              // element={!isAuthenticated ? <SignIn /> : <Navigate replace to="/" />}
            />
            <Route path={SIGNUP_PATH} element={<SignUp />} />
            {/* my page */}
            <Route
              path={MY_PAGE_PATH}
              element={isAuthenticated ? <MyPage /> : <Navigate replace to="/" />}
            />
            {/* board */}
            <Route path={BOARD_PATH} element={<BoardService />} />
            {/* todo */}
            <Route path={TODO_PATH} element={<TodoService />} />
            {/* candidate */}
            <Route path={CANDIDATE_PATH} element={<CandidateService />} />
            {/* trash */}
            <Route path={TRASH_PATH} element={<TrashService />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </WebWrapper>
  );
}

export default App;
