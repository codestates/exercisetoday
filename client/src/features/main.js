import { useState } from "react";
import styled from "styled-components";
import img from "./mainphoto.png";
const Main = () => {
  const MainSideColor = styled.div``;
  const IntroContainer = styled.div`
    color: tomato;
    margin-top: 50px;
    width: 100vw;
    height: 30vh;
    border: 1px solid black;
  `;

  return (
    <>
      <IntroContainer>
        "건강하고 즐거운 일상 속 운동 라이프 디자이너"
      </IntroContainer>
    </>
  );
};

export default Main;
