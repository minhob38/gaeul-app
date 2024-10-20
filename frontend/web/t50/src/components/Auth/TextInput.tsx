/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import * as fonts from "@constants/fonts";
import * as colors from "@constants/colors";
import * as size from "@constants/size";

interface IStyleProps {
  disabled: boolean;
  width: string;
  height: string;
}
interface IProps {
  placeholder: string;
  type: string;
  name: string;
  onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  value?: string;
  width: string;
  height: string;
}

const Input = styled.input`
  all: unset;
  width: ${(props: IStyleProps) => props.width};
  height: ${(props: IStyleProps) => props.height};
  text-align: center;
  border: 1px solid ${colors.GRAY_3};
  border-radius: ${size.BORDER_RADIUS_1};
  background-color: ${colors.WHITE_1};
  font: ${fonts.FONT_SMALL_400};
  &::placeholder {
    color: ${colors.GRAY_1};
  }
  color: ${(props: IStyleProps) => (props.disabled ? `${colors.GRAY_1}` : `${colors.BLACK_1}`)};
`;

const TextInput: React.FC<IProps> = ({
  placeholder,
  type,
  name,
  onChange,
  value,
  disabled,
  width,
  height,
}) => {
  if (value) {
    return (
      <Input
        placeholder={placeholder}
        type={type}
        name={name}
        onChange={onChange}
        disabled={disabled || false}
        value={value}
        width={width}
        height={height}
      ></Input>
    );
  }

  return (
    <Input
      placeholder={placeholder}
      type={type}
      name={name}
      onChange={onChange}
      disabled={disabled || false}
      width={width}
      height={height}
    ></Input>
  );
};

export default TextInput;
