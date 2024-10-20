/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import * as size from "@constants/size";
import * as colors from "@constants/colors";
import * as fonts from "@constants/fonts";
import * as margins from "@constants/margins";
import { Link } from "react-router-dom";
import { useTypedDispatch, useTypedSelector } from "@hooks/useStore";
import { actions as navigationActions } from "@store/slices/navigationSlice";
import EventNoteIcon from "@mui/icons-material/EventNote";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import Toggle from "./Toggle";

type TMenu = "board" | "todo" | "candidate" | "trash" | null;

const SIDE_MARGIN = "20px";

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  display: flex;
  flex-flow: column nowrap;
  justify-content: start;
  align-items: center;
  width: ${(props: { width: string }) => `${props.width}`};
  height: 100%;
  background-color: ${colors.GRAY_3};
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
`;

const BoardMenuContainer = styled(MenuContainer)`
  background-color: ${(props: { selectedMenu: TMenu }) =>
    props.selectedMenu === "board" ? colors.GRAY_2 : "none"};
`;

const ToDoMenuContainer = styled(MenuContainer)`
  background-color: ${(props: { selectedMenu: TMenu }) =>
    props.selectedMenu === "todo" ? colors.GRAY_2 : "none"};
`;

const CandidateMenuContainer = styled(MenuContainer)`
  background-color: ${(props: { selectedMenu: TMenu }) =>
    props.selectedMenu === "candidate" ? colors.GRAY_2 : "none"};
`;

const TrashMenuContainer = styled(MenuContainer)`
  background-color: ${(props: { selectedMenu: TMenu }) =>
    props.selectedMenu === "trash" ? colors.GRAY_2 : "none"};
`;

const SLink = styled(Link)`
  all: unset;
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100%;
  font: ${fonts.FONT_SMALL_400};
  color: ${colors.BLACK_1};
  margin: 0 0 0 10px;
`;

const Menu: React.FC<{ path: string; title: string }> = ({ path, title }) => {
  return <SLink to={path}>{title}</SLink>;
};

const Side: React.FC<{ width: string }> = ({ width }) => {
  const dispatch = useTypedDispatch();
  const handleBoardMenuClick = () => {
    dispatch(navigationActions.selectMenu("board"));
  };
  const handleToDoMenuClick = () => {
    dispatch(navigationActions.selectMenu("todo"));
  };
  const handleCandidateMenuClick = () => {
    dispatch(navigationActions.selectMenu("candidate"));
  };
  const handleTrashMenuClick = () => {
    dispatch(navigationActions.selectMenu("trash"));
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
            <EventNoteIcon />
            <Menu path="/board" title="보드" />
          </BoardMenuContainer>
          <ToDoMenuContainer selectedMenu={selectedMenu} onClick={handleToDoMenuClick}>
            <FormatListBulletedIcon />
            <Menu path="/to" title="할일 목록" />
          </ToDoMenuContainer>
          <CandidateMenuContainer selectedMenu={selectedMenu} onClick={handleCandidateMenuClick}>
            <PlaylistAddIcon />
            <Menu path="/candidate" title="모은 목록" />
          </CandidateMenuContainer>
          <TrashMenuContainer selectedMenu={selectedMenu} onClick={handleTrashMenuClick}>
            <DeleteSweepIcon />
            <Menu path="/trash" title="휴지통" />
          </TrashMenuContainer>
        </MenuListContainer>
      )}
    </Wrapper>
  );
};

export default Side;
