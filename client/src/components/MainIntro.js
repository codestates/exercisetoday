import styled from "styled-components";
import img from "./image/main.jpeg";

const MainIntroContainer = styled.div`
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

const MainIntroBack = styled.div`
  position: relative;
  display: flex;
  align-items: flex-end;
  margin-top: 5rem;
  width: 100%;
  height: 40vh;
  background-color: rgb(255, 0, 0);
  background-image: url(${img});
  background-repeat: no-repeat;
  background-size: cover;
  :hover {
    filter: brightness(90%);
    -webkit-transition: all 0.1s ease-in-out;
    -moz-transition: all 0.1s ease-in-out;
    -ms-transition: all 0.1s ease-in-out;
    -o-transition: all 0.1s ease-in-out;
    transition: all 0.1s ease-in-out;
  }
`;


const MainIntro = () => {

  return (
    <MainIntroContainer>
      <MainIntroBack>
        <IntroText>
          <p />
          운동 라이프를 즐기는 당신을 위한,
          <p />
          건강하고 즐거운 일상 속 운동 라이프 디자이너
        </IntroText>
      </MainIntroBack>
    </MainIntroContainer>
  );
};

export default MainIntro;
