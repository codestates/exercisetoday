import styled from "styled-components";
import { useState } from "react";
import imgRun from "../image/running.jpeg";
import imgClim from "../image/climbing.jpeg";
import imgHomeWorkout from "../image/homeworkout.jpeg";
import imgByc from "../image/bicycle.jpeg";

const OngoingChallPhoto = styled.div`
  background-image: url(${(props) => (props.photo ? props.photo : null)});
  background-repeat: no-repeat;
  background-size: cover;
  border: 2px solid black;
  width: 15vw;
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
  background-color: black;
  height: 20rem;
`;

const OngoingText = styled.div`
  font-size: 1.2rem;
`;

const OngoingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1%;
`;

const OngoingChallenge = ({ challengeList }) => {
  console.log("challengeList ------- >>", challengeList);
  const [photoList, setPhotoList] = useState([
    imgRun,
    imgClim,
    imgHomeWorkout,
    imgByc,
  ]);
  let dummy = ["라라라", "김말덕", "황항목", "최팔진"];
  return (
    <>
      {photoList.map((e, i) => {
        return (
          <>
            <OngoingContainer>
              <OngoingText>{dummy[i]}</OngoingText>
              <PhotoContainer>
                <OngoingChallPhoto photo={photoList[i]}></OngoingChallPhoto>
              </PhotoContainer>
            </OngoingContainer>
          </>
        );
      })}
    </>
  );
};

export default OngoingChallenge;
