/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import * as size from "@constants/size";
import * as margins from "@constants/margins";
// import { useCarSalesQueryClient, useCarsSalesQuery } from "@hooks/useApiQuery";
import * as variables from "@constants/variables";
import * as fonts from "@constants/fonts";
import * as colors from "@constants/colors";
import { useTypedDispatch, useTypedSelector } from "@hooks/useStore";
import { actions as errorActions } from "@store/slices/errorSlice";
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
  font: ${fonts.FONT_SMALL_400};
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
  width: 100%;
  height: 50px;
`;

const Line = styled.div`
  height: 1px;
  background-color: ${colors.GRAY_3};
  margin: 0 auto 0 auto;
  width: calc(100% - 2 * ${size.SIDE_MARGIN_1});
`;

const Wrapper = styled.div``;

const CandidateItem: React.FC<IProps> = ({ sourceWidth, dueDateWidth, selectionWidth }) => {
  return (
    <Wrapper>
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
    </Wrapper>
  );
};

export default CandidateItem;
