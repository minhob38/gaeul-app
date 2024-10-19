/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import * as margins from "@constants/margins";
import * as fonts from "@constants/fonts";
import * as colors from "@constants/colors";

interface IProps {
  sourceWidth: string;
  dueDateWidth: string;
  selectionWidth: string;
}

const Text = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font: ${fonts.FONT_SMALL_600};
  color: ${colors.BLACK_1};
  text-align: center;
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

const Selection = styled(Text)`
  width: ${(props: { width: string }) => `${props.width}`};
`;

const CandidateItemHeaderContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto 0 auto;
  width: 100%;
  height: 50px;
`;

const Line = styled.div`
  height: 1px;
  background-color: ${colors.GRAY_1};
  margin: 0 auto 0 auto;
  width: 100%;
`;

const Wrapper = styled.div``;

const CandidateItemHeader: React.FC<IProps> = ({ sourceWidth, dueDateWidth, selectionWidth }) => {
  return (
    <Wrapper>
      <CandidateItemHeaderContainer>
        <Title>해야할일</Title>
        <Source width={sourceWidth}>출처</Source>
        <DueDate width={dueDateWidth}>기한</DueDate>
        <Selection width={selectionWidth}>선택</Selection>
      </CandidateItemHeaderContainer>
      <Line />
    </Wrapper>
  );
};

export default CandidateItemHeader;
