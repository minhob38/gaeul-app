/** @jsxImportSource @emotion/react */

import Header from "@components/common/Header";
import Content from "@components/common/Content";
import Scroll from "@components/common/Scroll";
import * as size from "@constants/size";
import { useTypedDispatch, useTypedSelector } from "@hooks/useStore";
import Side from "@components/common/Side";

const TodoService = () => {
  const sideWidth = useTypedSelector((state) => state.rootReducer.viewReducer.sideWidth);

  return (
    <>
      <Header title="할일 목록" mode="service"></Header>
      <Side width={sideWidth} />
      <Content left={sideWidth} top={size.HEADER_HEIGHT} bottom="0">
        <Scroll direction="y" height={`calc(100% - 0px)`}>
          Todo
        </Scroll>
      </Content>
    </>
  );
};

export default TodoService;
