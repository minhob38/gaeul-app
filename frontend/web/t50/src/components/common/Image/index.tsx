/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

interface IProps {
  src: string;
  alt: string;
  width?: string;
  height?: string;
}

const Image: React.FC<IProps> = ({ src, alt, width = "none", height = "none" }) => {
  return (
    <img
      src={src}
      alt={alt}
      css={css`
        width: ${width};
        object-fit: contain;
        height: ${height};
      `}
    ></img>
  );
};

export default Image;
