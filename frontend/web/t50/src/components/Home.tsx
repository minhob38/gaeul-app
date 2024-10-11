import React from "react";
import styled from "styled-components";

const HomeContainer = styled.div`
  width: 5rem;
  height: 5rem;
  background-color: #b8f5f5;
  font: normal bold 16px / 24x Noto Sans CJK KR;
`;

const Home: React.FC = () => {
  return <HomeContainer>Home 🏠</HomeContainer>;
};

export default Home;
