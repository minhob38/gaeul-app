/** @jsxImportSource @emotion/react */
import { Route, Routes } from "react-router-dom";
import styled from "@emotion/styled";
import Landing from "./pages/Landing";
import * as colors from "@constants/colors";
import SignIn from "pages/Auth/SignIn";
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
              path="/signin"
              element={!isAuthenticated ? <SignIn /> : <Navigate replace to="/" />}
            />
            <Route path="/sign-up" element={<SignUp />} />
            {/* my page */}
            <Route
              path="/my-page"
              element={isAuthenticated ? <MyPage /> : <Navigate replace to="/" />}
            />
            {/* board */}
            <Route path="/board" element={<BoardService />} />
            {/* todo */}
            <Route path="/todo" element={<TodoService />} />
            {/* candidate */}
            <Route path="/candidate" element={<CandidateService />} />
            {/* trash */}
            <Route path="/trash" element={<TrashService />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </WebWrapper>
  );
}

export default App;
