import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const SLink = styled(Link)`
  all: unset;
  display: block;
  background-color: #b6b6b6;
  width: 10rem;
  height: 2rem;
  &:hover {
    background-color: #ecebeb;
    border: none;
  }
  cursor: pointer;
`;

const LinkButton: React.FC<{ path: string }> = ({ path }) => {
  return <SLink to={path}>{path} 링크 📌</SLink>;
};

export default LinkButton;
