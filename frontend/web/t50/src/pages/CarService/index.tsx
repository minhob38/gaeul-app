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

const CarService = () => {
  const dispatch = useTypedDispatch();
  const errorMessage = useTypedSelector(
    (state) => state.rootReducer.errorReducer.carSaleErrorMessage,
  );
  const carSearchType = useTypedSelector((state) => state.rootReducer.carReducer.carSearchType);
  const newMinimumPrice = useTypedSelector((state) => state.rootReducer.carReducer.newMinimumPrice);
  const newMaximumPrice = useTypedSelector((state) => state.rootReducer.carReducer.newMaximumPrice);
  const usedMinimumPrice = useTypedSelector(
    (state) => state.rootReducer.carReducer.usedMinimumPrice,
  );
  const usedMaximumPrice = useTypedSelector(
    (state) => state.rootReducer.carReducer.usedMaximumPrice,
  );

  const newQuery = useCarsSalesQuery(ECAR_SEARCH_TYPE.NEW);
  const usedQuery = useCarsSalesQuery(ECAR_SEARCH_TYPE.USED);

  const newCacheApiData = useCarSalesQueryClient(ECAR_SEARCH_TYPE.NEW);
  const usedCacheApiData = useCarSalesQueryClient(ECAR_SEARCH_TYPE.USED);

  const newApiData = newQuery.data || newCacheApiData || [];
  const usedApiData = usedQuery.data || usedCacheApiData || [];

  const handleNewSearchButtonClick = () => {
    dispatch(carActions.changeSearchType(ECAR_SEARCH_TYPE.NEW));
  };
  const handleUsedSearchButtonClick = () => {
    dispatch(carActions.changeSearchType(ECAR_SEARCH_TYPE.USED));
  };
  const handleSearchClick = () => {
    switch (carSearchType) {
      case ECAR_SEARCH_TYPE.NEW:
        // 최소/최대값을 입력하지 않았을때
        if (
          newMinimumPrice === variables.SELECT_MIN_PRICE_DEFAULT_TEXT ||
          newMaximumPrice === variables.SELECT_MAX_PRICE_DEFAULT_TEXT
        ) {
          dispatch(errorActions.throwCarSaleError("Select minimum or maximum price"));
          return;
        }

        // 최소값이 최대값보다 클때
        if (parseInt(newMinimumPrice) > parseInt(newMaximumPrice)) {
          dispatch(
            errorActions.throwCarSaleError("Maximum price should be greater than minimum price"),
          );
          return;
        }

        newQuery.refetch();
        return;
      case ECAR_SEARCH_TYPE.USED:
        // 최소/최대값을 입력하지 않았을때
        if (
          usedMinimumPrice === variables.SELECT_MIN_PRICE_DEFAULT_TEXT ||
          usedMaximumPrice === variables.SELECT_MAX_PRICE_DEFAULT_TEXT
        ) {
          dispatch(errorActions.throwCarSaleError("Select minimum or maximum price"));
          return;
        }

        // 최소값이 최대값보다 클때
        if (parseInt(usedMinimumPrice) > parseInt(usedMaximumPrice)) {
          dispatch(
            errorActions.throwCarSaleError("Maximum price should be greater than minimum price"),
          );
          return;
        }

        usedQuery.refetch();
        return;
      default:
    }
  };

  const handleFocus = () => dispatch(errorActions.catchCarSaleError());

  return (
    <>
      <Header title="Car" mode="back"></Header>
      <Content top={size.HEADER_HEIGHT} bottom="0">
        <ButtonContainer onFocus={handleFocus}>
          <CarSearchTypeButton
            title="New"
            width="100px"
            height="40px"
            clicked={carSearchType === ECAR_SEARCH_TYPE.NEW}
            onClick={handleNewSearchButtonClick}
          />
          <CarSearchTypeButton
            title="Used"
            width="100px"
            height="40px"
            clicked={carSearchType === ECAR_SEARCH_TYPE.USED}
            onClick={handleUsedSearchButtonClick}
          />
        </ButtonContainer>
        <div>
          <PriceContainer>
            <PriceSelectBoxContainer onFocus={handleFocus}>
              <PriceSelect
                carSearchType={carSearchType}
                type={EPRICE_TYPE.MIN}
                size={{ width: "100px", height: "30px" }}
                prices={variables.MIN_PRICES}
              />
              <HypenText>~</HypenText>
              <PriceSelect
                carSearchType={carSearchType}
                type={EPRICE_TYPE.MAX}
                size={{ width: "100px", height: "30px" }}
                prices={variables.MAX_PRICES}
              />
            </PriceSelectBoxContainer>
            <SearchButtonContainer onFocus={handleFocus}>
              {/* <FontAwesomeIcon
                icon={faMagnifyingGlass}
                fontSize={"24px"}
                onClick={handleSearchClick}
              /> */}
              <SearchText onClick={handleSearchClick}>Search</SearchText>
            </SearchButtonContainer>
          </PriceContainer>
          <ErrorText>{errorMessage}</ErrorText>
        </div>
        <Scroll direction="y" height={`calc(100% - ${SCROLL_BOTTOM_MARGIN}px)`}>
          {/* {<NotificationText>Click magnifier after setting price range</NotificationText>} */}
          {carSearchType === ECAR_SEARCH_TYPE.NEW && <CarSales cars={newApiData} />}
          {carSearchType === ECAR_SEARCH_TYPE.USED && <CarSales cars={usedApiData} />}
        </Scroll>
      </Content>
    </>
  );
};

export default CarService;
