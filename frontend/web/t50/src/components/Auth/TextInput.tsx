/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import * as fonts from "@constants/fonts";
import * as colors from "@constants/colors";

interface IStyleProps {
  disabled: boolean;
}
interface IProps {
  placeholder: string;
  type: string;
  name: string;
  onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  value?: string;
}

const Input = styled.input`
  all: unset;
  width: 100%;
  height: 32px;
  border-bottom: 1px solid ${colors.GRAY_1};
  text-align: center;
  font: ${fonts.FONT_MEDIUM_400};
  &::placeholder {
    color: ${colors.GRAY_1};
  }
  color: ${(props: IStyleProps) => (props.disabled ? `${colors.GRAY_1}` : `${colors.BLACK_1}`)};
`;

const TextInput: React.FC<IProps> = ({ placeholder, type, name, onChange, value, disabled }) => {
  if (value) {
    return (
      <Input
        placeholder={placeholder}
        type={type}
        name={name}
        onChange={onChange}
        disabled={disabled || false}
        value={value}
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
    ></Input>
  );
};

export default TextInput;
