import { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import img from "./image/running.jpeg";
import imgSec from "./image/climbing.jpeg";
import imgThr from "./image/homeworkout.jpeg";
import imgFo from "./image/bicycle.jpeg";
import { useHistory } from "react-router-dom";
import LoginModal from "./LoginModal";

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
`;
const SeeMoreBtn = styled.button`
  text-align: center;
  background-color: transparent;
  text-decoration: none;
  border: 1px solid rgb(255, 255, 255);
  padding: 20px;
  width: 150px;
  color: rgb(255, 255, 255);
  cursor: grab;
  :hover {
    background-color: #${(props) => props.color};
    -webkit-transition: all 0.1s ease-in-out;
    -moz-transition: all 0.1s ease-in-out;
    -ms-transition: all 0.1s ease-in-out;
    -o-transition: all 0.1s ease-in-out;
    transition: all 0.1s ease-in-out;
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
`;

const ChallengeText = styled.div`
  color: rgb(255, 255, 255);
  font-size: 3rem;
`;

const Challenge = ({ isLogin, handleChallengeInfo, userData }) => {
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const history = useHistory();
  const handleToChallenge = (id) => {
    if (!isLogin) {
      setLoginModalVisible(true);
      return;
    }

    axios({
      mehtod: "GET",
      url: `http://ec2-3-36-51-146.ap-northeast-2.compute.amazonaws.com/challenge/progressrate?challenge_id=${id}&user_id=${userData.user_id}`,
    })
      .then((res) => {
        if (res.data.message === "ok") {
          handleChallengeInfo(res.data.data);
          history.push("/challenge");
        } else {
          console.log("Challenge Progress Error", res.data.message);
        }
      })
      .catch((err) => console.log("Challenge Progress Error", err));
  };

  return (
    <>
      <ChallengeContainer>
        <ChallengeContent>
          <ChallengeText>30분 데일리 러닝 챌린지</ChallengeText>
          <SeeMoreBtn onClick={() => handleToChallenge(1)} color={373514}>
            더보기
          </SeeMoreBtn>
          <LoginModal
            visible={loginModalVisible}
            setVisible={setLoginModalVisible}
          />
        </ChallengeContent>
        <ChallengeContentSec>
          <ChallengeText>
            위캔드
            <p /> 클라이밍 챌린지
          </ChallengeText>
          <SeeMoreBtn onClick={() => handleToChallenge(2)} color={"023c63"}>
            더보기
          </SeeMoreBtn>
        </ChallengeContentSec>
      </ChallengeContainer>
      <ChallengeContainer>
        <ChallengeContentThr>
          <ChallengeText>하드코어 홈트레이닝 챌린지</ChallengeText>
          <SeeMoreBtn onClick={() => handleToChallenge(3)} color={"50150a"}>
            더보기
          </SeeMoreBtn>
        </ChallengeContentThr>
        <ChallengeContentFo>
          <ChallengeText>자전거 출·퇴근 챌린지</ChallengeText>
          <SeeMoreBtn onClick={() => handleToChallenge(4)} color={966018}>
            더보기
          </SeeMoreBtn>
        </ChallengeContentFo>
      </ChallengeContainer>
    </>
  );
};

export default Challenge;
