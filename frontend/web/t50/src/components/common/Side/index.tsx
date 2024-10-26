/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import * as size from "@constants/size";
import * as colors from "@constants/colors";
import * as fonts from "@constants/fonts";
import { Link } from "react-router-dom";
import { useTypedDispatch, useTypedSelector } from "@hooks/useStore";
import { actions as navigationActions } from "@store/slices/navigationSlice";
import EventNoteSharp from "@mui/icons-material/EventNoteSharp";
import FormatListBulletedSharp from "@mui/icons-material/FormatListBulletedSharp";
import PlaylistAddSharp from "@mui/icons-material/PlaylistAddSharp";
import DeleteSweepSharp from "@mui/icons-material/DeleteSweepSharp";
import TerminalIcon from "@mui/icons-material/Terminal";
import Toggle from "./Toggle";
import { useNavigate } from "react-router-dom";
import {
  BOARD_PATH,
  CANDIDATE_PATH,
  TEST_PATH,
  TODO_PATH,
  TRASH_PATH,
} from "@constants/route-path";
import { TMenu } from "types/type";

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  display: flex;
  flex-flow: column nowrap;
  justify-content: start;
  align-items: center;
  width: ${(props: { width: string }) => `${props.width}`};
  height: 100%;
  background-color: ${colors.BLACK_1};
  z-index: 1;
`;

const MenuListContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  align-items: center;
  margin: 150px 0 0 0;
  width: 100%;
`;

const MenuContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: start;
  align-items: center;
  height: 50px;
  width: 100%;
  padding: 0 0 0 20px;
  &:hover {
    background-color: ${colors.BLACK};
    border: none;
  }
  cursor: pointer;
`;

const BoardMenuContainer = styled(MenuContainer)`
  background-color: ${(props: { selectedMenu: TMenu }) =>
    props.selectedMenu === "board" ? colors.BLACK : "none"};
`;

const TodoMenuContainer = styled(MenuContainer)`
  background-color: ${(props: { selectedMenu: TMenu }) =>
    props.selectedMenu === "todo" ? colors.BLACK : "none"};
`;

const CandidateMenuContainer = styled(MenuContainer)`
  background-color: ${(props: { selectedMenu: TMenu }) =>
    props.selectedMenu === "candidate" ? colors.BLACK : "none"};
`;

const TrashMenuContainer = styled(MenuContainer)`
  background-color: ${(props: { selectedMenu: TMenu }) =>
    props.selectedMenu === "trash" ? colors.BLACK : "none"};
`;

const TestMenuContainer = styled(MenuContainer)`
  background-color: ${(props: { selectedMenu: TMenu }) =>
    props.selectedMenu === "test" ? colors.BLACK : "none"};
`;

const MenuText = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100%;
  font: ${fonts.FONT_SMALL_400};
  color: ${colors.WHITE_1};
  margin: 0 0 0 10px;
`;

const Side: React.FC<{ width: string }> = ({ width }) => {
  const navigate = useNavigate();
  const dispatch = useTypedDispatch();
  const handleBoardMenuClick = () => {
    dispatch(navigationActions.selectMenu("board"));
    navigate(BOARD_PATH);
  };

  const handleTodoMenuClick = () => {
    dispatch(navigationActions.selectMenu("todo"));
    navigate(TODO_PATH);
  };

  const handleCandidateMenuClick = () => {
    dispatch(navigationActions.selectMenu("candidate"));
    navigate(CANDIDATE_PATH);
  };

  const handleTrashMenuClick = () => {
    dispatch(navigationActions.selectMenu("trash"));
    navigate(TRASH_PATH);
  };

  const handleTestMenuClick = () => {
    dispatch(navigationActions.selectMenu("test"));
    navigate(TEST_PATH);
  };

  const isSide = useTypedSelector((state) => state.rootReducer.viewReducer.isSide);
  const selectedMenu = useTypedSelector(
    (state) => state.rootReducer.navigationReducer.selectedMenu,
  );

  return (
    <Wrapper width={width}>
      {isSide ? <Toggle mode="hide" /> : <Toggle mode="show" />}
      {isSide && (
        <MenuListContainer>
          <BoardMenuContainer selectedMenu={selectedMenu} onClick={handleBoardMenuClick}>
            <EventNoteSharp style={{ color: colors.WHITE_1 }} />
            <MenuText>보드</MenuText>
          </BoardMenuContainer>
          <TodoMenuContainer selectedMenu={selectedMenu} onClick={handleTodoMenuClick}>
            <FormatListBulletedSharp style={{ color: colors.WHITE_1 }} />
            <MenuText>할일 목록</MenuText>
          </TodoMenuContainer>
          <CandidateMenuContainer selectedMenu={selectedMenu} onClick={handleCandidateMenuClick}>
            <PlaylistAddSharp style={{ color: colors.WHITE_1 }} />
            <MenuText>모인 목록</MenuText>
          </CandidateMenuContainer>
          <TrashMenuContainer selectedMenu={selectedMenu} onClick={handleTrashMenuClick}>
            <DeleteSweepSharp style={{ color: colors.WHITE_1 }} />
            <MenuText>휴지통</MenuText>
          </TrashMenuContainer>
          <TestMenuContainer selectedMenu={selectedMenu} onClick={handleTestMenuClick}>
            <TerminalIcon style={{ color: colors.WHITE_1 }} />
            <MenuText>테스트</MenuText>
          </TestMenuContainer>
        </MenuListContainer>
      )}
    </Wrapper>
  );
};

export default Side;
