import React, { useState } from "react";
import styled from "styled-components";

const ChallengeButton = styled.button`
  margin: 20px 1.5%;
  width: 80px;
  height: 80px;
  color: ${props =>
    props.isClick ? "rgb(172, 176, 200)" : "rgb(122, 126, 170)"};
  background: ${props => (props.isClick ? "rgba(21, 0, 130, 1)" : "white")};
  font-size: 16px;
  font-family: Georgia;
  font-weight: bold;
  border: none;
  border-radius: 50px;
  box-shadow: 0 4px 15px rgba(93, 0, 224, 0.4);
  :hover {
    cursor: pointer;
  }
`;

const PercentContainer = styled.div`
  text-align: right;
`;

const ChallengePercent = styled.span`
  border: none;
  padding: 5px;
  font-family: "Times New Roman", Times, serif;
  border-radius: 4px;
  width: auto;
  margin: 1%;
  font-size: 25px;
  font-weight: 550;
`;

const ChallengeButtonContainer = styled.article`
  margin: 7% 15%;
  border: none;
  background: ${props => (props.join ? "white" : "rgba(75, 151, 251, 0.3)")};
  text-align: center;
  border-radius: 1rem;
`;

const ChallengeName = styled.div`
  text-align: center;
  margin: 1%;
  padding: 0.3%;
  font-size: 30px;
  font-weight: bold;
  border: 5px solid rgba(8, 48, 120, 1);
  border-left-style: none;
  border-right-style: none;
`;

const ChallengeJoinButton = styled.button`
  width: 35%;
  height: 100%;
  font-size: 40px;
  font-family: "Lucida" Grande, sans-serif;
  color: white;
  background: rgba(8, 51, 130, 1);
  :hover {
    background: rgba(16, 24, 117, 1);
    cursor: pointer;
  }
`;

const CongratsContainer = styled.div`
  height: 100%;
  text-align: center;
`;

const Message = styled.img`
  width: 50rem;
`;

const arr = [
  { buttonId: 0, isFinished: true },
  { buttonId: 1, isFinished: false },
  { buttonId: 2, isFinished: true },
  { buttonId: 3, isFinished: false },
  { buttonId: 4, isFinished: false },
  { buttonId: 5, isFinished: true },
];

const ChallengeButtons = ({ join, handleJoin }) => {
  const [buttonList, setButtonList] = useState(arr);
  const [percent, setPercent] = useState(
    (arr.reduce((acc, cur) => acc + cur.isFinished, 0) / arr.length) * 100
  );

  const buttonClick = key => () => {
    handlePercent(key);
    setButtonList(prevState => {
      return prevState.map(button => {
        if (button.buttonId === key.buttonId) {
          return { buttonId: key.buttonId, isFinished: !button.isFinished };
        }
        return button;
      });
    });
  };

  const handlePercent = button => {
    let num = 1;
    if (button.isFinished) {
      num = -1;
    }
    setPercent(prevState => {
      return prevState + (num / arr.length) * 100;
    });
  };

  return (
    <>
      <ChallengeName>/챌린지 이름/ 챌린지에 오신것을 환영합니다</ChallengeName>
      {join ? null : (
        <PercentContainer>
          <ChallengePercent>진행도: {Math.round(percent)}%</ChallengePercent>
        </PercentContainer>
      )}
      {Math.round(percent) === 100 ? (
        <CongratsContainer>
          <Message src={"/pngwing.com.png"} />
        </CongratsContainer>
      ) : (
        <ChallengeButtonContainer join={join}>
          {join ? (
            <ChallengeJoinButton onClick={handleJoin}>
              챌린지 도전
            </ChallengeJoinButton>
          ) : (
            buttonList.map(button => {
              return (
                <ChallengeButton
                  key={button.buttonId}
                  onClick={buttonClick(button)}
                  isClick={button.isFinished}
                >
                  {button.buttonId + 1} 일차
                </ChallengeButton>
              );
            })
          )}
        </ChallengeButtonContainer>
      )}
    </>
  );
};

export default ChallengeButtons;
