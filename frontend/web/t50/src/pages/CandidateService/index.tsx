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
import CarSales from "@components/CarService/CarSales";
import CandidateItem from "@components/Candidate/CandidateItem";
import CandidateItemHeader from "@components/Candidate/CandidateItemHeader";
import Side from "@components/common/Side";

const CandidateService = () => {
  const dispatch = useTypedDispatch();
  const errorMessage = useTypedSelector(
    (state) => state.rootReducer.errorReducer.carSaleErrorMessage,
  );
  const sideWidth = useTypedSelector((state) => state.rootReducer.settingReducer.sideWidth);

  const handleFocus = () => dispatch(errorActions.catchCarSaleError());

  const SOURCE_WIDTH = "100px";
  const DUE_DATE_WIDTH = "100px";
  const SELECTION_WIDTH = "100px";

  return (
    <>
      <Header title="Candidates" mode="back"></Header>
      <Side width={sideWidth} />
      <Content left={sideWidth} top={size.HEADER_HEIGHT} bottom="0">
        <CandidateItemHeader
          sourceWidth={SOURCE_WIDTH}
          dueDateWidth={DUE_DATE_WIDTH}
          selectionWidth={SELECTION_WIDTH}
        />
        <CandidateItem
          sourceWidth={SOURCE_WIDTH}
          dueDateWidth={DUE_DATE_WIDTH}
          selectionWidth={SELECTION_WIDTH}
        />
      </Content>
    </>
  );
};

export default CandidateService;
