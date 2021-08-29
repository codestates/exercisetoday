import React, { useState } from "react";
import styled from "styled-components";

const ChallengeButton = styled.button`
  margin: 20px 1.5%;
  width: 80px;
  height: 80px;
  color: white;
  background: ${props =>
    props.isClick ? "rgba(209, 0, 43, 1)" : "rgba(93, 0, 224, 1)"};
  font-size: 16px;
  font-family: Georgia;
  font-weight: bold;
  border: none;
  border-radius: 50px;
  box-shadow: 0 4px 20px
    ${props =>
      props.isClick ? "rgba(209, 0, 43, 0.5)" : "rgba(93, 0, 224, 0.5)"};
  :hover {
    background: ${props =>
      props.isClick ? "rgba(93, 0, 224, 1)" : "rgba(209, 0, 43, 1)"};
    cursor: pointer;
  }
`;
const ChallengeButtonContainer = styled.article`
  margin: 7% 15%;
  border: 2px solid rgb(70, 12, 242);
  text-align: center;
  background: ${props =>
    props.join === "챌린지 도전 하기"
      ? "rgba(230, 230, 230, 0.6)"
      : "rgba(30, 12, 242, 0.1)"};
`;

const ChallengeRecommend = styled.div`
  font-family: Georgia, Serif;
  font-size: 28px;
`;

const arr = [
  { buttonId: 0, isFinished: true },
  { buttonId: 1, isFinished: false },
  { buttonId: 2, isFinished: true },
  { buttonId: 3, isFinished: false },
  { buttonId: 4, isFinished: false },
  { buttonId: 5, isFinished: true },
];

const ChallengeButtons = ({ join }) => {
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
      <ChallengeButtonContainer join={join}>
        {join === "챌린지 도전 하기" ? (
          <ChallengeRecommend>
            "챌린지 도전 하기" 버튼을 눌러 시작
          </ChallengeRecommend>
        ) : (
          buttonList.map(button => {
            return (
              <ChallengeButton
                key={button.buttonId}
                onClick={buttonClick(button.buttonId)}
                isClick={button.isFinished}
              >
                {button.buttonId + 1} 일차
              </ChallengeButton>
            );
          })
        )}
      </ChallengeButtonContainer>
    </>
  );
};

export default ChallengeButtons;
