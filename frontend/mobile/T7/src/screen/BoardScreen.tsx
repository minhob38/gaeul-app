import React from 'react';
import styled from 'styled-components/native';
import {FONT_MEDIUM_600, FONT_SMALL_400} from '../constant/font';
import {FlatList, View} from 'react-native';
import Post from '../component/Post';

const PostWrapper = styled.View`
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

// const BoardScreen: React.FC = () => {
//   return (
//     <View>
//       <Post />
//       <Post />
//       <Post />
//       <Post />
//       <Post />
//       <Post />
//       <Post />
//       <Post />
//       <Post />
//     </View>
//   );
// };

const DATA = new Array(10);

const BoardScreen: React.FC = () => {
  const renderItem = ({item}) => <Post />; // Post 컴포넌트가 title prop을 받는다고 가정

  return (
    <FlatList
      data={DATA}
      renderItem={renderItem}
      // keyExtractor={item => item.id}
      // contentContainerStyle={{padding: 16}} // 추가 스타일이 필요할 경우 설정
    />
  );
};

export default BoardScreen;
