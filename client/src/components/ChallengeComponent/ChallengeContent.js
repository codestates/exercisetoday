import React, { useState } from "react";
import styled from "styled-components";

const ChallengeName = styled.div`
  text-align: center;
  margin: 1%;
  padding: 0.3%;
  font-size: 30px;
  font-weight: bold;
  border: 5px solid #150bd9;
  border-left-style: none;
  border-right-style: none;
`;

const ButtonContiner = styled.article``;

const ChallengeJoinButton = styled.button`
  margin: 1%;
  padding: 0.3%;
  font-size: 20px;
  font-family: "Lucida" Grande, sans-serif;
  color: white;
  background: ${props =>
    props.isJoin === "챌린지 도전 하기"
      ? "rgba(8, 51, 130, 1)"
      : "rgba(189, 32, 48, 1)"};
  border-radius: 10px;
  float: right;
  :hover {
    background: ${props =>
      props.isJoin === "챌린지 도전 하기"
        ? "rgba(16, 24, 117, 1)"
        : "rgba(165, 27, 27, 1)"};
    cursor: pointer;
  }
`;

const ChallengeContent = ({ join, handleJoin }) => {
  return (
    <>
      <ChallengeName>/챌린지 이름/ 챌린지에 오신것을 환영합니다</ChallengeName>
      <ButtonContiner>
        <ChallengeJoinButton onClick={handleJoin} isJoin={join}>
          {join}
        </ChallengeJoinButton>
      </ButtonContiner>
    </>
  );
};

export default ChallengeContent;
