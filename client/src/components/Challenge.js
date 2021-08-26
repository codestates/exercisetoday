import styled from "styled-components";
import img from "./image/running.jpeg";
import imgSec from "./image/climbing.jpeg";
import imgThr from "./image/homeworkout.jpeg";
import imgFo from "./image/bicycle.jpeg";

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
  const ChallengeContentSec = styled.div`
    background-image: url(${imgSec});
    background-repeat: no-repeat;
    background-size: cover;
    background-color: #003150;
    width: 40%;
    height: 100%;
  `;
  const ChallengeContentThr = styled.div`
    background-image: url(${imgThr});
    width: 35%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    margin-right: 2rem;
  `;
  const ChallengeContentFo = styled.div`
    background-image: url(${imgFo});
    width: 65%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: cover;
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
        <ChallengeContentSec>ddddd</ChallengeContentSec>
      </ChallengeContainer>
      <ChallengeContainer>
        <ChallengeContentThr />
        <ChallengeContentFo />
      </ChallengeContainer>
    </>
  );
};

export default Challenge;
