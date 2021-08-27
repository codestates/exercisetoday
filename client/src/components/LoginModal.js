import { useState } from "react";
import styled from "styled-components";

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
  width: 50rem;
  height: 23rem;
  padding-top: 60px;
  background-color: rgba(255, 255, 255, 0.95);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2), 0 6px 6px rgba(0, 0, 0, 0.25);
  border-radius: 0.8rem;
  transition: all 0.2s ease;
  > .input {
    margin-top: 10px;
    width: 50%;
    height: 3vh;
  }
  > .exit {
    font-size: 25px;
    color: rgba(0, 0, 0, 0.6);
    margin-top: 10px;
    position: absolute;
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
  padding: 20px;
  color: white;
  border-radius: 30px;
  cursor: grab;
  width: 30%;
`;

// const ModalText = styled.div`
//   text-align: center;
//   font-size: 1.2rem;
//   line-height: 3rem;
// `;
// const ModalLogin = styled.div`
//   width: 100%;
//   border-radius: 0.8rem;
//   cursor: grab;
//   :hover {
//     background-color: rgba(0, 0, 0, 0.1);
//   }
// `;

const SocialLogin = styled.div`
  display: flex;
  flex-direction: column;
  > .socialBtn {
    margin-top: 20px;
    width: 400px;
    height: 40px;
    cursor: grab;
    :hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
  }
`;

const LoginModal = ({ visible, setVisible }) => {
  //const [isOpen, setIsOpen] = useState(false);
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

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
        <ModalBtn>로그인</ModalBtn>
        <SocialLogin>
          <button className="socialBtn">구글로 로그인하기</button>
          <button className="socialBtn">페이스북으로 로그인하기</button>
        </SocialLogin>
      </ModalContainer>
    </Container>
  );
};

export default LoginModal;
