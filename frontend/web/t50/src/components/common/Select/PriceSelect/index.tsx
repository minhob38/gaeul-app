/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { v4 as uuid4 } from "uuid";
import * as fonts from "@constants/fonts";
import * as colors from "@constants/colors";
import * as variables from "@constants/variables";
import { useTypedDispatch, useTypedSelector } from "@hooks/useStore";
import { actions as carActions } from "@store/slices/carSlice";
import { ECAR_SEARCH_TYPE, EPRICE_TYPE } from "types/enum";

interface IProps {
  carSearchType: ECAR_SEARCH_TYPE;
  type: EPRICE_TYPE;
  size: { width: string; height: string };
  prices: (number | string)[];
}

interface IStyleProps {
  selected: boolean;
}

/**
 * @description price range(min/max) select box (item들은 인자로 전달)
 */
const PriceSelect: React.FC<IProps> = ({ carSearchType, type, size, prices }) => {
  const dispatch = useTypedDispatch();

  const minimumPrice = useTypedSelector((state) => {
    switch (carSearchType) {
      case ECAR_SEARCH_TYPE.NEW:
        return state.rootReducer.carReducer.newMinimumPrice;
      case ECAR_SEARCH_TYPE.USED:
        return state.rootReducer.carReducer.usedMinimumPrice;
      default:
        return state.rootReducer.carReducer.newMinimumPrice;
    }
  });
  const maximumPrice = useTypedSelector((state) => {
    switch (carSearchType) {
      case ECAR_SEARCH_TYPE.NEW:
        return state.rootReducer.carReducer.newMaximumPrice;
      case ECAR_SEARCH_TYPE.USED:
        return state.rootReducer.carReducer.usedMaximumPrice;
      default:
        return state.rootReducer.carReducer.newMinimumPrice;
    }
  });

  // const [isSelected, setIsSelected] = useState<boolean>(false);

  let value: string;
  let name: string;
  const options = prices;

  switch (type) {
    case EPRICE_TYPE.MIN:
      value = minimumPrice;
      if (carSearchType === ECAR_SEARCH_TYPE.NEW) {
        name = "newMinimumPrice";
      } else if (carSearchType === ECAR_SEARCH_TYPE.USED) {
        name = "usedMinimumPrice";
      } else {
        name = "";
      }
      break;
    case EPRICE_TYPE.MAX:
      value = maximumPrice;
      if (carSearchType === ECAR_SEARCH_TYPE.NEW) {
        name = "newMaximumPrice";
      } else if (carSearchType === ECAR_SEARCH_TYPE.USED) {
        name = "usedMaximumPrice";
      } else {
        name = "";
      }
      break;
    default:
      value = "";
      name = "";
  }

  const Options = options.map((option) => {
    return (
      <option key={uuid4()} value={option}>
        {option}
      </option>
    );
  });

  const Select = styled.select`
    all: unset;
  `;

  const Wrapper = styled.div`
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${size.width};
    height: ${size.height};
    border-radius: 8px;
    background: ${colors.WHITE_1};
    border: ${(props: IStyleProps) => (props.selected ? `2px solid ${colors.PRIMARY_3}` : `none`)};
    text-align: center;
    font: ${fonts.FONT_SMALL_400};
    color: ${(props: IStyleProps) => (props.selected ? `${colors.BLACK_1}` : `${colors.GRAY_1}`)};
    overflow: hidden;
  `;

  const handleClick = (ev) => {
    dispatch(carActions.selectInput(ev.target));
  };

  return (
    <Wrapper selected={false}>
      <Select name={name} value={value} onChange={handleClick}>
        {Options}
      </Select>
    </Wrapper>
  );
};

export default PriceSelect;
