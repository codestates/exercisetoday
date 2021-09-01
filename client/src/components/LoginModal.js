import { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import kakao from "./image/kakao.png";

const ModalContainer = styled.div`
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  display: ${props => (props.visible ? "auto" : "none")};
  pointer-events: ${props => (props.visible ? "initial" : "none")};
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 9999;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 35rem;
  height: 18rem;
  padding-top: 70px;
  background-color: rgba(255, 255, 255, 0.95);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2), 0 6px 6px rgba(0, 0, 0, 0.25);
  border-radius: 0.8rem;
  transition: all 0.2s ease;
`;

const CloseModal = styled.div`
  font-size: 30px;
  color: rgba(0, 0, 0, 0.6);
  margin: 9px 0 0 31rem;
  position: absolute;
  border-radius: 50%;
  top: 0;
  cursor: pointer;
  :hover {
    opacity: 0.7;
  }
`;

const InputBox = styled.input`
  margin-top: 18px;
  width: 355px;
  height: 32px;
`;

const LoginTitle = styled.div`
  position: absolute;
  top: 7%;
  color: #003150;
  margin: 10px 0px 50px 0px;
`;

const LoginBtn = styled.button`
  margin-top: 20px;
  background-color: #003150;
  text-decoration: none;
  border: none;
  width: 360px;
  height: 40px;
  color: white;
  cursor: pointer;
  :hover {
    opacity: 0.9;
  }
`;

const BorderBottom = styled.div`
  display: flex;
  flex-basis: 100%;
  align-items: center;
  color: rgba(0, 0, 0, 0.35);
  font-size: 12px;
  position: absolute;
  margin-top: 32.5%;
  width: 69.5%;
  ::before,
  ::after {
    content: "";
    flex-grow: 1;
    background: rgba(0, 0, 0, 0.35);
    height: 1px;
    font-size: 0px;
    line-height: 0px;
    margin: 0px 16px;
  }
`;

const SocialLoginBtn = styled.div`
  display: flex;
  flex-direction: column;
  > .socialBtn {
    background-color: rgb(255, 232, 18);
    border: none;
    margin-top: 43px;
    width: 360px;
    height: 40px;
    cursor: pointer;
    :hover {
      opacity: 0.9;
    }
    > .kakaoImg {
      position: absolute;
      top: 81%;
      left: 37.3%;
      width: 14px;
      height: 20px;
    }
  }
`;

const LoginModal = ({
  visible,
  setVisible,
  handleLoginTrue,
  handleUserInfo,
  handleJwtToken,
}) => {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const handleLogin = () => {
    const { email, password } = loginInfo;
    axios({
      method: "POST",
      url: "http://ec2-3-36-51-146.ap-northeast-2.compute.amazonaws.com/user/signin",
      data: { user_email: email, user_password: password },
    })
      .then(res => {
        if (res.data.data) {
          handleLoginTrue();
          setLoginInfo({ ...loginInfo, password: "" });
          handleUserInfo(res.data.data);
          handleJwtToken(res.data.token);
          setVisible(false);
        }
      })
      .catch(err => {
        console.log("login err", err);
      });
  };
  const handleSocialLogin = () => {
    window.location.assign(
      "https://kauth.kakao.com/oauth/authorize?client_id=ce4c941a6f16b0b73737edf331c2adaf&redirect_uri=http://localhost:3000&response_type=code"
    );
  };
  const loginInfoHandler = key => e => {
    setLoginInfo({ ...loginInfo, [key]: e.target.value });
  };
  return (
    <ModalContainer visible={visible}>
      <ModalContent>
        <CloseModal onClick={() => setVisible(false)}>&times;</CloseModal>
        <LoginTitle>오하운에 오신 것을 환영합니다.</LoginTitle>
        <InputBox
          className="input"
          type="email"
          value={loginInfo.email}
          onChange={loginInfoHandler("email")}
          placeholder="Email"
        />
        <InputBox
          className="input"
          type="password"
          value={loginInfo.password}
          placeholder="Password"
          onChange={loginInfoHandler("password")}
        />
        <LoginBtn onClick={handleLogin}>로그인</LoginBtn>
        <BorderBottom> 또는</BorderBottom>
        <SocialLoginBtn>
          <button className="socialBtn" onClick={handleSocialLogin}>
            <img className="kakaoImg" src={kakao} alt="카카오 로고" />
            카카오로 로그인하기
          </button>
        </SocialLoginBtn>
      </ModalContent>
    </ModalContainer>
  );
};

export default LoginModal;
