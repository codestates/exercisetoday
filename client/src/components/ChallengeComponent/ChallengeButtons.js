import React, { useState } from "react";
import styled from "styled-components";

const ChallengeButton = styled.button`
  margin: 20px 1.5%;
  width: 80px;
  height: 80px;
  color: white;
  background: ${props =>
    props.isClick ? "rgba(209, 0, 43, 1)" : "rgba(0, 79, 255, 1)"};
  font-size: 16px;
  border: none;
  border-radius: 50px;
  box-shadow: 0 4px 20px
    ${props =>
      props.isClick ? "rgba(209, 0, 43, 0.5)" : "rgba(0, 79, 255, 0.5)"};
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

const arr = [
  { buttonId: 0, isFinished: true },
  { buttonId: 1, isFinished: false },
  { buttonId: 2, isFinished: true },
  { buttonId: 3, isFinished: false },
  { buttonId: 4, isFinished: false },
  { buttonId: 5, isFinished: true },
];

const ChallengeButtons = () => {
  const [buttonList, setButtonList] = useState(arr);

  const buttonClick = key => () => {
    setButtonList(prevState => {
      return prevState.map(button => {
        if (button.buttonId === key) {
          return { buttonId: key, isFinished: !button.isFinished };
        }
        return button;
      });
    });
  };

  return (
    <>
      <ChallengeButtonContainer>
        {buttonList.map(button => {
          return (
            <ChallengeButton
              key={button.buttonId}
              onClick={buttonClick(button.buttonId)}
              isClick={button.isFinished}
            >
              {button.buttonId + 1} 일차
            </ChallengeButton>
          );
        })}
      </ChallengeButtonContainer>
    </>
  );
};

export default ChallengeButtons;
