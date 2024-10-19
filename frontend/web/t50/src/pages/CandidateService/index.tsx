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

const ButtonContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  margin: 15px 0 15px 0;
  padding: 0 ${margins.SIDE_MAIN_MARGIN};
  gap: 0 10px;
`;

const PriceContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  width: calc(100% - 2 * ${margins.SIDE_MAIN_MARGIN});
  margin: 0 auto 0 auto;
`;

const SearchButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 0 0 20px;
`;

const PriceSelectBoxContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
`;

const HypenText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto 10px;
  font: ${fonts.FONT_LARGE_400};
  color: ${colors.BLACK_1};
  text-align: center;
`;

const NotificationText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px auto 0 auto;
  width: calc(100% - 2 * ${margins.SIDE_MAIN_MARGIN});
  font: ${fonts.FONT_LARGE_400};
  color: ${colors.BLACK_1};
  text-align: center;
`;

const SearchText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font: ${fonts.FONT_LARGE_400};
  color: ${colors.BLACK_1};
  text-align: center;
  border-radius: 8px;
  padding: 0 10px;
  background-color: ${colors.PRIMARY_3};
`;

const ErrorText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  width: ${`calc(100% - ${margins.SIDE_MAIN_MARGIN} - ${margins.SIDE_MAIN_MARGIN})`};
  margin: 0 auto;
  font: ${fonts.FONT_SMALL_400};
  color: ${colors.ERROR_RED};
  text-align: center;
`;

const SCROLL_BOTTOM_MARGIN = 150;

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font: ${fonts.FONT_MEDIUM_400};
  color: ${colors.BLACK_1};
  text-align: center;
  width: 600px;
  background-color: ${colors.WHITE_1};
`;

const DescriptionText = styled(Title)`
  width: 600px;
`;

const DueDate = styled(Title)`
  width: 50px;
`;

const Status = styled(Title)`
  width: 50px;
`;

const CandidateItemContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  width: calc(100% - 2 * ${margins.SIDE_MAIN_MARGIN});
  margin: 0 auto 0 auto;
`;

const CandidateService = () => {
  const dispatch = useTypedDispatch();
  const errorMessage = useTypedSelector(
    (state) => state.rootReducer.errorReducer.carSaleErrorMessage,
  );
  const carSearchType = useTypedSelector((state) => state.rootReducer.carReducer.carSearchType);

  const handleFocus = () => dispatch(errorActions.catchCarSaleError());

  // TODO: Sidebanner
  return (
    <>
      <Header title="Candidates" mode="back"></Header>
      <Content top={size.HEADER_HEIGHT} bottom="0">
        <CandidateItemHeader sourceWidth="150px" dueDateWidth="150px" selectionWidth="80px" />
        <CandidateItem sourceWidth="150px" dueDateWidth="150px" selectionWidth="80px" />
        <CandidateItem sourceWidth="150px" dueDateWidth="150px" selectionWidth="80px" />
        <CandidateItem sourceWidth="150px" dueDateWidth="150px" selectionWidth="80px" />
        <CandidateItem sourceWidth="150px" dueDateWidth="150px" selectionWidth="80px" />
        <CandidateItem sourceWidth="150px" dueDateWidth="150px" selectionWidth="80px" />
        <CandidateItem sourceWidth="150px" dueDateWidth="150px" selectionWidth="80px" />
        <CandidateItem sourceWidth="150px" dueDateWidth="150px" selectionWidth="80px" />
      </Content>
    </>
  );
};

export default CandidateService;
