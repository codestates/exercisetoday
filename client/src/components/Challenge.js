import styled from "styled-components";
import img from "./photo.png";

import "./Challenge.css";
const Challenge = () => {
  const ChallengeContainer = styled.div`
    display: flex;
    align-items: center;
    margin-top: 2rem;
    height: 50vh;
  `;

  const ChallengeContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-right: 2rem;
    background-image: url(${img});
    background-repeat: no-repeat;
    background-size: cover;
    background-color: #003150;
    width: 60%;
    height: 100%;
  `;
  const ChallengeText = styled.div`
    color: rgb(255, 255, 255);
    font-size: 3rem;
  `;
  return (
    <>
      <ChallengeContainer>
        <ChallengeContent>
          <ChallengeText> 30분 데일리 러닝 챌린지 </ChallengeText>
          <button className="seeMoreBtn">더보기</button>
        </ChallengeContent>
      </ChallengeContainer>
      <ChallengeContainer></ChallengeContainer>
    </>
  );
};

export default Challenge;
