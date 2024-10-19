/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import * as size from "@constants/size";
import * as colors from "@constants/colors";
import * as fonts from "@constants/fonts";
import * as margins from "@constants/margins";
import { Link } from "react-router-dom";
import { useTypedDispatch, useTypedSelector } from "@hooks/useStore";
import EventNoteIcon from "@mui/icons-material/EventNote";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import Toggle from "./Toggle";

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
  width: calc(100% - 2 * ${SIDE_MARGIN});
`;

const MenuContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: start;
  align-items: center;
  height: 50px;
  width: 100%;
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
  const isSide = useTypedSelector((state) => state.rootReducer.settingReducer.isSide);

  return (
    <Wrapper width={width}>
      {isSide ? <Toggle mode="hide" /> : <Toggle mode="show" />}
      {isSide && (
        <MenuListContainer>
          <MenuContainer>
            <EventNoteIcon />
            <Menu path="/board" title="보드" />
          </MenuContainer>
          <MenuContainer>
            <FormatListBulletedIcon />
            <Menu path="/to" title="할일 목록" />
          </MenuContainer>
          <MenuContainer>
            <PlaylistAddIcon />
            <Menu path="/candidate" title="모은 목록" />
          </MenuContainer>
          <MenuContainer>
            <DeleteSweepIcon />
            <Menu path="/trash" title="휴지통" />
          </MenuContainer>
        </MenuListContainer>
      )}
    </Wrapper>
  );
};

export default Side;
