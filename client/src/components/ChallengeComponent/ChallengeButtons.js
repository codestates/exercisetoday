import React, { useState } from "react";
import styled from "styled-components";

const ChallengeButton = styled.button`
  margin: 20px 1.5%;
  width: 80px;
  height: 80px;
  color: white;
  background: #004fff;
  font-size: 16px;
  border: none;
  border-radius: 50px;
  box-shadow: 0 4px 20px rgba(0, 79, 255, 0.5);
  :hover {
    background: rgb(209, 0, 43);
    cursor: pointer;
  }
`;
const ChallengeButtonContainer = styled.article`
  margin: 7% 15%;
  border: 1px solid;
  text-align: center;
`;

const ChallengeButtons = () => {
  return (
    <>
      <ChallengeButtonContainer>
        {[...Array(10)].map((_, index) => {
          return <ChallengeButton>{index + 1} 주차</ChallengeButton>;
        })}
      </ChallengeButtonContainer>
    </>
  );
};

export default ChallengeButtons;
