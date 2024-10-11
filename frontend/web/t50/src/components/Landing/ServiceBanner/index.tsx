/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import * as colors from "@constants/colors";
import * as fonts from "@constants/fonts";
import Image from "@components/common/Image";
import { Link } from "react-router-dom";
import { ESERVICE_TYPE } from "types/enum";
import pickUpImage from "@assets/images/pickup-service.jpg";
import teleImage from "@assets/images/tele-service.png";
import moveImage from "@assets/images/move-service.png";
import carImage from "@assets/images/car-service.png";
import { useTypedSelector } from "@hooks/useStore";

interface IProps {
  type: ESERVICE_TYPE;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

const GAP = "10px";

const Wrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  width: ${`calc(50% - ${GAP}/2)`};
  box-shadow: 0 5px 10px -10px ${colors.GRAY_1}; // 아래에만 그림자 넣기
  &:hover {
  }
  cursor: pointer;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0 0 0;
  font: ${fonts.FONT_LARGE_400};
  color: ${colors.BLACK_1};
`;

const ServiceBanner: React.FC<IProps> = ({ type, onClick }) => {
  let title: string;
  let src: any;
  let alt: string;
  let path: string;

  switch (type) {
    case ESERVICE_TYPE.PICKUP:
      title = "Pick Up";
      src = pickUpImage;
      alt = "pickup";
      path = "/pickup";
      break;
    case ESERVICE_TYPE.MOVE:
      title = "Move";
      src = moveImage;
      alt = "move";
      path = "/move";
      break;
    case ESERVICE_TYPE.TELCOM:
      title = "Telecom";
      src = teleImage;
      alt = "telcom";
      path = "/telcom";
      break;
    case ESERVICE_TYPE.CAR:
      title = "My Car";
      src = carImage;
      alt = "car";
      path = "/car";
      break;
    default:
      title = "My Car";
      src = carImage;
      alt = "car";
      path = "/car";
  }

  return (
    <Wrapper onClick={onClick}>
      <Link to={path}>
        <Image src={src} alt={alt} width="100%" />
        <Title>{title}</Title>
      </Link>
    </Wrapper>
  );
};

export default ServiceBanner;
