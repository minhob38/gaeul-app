import React from 'react';
import styled from 'styled-components/native';
import {FONT_MEDIUM_600, FONT_SMALL_400} from '../constant/font';

const PostWrapper = styled.TouchableOpacity`
  width: 100%;
  height: 150px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 0 10px 0 10px;
`;

const PostContainer = styled.View`
  width: 100%;
  height: 100%;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const NationFlagImage = styled.Image`
  border-radius: 10px;
  width: 100px;
  height: 100px;
`;

const TextContainer = styled.View`
  margin: 0 0 0 20px;
`;

const Title = styled.Text`
  font-size: ${FONT_MEDIUM_600.fontSize}px;
  line-height: ${FONT_MEDIUM_600.lineHeight}px;
  font-weight: ${FONT_MEDIUM_600.fontWeight};
  font-family: ${FONT_MEDIUM_600.fontFamily};
`;

const Description = styled.Text`
  font-size: ${FONT_SMALL_400.fontSize}px;
  line-height: ${FONT_SMALL_400.lineHeight}px;
  font-weight: ${FONT_SMALL_400.fontWeight};
  font-family: ${FONT_SMALL_400.fontFamily};
`;

const StyledLine = styled.View`
  height: 1px;
  background-color: #000;
  width: 100%;
`;

const Post: React.FC = () => {
  return (
    <PostWrapper onPress={() => console.log('@@@ hello')}>
      <PostContainer>
        <NationFlagImage
          source={{
            uri: 'https://github.com/user-attachments/assets/23b1340c-1eeb-43eb-a732-5b6a4f4956fe',
          }}
        />
        <TextContainer>
          <Title>자연사박물관 동행 구합니다.</Title>
          <Description>뉴욕</Description>
          <Description>자연사박물관</Description>
          <Description>2024/11/2</Description>
          <Description>여자만</Description>
          <Description>인원</Description>
        </TextContainer>
      </PostContainer>
      <StyledLine />
    </PostWrapper>
  );
};

export default Post;
