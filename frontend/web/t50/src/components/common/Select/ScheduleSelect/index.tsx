/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { v4 as uuid4 } from "uuid";
import * as fonts from "@constants/fonts";
import * as colors from "@constants/colors";
import * as variables from "@constants/variables";
import { useTypedDispatch } from "@hooks/useStore";
import { EENGLISH_MONTH, ESCHEDULE_TYPE, ESERVICE_TYPE } from "types/enum";
import { useEffect, useState } from "react";
import { useDateSelector } from "@hooks/useSelect";

interface IProps {
  service: ESERVICE_TYPE;
  type: ESCHEDULE_TYPE;
  size: { width: string; height: string };
}

interface IStyleProps {
  selected: boolean;
}

const ScheduleSelect: React.FC<IProps> = ({ service, type, size }) => {
  const dispatch = useTypedDispatch();
  const [year, month, date, hour, minute] = useDateSelector(service);
  const [isSelected, setIsSelected] = useState<boolean>(false);

  useEffect(() => {
    switch (type) {
      case ESCHEDULE_TYPE.YEAR:
        if (year === variables.SELECT_YEAR_DEFAULT_TEXT) {
          setIsSelected(false);
          return;
        }
        setIsSelected(true);
        break;
      case ESCHEDULE_TYPE.MONTH:
        if (month === variables.SELECT_MONTH_DEFAULT_TEXT) {
          setIsSelected(false);
          return;
        }

        setIsSelected(true);
        break;
      case ESCHEDULE_TYPE.DATE:
        if (date === variables.SELECT_DATE_DEFAULT_TEXT) {
          setIsSelected(false);
          return;
        }
        setIsSelected(true);
        break;
      case ESCHEDULE_TYPE.HOUR:
        if (hour === variables.SELECT_HOUR_DEFAULT_TEXT) {
          setIsSelected(false);
          return;
        }
        setIsSelected(true);
        break;
      case ESCHEDULE_TYPE.MINUTE:
        if (minute === variables.SELECT_MINUTE_DEFAULT_TEXT) {
          setIsSelected(false);
          return;
        }
        setIsSelected(true);
        break;
      default:
        setIsSelected(false);
    }
  }, [type, year, month, date, hour, minute]);

  const months = [variables.SELECT_MONTH_DEFAULT_TEXT];
  const dates = [variables.SELECT_DATE_DEFAULT_TEXT];
  const hours = [variables.SELECT_HOUR_DEFAULT_TEXT];
  const minutes = [variables.SELECT_MINUTE_DEFAULT_TEXT];
  const years = [
    variables.SELECT_YEAR_DEFAULT_TEXT,
    new Date().getFullYear().toString(),
    (new Date().getFullYear() + 1).toString(),
  ];

  let value: string;
  let name: string;
  let options: string[];

  switch (type) {
    case ESCHEDULE_TYPE.YEAR:
      value = year;
      name = "year";
      options = years;
      break;
    case ESCHEDULE_TYPE.MONTH:
      value = month;
      name = "month";
      const engMonth = [
        EENGLISH_MONTH.JAN,
        EENGLISH_MONTH.FEB,
        EENGLISH_MONTH.MAR,
        EENGLISH_MONTH.APR,
        EENGLISH_MONTH.MAY,
        EENGLISH_MONTH.JUN,
        EENGLISH_MONTH.JUL,
        EENGLISH_MONTH.AUG,
        EENGLISH_MONTH.SEP,
        EENGLISH_MONTH.OCT,
        EENGLISH_MONTH.NOV,
        EENGLISH_MONTH.DEC,
      ];
      months.push(...engMonth);
      options = months;
      break;
    case ESCHEDULE_TYPE.DATE:
      value = date;
      name = "date";
      switch (month) {
        case EENGLISH_MONTH.FEB:
          // TODO: 윤달처리
          for (let i = 1; i < 29; i++) {
            dates.push(i.toString());
          }
          break;
        case EENGLISH_MONTH.JAN:
        case EENGLISH_MONTH.MAR:
        case EENGLISH_MONTH.MAY:
        case EENGLISH_MONTH.JUL:
        case EENGLISH_MONTH.AUG:
        case EENGLISH_MONTH.OCT:
        case EENGLISH_MONTH.DEC:
          for (let i = 1; i < 32; i++) {
            dates.push(i.toString());
          }
          break;
        case EENGLISH_MONTH.APR:
        case EENGLISH_MONTH.JUN:
        case EENGLISH_MONTH.SEP:
        case EENGLISH_MONTH.NOV:
          for (let i = 1; i < 31; i++) {
            dates.push(i.toString());
          }
          break;
        default:
      }

      options = dates;
      break;
    case ESCHEDULE_TYPE.HOUR:
      value = hour;
      name = "hour";
      for (let i = 0; i < 24; i++) {
        const hour = i.toString();
        const twoDigit = hour.length === 1 ? "0" + hour : hour;
        hours.push(twoDigit);
      }
      options = hours;
      break;
    case ESCHEDULE_TYPE.MINUTE:
      value = minute;
      name = "minute";
      for (let i = 0; i < 6; i++) {
        minutes.push((10 * i).toString());
      }
      options = minutes;
      break;
    default:
      value = "";
      name = "";
      options = [];
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
  `;

  return (
    <Wrapper selected={isSelected}>
      {/* <Select
        name={name}
        value={value}
        onChange={(ev) => {
          switch (service) {
            case ESERVICE_TYPE.PICKUP:
              dispatch(pickupActions.selectInput(ev.target));
              break;
            case ESERVICE_TYPE.TELCOM:
              dispatch(telcomActions.selectInput(ev.target));
              break;
            case ESERVICE_TYPE.MOVE:
              dispatch(moveActions.selectInput(ev.target));
              break;
            default:
          }

          dispatch(pickupActions.selectInput(ev.target));
        }}
        onClick={(ev) => {
          switch (type) {
            case ESCHEDULE_TYPE.DATE:
              if (
                year === variables.SELECT_DEFAULT_TEXT ||
                month === variables.SELECT_DEFAULT_TEXT
              ) {
                // modal로 바꾸기
                alert("select year and month first");
              }

              break;
            default:
          }
        }}
      >
        {Options}
      </Select> */}
    </Wrapper>
  );
};

export default ScheduleSelect;
