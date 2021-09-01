import styled from "styled-components";
import { useState } from "react";
import imgRun from "../image/running.jpeg";
import imgClim from "../image/climbing.jpeg";
import imgHomeWorkout from "../image/homeworkout.jpeg";
import imgByc from "../image/bicycle.jpeg";

const OngoingPhoto = styled.div`
  background-image: url(${(props) => (props.photo ? props.photo : null)});
  background-repeat: no-repeat;
  background-size: cover;
  width: inherit;
  height: inherit;
`;
const ChallContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 50%;
  height: 220px;
  border: 2px solid;
  border-color: rgba(255, 255, 255, 0.5);
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2), 0 6px 6px rgba(0, 0, 0, 0.25);
  :hover {
    filter: brightness(90%);
  }
`;

const PhotoContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 250px;
`;

const OngoingText = styled.div`
  font-size: 1.2rem;
  margin-left: 30px;
`;

const OngoingContainer = styled.div`
  width: 100%;
`;

const OngoingTitle = styled.div`
  margin-left: 50px;
  width: 100%;
  color: rgba(0, 49, 80, 0.3);
  font-size: 4.3rem;
`;
const NoDataText = styled.div`
  margin-top: 1rem;
  height: 15rem;
  font-size: 2rem;
  color: rgba(0, 0, 0, 0.6);
  text-align: center;
`;

const OngoingChallenge = ({ challengeList }) => {
  const [photoList] = useState([imgRun, imgClim, imgHomeWorkout, imgByc]);
  return (
    <OngoingContainer>
      <OngoingTitle>현재 진행중인 챌린지</OngoingTitle>

      {challengeList !== null ? (
        challengeList?.map((el) => {
          return (
            <PhotoContainer key={el.challenge_name}>
              <ChallContent key={el.progress_rate.toString()}>
                <OngoingPhoto
                  key={el.challenge_desc}
                  photo={photoList[el.challenge_id - 1]}
                ></OngoingPhoto>
                <OngoingText key={el.challenge_id.toString()}>
                  {el.challenge_name}
                </OngoingText>
              </ChallContent>
            </PhotoContainer>
          );
        })
      ) : (
        <NoDataText>{"진행중인 챌린지가 없습니다.."}</NoDataText>
      )}
    </OngoingContainer>
  );
};

export default OngoingChallenge;
