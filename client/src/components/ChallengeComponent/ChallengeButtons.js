import axios from "axios";
import React, { useState, useEffect } from "react";
import { ReactComponent as Thumb } from "../../svgs/thumbs-up-regular.svg";
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

const PercentContainer = styled.section`
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
  margin: 4% 19%;
  border: none;
  background: ${props => (props.join ? "rgba(75, 151, 251, 0.3)" : "white")};
  text-align: center;
  border-radius: 1rem;
`;

const ChallengeName = styled.h1`
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

const LikeButton = styled.button`
  margin-left: auto;
  background: white;
  border: none;
`;

const LikeCount = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const ThumbIcon = styled(Thumb)`
  border: 0;
  outline: 0;
  color: ${props => (props.progressLike ? "rgba(75, 81, 251, 1)" : "black")};
  :hover {
    cursor: pointer;
  }
  width: 60px;
`;

const LikeButtonContainer = styled.section`
  text-align: right;
  padding: 1%;
`;

const ChallengeDesc = styled.h3`
  font-family: serif cursive;
  margin: 2% 10%;
  font-size: 20px;
  text-align: center;
`;

const ChallengeButtons = ({ challengeInfo }) => {
  const {
    progress_id,
    user_id,
    challenge_id,
    challenge_name,
    challenge_desc,
    progress_rate,
    progress_buttons,
    liked,
    challenge_likes,
  } = challengeInfo;
  const [likeCount, setLikeCount] = useState(challenge_likes);
  const [progressLike, setProgressLike] = useState(liked);
  const [buttonList, setButtonList] = useState(progress_buttons);
  const [percent, setPercent] = useState(progress_rate);
  const [join, setJoin] = useState(false);

  console.log(challengeInfo);

  const handleJoin = () => {
    setJoin(!join);

    axios({
      method: "POST",
      url: "http://ec2-3-36-51-146.ap-northeast-2.compute.amazonaws.com/challenge/progressrate",
      data: { challenge_id, user_id },
    }).catch(err => console.log("Post progressrate err", err));
  };

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
      return prevState + (num / buttonList.length) * 100;
    });
  };

  const clickLikeButton = () => {
    if (progressLike) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setProgressLike(!progressLike);
  };

  useEffect(() => {
    axios({
      method: "PUT",
      url: `http://ec2-3-36-51-146.ap-northeast-2.compute.amazonaws.com/challenge/progressrate`,
      data: {
        user_id,
        challenge_id,
        progress_buttons: buttonList,
        process_rate: percent,
        liked: progressLike,
      },
    }).catch(err => {
      console.log("Put Progressrate err", err);
    });
  }, [buttonList, likeCount]);

  return (
    <>
      <ChallengeName>{challenge_name}에 오신것을 환영합니다</ChallengeName>
      <ChallengeDesc>{challenge_desc}</ChallengeDesc>
      {join && progress_id ? (
        <PercentContainer>
          <ChallengePercent>진행도: {Math.round(percent)}%</ChallengePercent>
        </PercentContainer>
      ) : null}
      {Math.round(percent) === 100 ? (
        <CongratsContainer>
          <Message src={"/pngwing.com.png"} />
        </CongratsContainer>
      ) : (
        <ChallengeButtonContainer join={join}>
          {join && progress_id ? (
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
          ) : (
            <ChallengeJoinButton onClick={handleJoin}>
              챌린지 도전
            </ChallengeJoinButton>
          )}
        </ChallengeButtonContainer>
      )}
      <LikeButtonContainer>
        <LikeButton>
          <ThumbIcon onClick={clickLikeButton} progressLike={progressLike} />
        </LikeButton>
        <LikeCount>좋아요: {likeCount}개</LikeCount>
      </LikeButtonContainer>
    </>
  );
};

export default ChallengeButtons;
