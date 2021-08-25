import { useState } from "react";
import styled from "styled-components";
import img from "./image/main.jpeg";
const Main = () => {
  const MainContainer = styled.div`
    position: relative;
    height: 50vh;
  `;

  const IntroText = styled.div`
    font-size: 1rem;
    color: white;
    margin-left: 30px;
    margin-bottom: 50px;
    line-height: 2.5rem;
    border-bottom: 2px solid rgba(255, 255, 255, 0.6);
  `;
  const IntroContainer = styled.div`
    position: relative;
    display: flex;
    align-items: flex-end;
    margin-top: 5rem;
    width: 100vw;
    height: 40vh;
    border: 1px solid black;
    background-color: rgb(255, 0, 0);
    background-image: url(${img});
    background-repeat: no-repeat;
    background-size: cover;
    /* :not(:disabled) {
      cursor: pointer;
    } */
    :hover {
      filter: brightness(90%);
    }
  `;

  return (
    <MainContainer>
      <IntroContainer>
        <IntroText>
          <p />
          운동 라이프를 즐기는 당신을 위한,
          <p />
          건강하고 즐거운 일상 속 운동 라이프 디자이너
        </IntroText>
      </IntroContainer>
    </MainContainer>
  );
};

export default Main;
