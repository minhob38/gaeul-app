/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import * as colors from "@constants/colors";
import * as fonts from "@constants/fonts";
import * as margins from "@constants/margins";
import { useTypedDispatch, useTypedSelector } from "@hooks/useStore";
import { actions as telcomActions } from "@store/slices/telcomSlice";
import { shallowEqual } from "react-redux";
import { useEffect, useState } from "react";

interface IProps {
  name: string;
  title: string;
  value: string;
}

interface IStyleProps {
  checked: boolean;
}

const Label = styled.label`
  display: flex;
  align-items: center;
  width: calc(100% - 2 * ${margins.SIDE_MAIN_MARGIN});
  margin: 0 auto;
`;

const Input = styled.input`
  all: unset;
`;

const Text = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 100%;
  font: ${fonts.FONT_LARGE_400};
  color: ${colors.GRAY_1};
  color: ${(props: IStyleProps) => (props.checked ? colors.BLACK_1 : colors.GRAY_1)};
  background-color: ${colors.WHITE_1};
  border: ${(props: IStyleProps) => (props.checked ? `2px solid ${colors.PRIMARY_3}` : "none")};
  border-radius: 8px;
`;
// border: ${(props: IStyleProps) =>
//   props.checked ? `2px solid ${colors.PRIMARY_2}` : `2px solid ${colors.GRAY_1}`};

const CheckboxInput: React.FC<IProps> = ({ name, title, value }) => {
  const dispatch = useTypedDispatch();
  // const kind = useTypedSelector((state) => state.rootReducer.telcomReducer.kind, shallowEqual);
  const [isChecked, setIsChecked] = useState<boolean>(false);

  // useEffect(() => {
  //   if (kind.includes(value as any)) {
  //     setIsChecked(true);
  //     return;
  //   }
  //   setIsChecked(false);
  // }, [kind, value]);

  const handleCheckboxInputChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(telcomActions.checkboxInput(ev.target));
  };

  return (
    <Label>
      <Text checked={isChecked}>{title}</Text>
      <Input
        type="checkbox"
        name={name}
        value={value}
        checked={isChecked}
        onChange={handleCheckboxInputChange}
        // onClick={}
      />
    </Label>
  );
};

export default CheckboxInput;
