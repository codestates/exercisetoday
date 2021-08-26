import { useState } from "react";
import styled from "styled-components";
import img from "./image/running.jpeg";
import imgSec from "./image/climbing.jpeg";
import imgThr from "./image/homeworkout.jpeg";
import imgFo from "./image/bicycle.jpeg";
//import Modal from "./Modal";
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
  > .seeMoreBtn {
    text-align: center;
    background-color: transparent;
    text-decoration: none;
    border: 1px solid rgb(255, 255, 255);
    padding: 20px;
    width: 150px;
    color: rgb(255, 255, 255);
    cursor: grab;
    :hover {
      background-color: rgb(55, 53, 20);
    }
  }
`;
const ChallengeContentSec = styled.div`
  padding-left: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-image: url(${imgSec});
  background-repeat: no-repeat;
  background-size: cover;
  background-color: #003150;
  width: 40%;
  height: 100%;
  > .seeMoreBtnRight {
    text-align: center;
    background-color: transparent;
    text-decoration: none;
    border: 1px solid rgb(255, 255, 255);
    padding: 20px;
    width: 150px;
    color: rgb(255, 255, 255);
    cursor: grab;
    :hover {
      background-color: rgb(0, 0, 0);
    }
  }
`;
const ChallengeContentThr = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url(${imgThr});
  width: 35%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  margin-right: 2rem;
  > .seeMoreBtnRight {
    text-align: center;
    background-color: transparent;
    text-decoration: none;
    border: 1px solid rgb(255, 255, 255);
    padding: 20px;
    width: 150px;
    color: rgb(255, 255, 255);
    cursor: grab;
    :hover {
      background-color: rgb(80, 20, 10);
    }
  }
`;
const ChallengeContentFo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url(${imgFo});
  width: 65%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  > .seeMoreBtnRight {
    text-align: center;
    background-color: transparent;
    text-decoration: none;
    border: 1px solid rgb(255, 255, 255);
    padding: 20px;
    width: 150px;
    color: rgb(255, 255, 255);
    cursor: grab;
    :hover {
      background-color: rgb(150, 90, 10);
    }
  }
`;
const ChallengeText = styled.div`
  color: rgb(255, 255, 255);
  font-size: 3rem;
`;

const Challenge = () => {
  return (
    <>
      <ChallengeContainer>
        <ChallengeContent>
          <ChallengeText>30분 데일리 러닝 챌린지</ChallengeText>
          <button className="seeMoreBtn">더보기</button>
        </ChallengeContent>

        <ChallengeContentSec>
          <ChallengeText>
            위캔드
            <p /> 클라이밍 챌린지
          </ChallengeText>
          <button className="seeMoreBtnRight">더보기</button>
        </ChallengeContentSec>
      </ChallengeContainer>
      <ChallengeContainer>
        <ChallengeContentThr>
          <ChallengeText>하드코어 홈트레이닝 챌린지</ChallengeText>
          <button className="seeMoreBtnRight">더보기</button>
        </ChallengeContentThr>
        <ChallengeContentFo>
          <ChallengeText>자전거 출·퇴근 챌린지</ChallengeText>
          <button className="seeMoreBtnRight">더보기</button>
        </ChallengeContentFo>
      </ChallengeContainer>
    </>
  );
};

export default Challenge;
