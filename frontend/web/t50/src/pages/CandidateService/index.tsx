/** @jsxImportSource @emotion/react */

import Header from "@components/common/Header";
import Content from "@components/common/Content";
import Scroll from "@components/common/Scroll";
import * as size from "@constants/size";
import { useTypedDispatch, useTypedSelector } from "@hooks/useStore";
import CandidateItem from "@components/Candidate/CandidateItem";
import CandidateItemHeader from "@components/Candidate/CandidateItemHeader";
import Side from "@components/common/Side";
import { v4 as uuid4 } from "uuid";

const CandidateService = () => {
  const sideWidth = useTypedSelector((state) => state.rootReducer.viewReducer.sideWidth);

  const SOURCE_WIDTH = "100px";
  const DUE_DATE_WIDTH = "100px";
  const SELECTION_WIDTH = "100px";

  const CandidateItems = new Array(50).fill(null).map(() => {
    return (
      <CandidateItem
        key={uuid4()}
        sourceWidth={SOURCE_WIDTH}
        dueDateWidth={DUE_DATE_WIDTH}
        selectionWidth={SELECTION_WIDTH}
      />
    );
  });

  return (
    <>
      <Header title="모은 목록" mode="service"></Header>
      <Side width={sideWidth} />
      <Content left={sideWidth} top={size.HEADER_HEIGHT} bottom="0">
        <Scroll direction="y" height={`calc(100% - 0px)`}>
          <CandidateItemHeader
            sourceWidth={SOURCE_WIDTH}
            dueDateWidth={DUE_DATE_WIDTH}
            selectionWidth={SELECTION_WIDTH}
          />
          {CandidateItems}
        </Scroll>
      </Content>
    </>
  );
};

export default CandidateService;
