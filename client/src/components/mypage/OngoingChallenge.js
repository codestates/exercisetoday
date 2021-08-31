import styled from "styled-components";
import { useState } from "react";
import img from "../image/running.jpeg";
import imgSec from "../image/climbing.jpeg";
import imgThr from "../image/homeworkout.jpeg";
import imgFo from "../image/bicycle.jpeg";

const OngoingBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const OngoingChallPhoto = styled.div`
  background-image: url(${(props) => (props.photo ? props.photo : null)});
  background-repeat: no-repeat;
  background-size: cover;
  border: 2px solid black;
  margin-left: 2.5rem;
  width: 30vw;
  height: 18rem;
  cursor: grab;
  :hover {
    filter: brightness(90%);
    -webkit-transition: all 0.1s ease-in-out;
    -moz-transition: all 0.1s ease-in-out;
    -ms-transition: all 0.1s ease-in-out;
    -o-transition: all 0.1s ease-in-out;
    transition: all 0.1s ease-in-out;
    // transform: scale(1.5, 1.5);
  }
  //max-width: 100%;
`;

const PhotoContainer = styled.div`
  height: 20rem;
`;

const OngoingText = styled.div`
  margin-left: 2.5rem;
  font-size: 1.2rem;
`;

const OngoingContainer = styled.div`
  display: flex;
`;

const OngoingChallenge = () => {
  const [photoList, setPhotoList] = useState([img, imgSec, imgThr, imgFo]);
  return (
    <>
      <OngoingContainer>
        <OngoingBlock>
          <OngoingText>30분 데일리 러닝 챌린지</OngoingText>
          <PhotoContainer>
            <OngoingChallPhoto photo={photoList[0]}></OngoingChallPhoto>
          </PhotoContainer>
        </OngoingBlock>
        <OngoingBlock>
          <OngoingText>위캔드 클라이밍 챌린지</OngoingText>
          <PhotoContainer>
            <OngoingChallPhoto photo={photoList[1]}></OngoingChallPhoto>
          </PhotoContainer>
        </OngoingBlock>
      </OngoingContainer>
      <OngoingContainer>
        <OngoingBlock>
          <OngoingText>하드코어 홈트레이닝 챌린지</OngoingText>
          <PhotoContainer>
            <OngoingChallPhoto photo={photoList[2]}></OngoingChallPhoto>
          </PhotoContainer>
        </OngoingBlock>
        <OngoingBlock>
          <OngoingText>자전거 출·퇴근 챌린지</OngoingText>
          <PhotoContainer>
            <OngoingChallPhoto photo={photoList[3]}></OngoingChallPhoto>
          </PhotoContainer>
        </OngoingBlock>
      </OngoingContainer>
    </>
  );
};

export default OngoingChallenge;
