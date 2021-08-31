import { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import kakao from "./image/kakao.png";

const Container = styled.div`
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.45);
  position: fixed;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  pointer-events: ${(props) => (props.visible ? "initial" : "none")};
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 9999;
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 40rem;
  height: 22rem;
  padding-top: 60px;
  background-color: rgba(255, 255, 255, 0.95);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2), 0 6px 6px rgba(0, 0, 0, 0.25);
  border-radius: 0.8rem;
  transition: all 0.2s ease;
  > .input {
    margin-top: 18px;
    width: 355px;
    height: 32px;
  }
  > .exit {
    font-size: 25px;
    color: rgba(0, 0, 0, 0.6);
    margin-top: 10px;
    position: absolute;
    border-radius: 50%;
    top: 0;
    cursor: grab;
    :hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
  }
  > span {
    position: absolute;
    top: 10%;
    color: #003150;
    margin-bottom: 50px;
  }
`;

const ModalBtn = styled.button`
  margin-top: 20px;
  background-color: #003150;
  text-decoration: none;
  border: none;
  width: 360px;
  height: 40px;
  color: white;
  cursor: grab;
  :hover {
    opacity: 0.9;
  }
`;

// const ModalLogin = styled.div`
//   width: 100%;
//   border-radius: 0.8rem;
//   cursor: grab;
//   :hover {
//     background-color: rgba(0, 0, 0, 0.1);
//   }
// `;
const BorderBottom = styled.div`
  position: absolute;
  margin-top: 30%;
  width: 56%;
  border-bottom: 1px solid;
  border-color: rgba(0, 0, 0, 0.2);
`;
const SocialLogin = styled.div`
  display: flex;
  flex-direction: column;
  > .socialBtn {
    /* background-image: url(${kakao});
    background-repeat: no-repeat;
    background-size: contain; */
    background-color: rgb(255, 232, 18);
    border: none;
    margin-top: 40px;
    width: 360px;
    height: 40px;
    cursor: grab;
    :hover {
      opacity: 0.9;
    }
    > .kakaoImg {
      position: absolute;
      top: 67.1%;
      left: 38.8%;
      width: 14px;
      height: 20px;
    }
  }
`;

const LoginModal = ({
  visible,
  setVisible,
  handleLoginTrue,
  isLogin,
  handleUserInfo,
  handleJwtToken,
  handleKakaoToken,
}) => {
  //const [isOpen, setIsOpen] = useState(false);
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const handleLogin = () => {
    const { email, password } = loginInfo;
    axios({
      method: "POST",
      url: "http://ec2-3-36-51-146.ap-northeast-2.compute.amazonaws.com/user/signin",
      data: { email, password },
    })
<<<<<<< HEAD
      .then((res) => {
        console.log(res);
        if (res.message) {
          handleLoginTrue();
          setLoginInfo({ ...loginInfo, password: "" });
          handleUserInfo(res.data);
=======
      .then(res => {
        if (res.data.message) {
          handleLoginTrue();
          setLoginInfo({ ...loginInfo, password: "" });
          handleUserInfo(res.data.data);
          handleJwtToken(res.data.token);
          setVisible(false);
>>>>>>> 0a40e1ee4316bca77841acc5862573b4fafbae01
        }
      })
      .catch((err) => {
        console.log("login err", err);
      });
  };
  const handleSocialLogin = () => {
    window.location.assign(
      "https://kauth.kakao.com/oauth/authorize?client_id=ce4c941a6f16b0b73737edf331c2adaf&redirect_uri=http://localhost:3000&response_type=code"
    );
  };
  const loginInfoHandler = (key) => (e) => {
    setLoginInfo({ ...loginInfo, [key]: e.target.value });
  };
  return (
    <Container visible={visible}>
      <ModalContainer>
        <div className="exit" onClick={() => setVisible(false)}>
          X
        </div>
        <span>오하운에 오신 것을 환영합니다.</span>
        <input
          className="input"
          type="email"
          value={loginInfo.email}
          onChange={loginInfoHandler("email")}
          placeholder="Email"
        />

        <input
          className="input"
          type="password"
          value={loginInfo.password}
          placeholder="Password"
          onChange={loginInfoHandler("password")}
        />
        <ModalBtn onClick={handleLogin}>로그인</ModalBtn>
        <BorderBottom />
        <SocialLogin>
          <button className="socialBtn" onClick={handleSocialLogin}>
            <img className="kakaoImg" src={kakao} alt="카카오 로고" />
            카카오로 로그인하기
          </button>
        </SocialLogin>
      </ModalContainer>
    </Container>
  );
};

export default LoginModal;
