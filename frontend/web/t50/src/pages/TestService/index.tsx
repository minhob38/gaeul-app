/** @jsxImportSource @emotion/react */

import Header from "@components/common/Header";
import Content from "@components/common/Content";
import Scroll from "@components/common/Scroll";
import { useTypedDispatch, useTypedSelector } from "@hooks/useStore";
import Side from "@components/common/Side";
import * as fonts from "@constants/fonts";
import * as colors from "@constants/colors";
import * as size from "@constants/size";
import styled from "styled-components";
import { actions as testActions } from "@store/slices/testSlice";

const Wrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: start;
  padding: 0 0 0 20px;
`;

const Text = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0 10px 0;
  font: ${fonts.FONT_MEDIUM_400};
  color: ${colors.BLACK_1};
  text-align: center;
`;

const QuestionInput = styled.input`
  all: unset;
  width: calc(100% - 35px - 35px);
  height: 40px;
  /* text-align: center; */
  border: 1px solid ${colors.GRAY_3};
  border-radius: ${size.BORDER_RADIUS_1};
  background-color: ${colors.WHITE_1};
  font: ${fonts.FONT_SMALL_400};
`;

const AnswerBox = styled.input`
  width: calc(100% - 35px - 35px);
  height: 40px;
  /* text-align: center; */
  border: 1px solid ${colors.GRAY_3};
  border-radius: ${size.BORDER_RADIUS_1};
  background-color: ${colors.WHITE_1};
  font: ${fonts.FONT_SMALL_400};
`;

const QuestionButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 40px;
  margin: 10px 0 0 0;
  border-radius: ${size.BORDER_RADIUS_1};
  background-color: ${colors.BLACK_1};
  font: ${fonts.FONT_SMALL_400};
  color: ${colors.WHITE_1};
  cursor: pointer;
`;

const TestService = () => {
  const sideWidth = useTypedSelector((state) => state.rootReducer.viewReducer.sideWidth);
  const question = useTypedSelector((state) => state.rootReducer.testReducer.question);

  const dispatch = useTypedDispatch();
  const handleQuestionChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(testActions.textInput(ev.target));
  };

  return (
    <>
      <Header title="테스트" mode="service"></Header>
      <Side width={sideWidth} />
      <Content left={sideWidth} top={size.HEADER_HEIGHT} bottom="0">
        <Scroll direction="y" height={`calc(100% - 0px)`}>
          <Wrapper>
            <Text>질문</Text>
            <QuestionInput name="question" value={question || ""} onChange={handleQuestionChange} />
            <QuestionButton>질문하기</QuestionButton>
            <Text>답변</Text>
            <AnswerBox />
          </Wrapper>
          {/* <Input name="answer" value={question} onChange={handleQuestionChange} /> */}
        </Scroll>
      </Content>
    </>
  );
};

export default TestService;
