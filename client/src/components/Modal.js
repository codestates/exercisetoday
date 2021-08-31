import { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  position: relative;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  pointer-events: ${(props) => (props.visible ? "initial" : "none")};
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 999;
  position: fixed;
  width: 200px;
  height: 96px;
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2), 0 6px 6px rgba(0, 0, 0, 0.25);
  border-radius: 0.8rem;
  transition: all 0.8s ease;
  right: 30px;
`;

const ModalText = styled.div`
  text-align: center;
  font-size: 1.2rem;
  line-height: 3rem;
`;

const ModalLog = styled.div`
  width: 100%;
  border-radius: 0.8rem;
  cursor: grab;
  :hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const ModalSign = styled.div`
  width: 100%;
  border-radius: 0.8rem;
  cursor: grab;
  :hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const Modal = ({ visible, setVisible, loginFunc, isLogin, handleLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  //   const loginOpenHandler = () => {
  //     setIsOpen(!isOpen);
  //   };
  const logoutHandler = () => {
    handleLogout();
    setVisible(!visible);
  };
  return (
    <Container visible={visible}>
      <ModalContainer>
        {isLogin ? (
          <ModalLog onClick={logoutHandler}>
            <ModalText>Log Out</ModalText>
          </ModalLog>
        ) : (
          <ModalLog onClick={loginFunc}>
            <ModalText>Log In</ModalText>
          </ModalLog>
        )}
        <ModalSign>
          {isLogin ? (
            <Link
              to="/mypage"
              onClick={() => setVisible(false)}
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <ModalText>Mypage</ModalText>
            </Link>
          ) : (
            <Link
              to="signup"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <ModalText onClick={() => setVisible(false)}>Sign Up</ModalText>
            </Link>
          )}
        </ModalSign>
      </ModalContainer>
    </Container>
  );
};

export default Modal;
