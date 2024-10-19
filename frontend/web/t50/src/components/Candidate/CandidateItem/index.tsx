/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import Header from "@components/common/Header";
import Content from "@components/common/Content";
import CarSearchTypeButton from "@components/CarService/CarSearchTypeButton";
import Scroll from "@components/common/Scroll";
import * as size from "@constants/size";
import * as margins from "@constants/margins";
import { useCarSalesQueryClient, useCarsSalesQuery } from "@hooks/useApiQuery";
import PriceSelect from "@components/common/Select/PriceSelect";
import { ECAR_SEARCH_TYPE, EPRICE_TYPE } from "types/enum";
import * as variables from "@constants/variables";
import * as fonts from "@constants/fonts";
import * as colors from "@constants/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useTypedDispatch, useTypedSelector } from "@hooks/useStore";
import { actions as errorActions } from "@store/slices/errorSlice";
import { actions as carActions } from "@store/slices/carSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import BookmarkIcon from "@mui/icons-material/Bookmark";

interface IProps {
  sourceWidth: string;
  dueDateWidth: string;
  selectionWidth: string;
}

const Text = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font: ${fonts.FONT_MEDIUM_400};
  color: ${colors.BLACK_1};
  text-align: center;
  /* background-color: ${colors.WHITE_1}; */
`;

const Title = styled(Text)`
  flex: 1;
  width: ${(props: { width?: string }) => `${props.width}`};
`;

const Source = styled(Text)`
  width: ${(props: { width: string }) => `${props.width}`};
`;

const DueDate = styled(Text)`
  width: ${(props: { width: string }) => `${props.width}`};
`;

const Selection = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  align-items: center;
  width: ${(props: { width: string }) => `${props.width}`};
`;

const CandidateItemContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  /* width: calc(100% - 2 * ${margins.SIDE_MAIN_MARGIN}); */
  margin: 0 auto 0 auto;
  height: 50px;
`;

const Line = styled.div`
  height: 1px;
  background-color: ${colors.GRAY_2};
  margin: 0 auto 0 auto;
  width: 100%;
`;

const CandidateItem: React.FC<IProps> = ({ sourceWidth, dueDateWidth, selectionWidth }) => {
  return (
    <>
      <CandidateItemContainer>
        <Title>영수증 제출하기</Title>
        <Source width={sourceWidth}>email</Source>
        <DueDate width={dueDateWidth}>2024/12/31</DueDate>
        <Selection width={selectionWidth}>
          <BookmarkIcon onClick={() => console.log("@@@ bookmark icon")} />
          <DeleteIcon />
        </Selection>
      </CandidateItemContainer>
      <Line />
    </>
  );
};

export default CandidateItem;
