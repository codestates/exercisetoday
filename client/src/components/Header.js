import React, { useState } from "react";
import styled from "styled-components";
import { ReactComponent as UserSvg } from "../svgs/user-solid.svg";
import { ReactComponent as Biking } from "../svgs/biking-solid.svg";
import Modal from "./Modal";
import LoginModal from "./LoginModal";

const HeaderContainer = styled.div`
  width: 100%;
  text-align: center;
  margin: 0px auto;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  background-color: rgba(255, 255, 255, 0.3);
  z-index: 1000;
`;

const Logo = styled.img`
  width: 10em;
  padding-left: 40px;
`;

const NavigationContainer = styled.nav`
  float: right;
  position: relative;
  top: 10px;
`;

const UserIcon = styled(UserSvg)`
  padding: 2px 10px;
  border: 0;
  outline: 0;
  :hover {
    color: darkblue;
    cursor: pointer;
  }
  width: 40px;
`;

const BikingIcon = styled(Biking)`
  border: 0;
  outline: 0;
  :hover {
    color: darkblue;
    cursor: pointer;
  }
  width: 60px;
`;
const Header = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const [loginOpen, setLogin] = useState(false);
  const loginModal = () => {
    setLogin(!loginOpen);
  };

  const loginClicked = () => {
    setModalOpen(false);
    setLoginModalVisible(true);
  };

  return (
    <>
      <HeaderContainer>
        <Logo src={"/logo.png"} />
        <NavigationContainer>
          <BikingIcon />
          <UserIcon onClick={() => setModalOpen(!modalOpen)} />
        </NavigationContainer>
      </HeaderContainer>
      <Modal
        visible={modalOpen}
        setVisible={setModalOpen}
        loginFunc={loginClicked}
      />
      <LoginModal
        visible={loginModalVisible}
        setVisible={setLoginModalVisible}
        loginModal={loginModal}
      />
    </>
  );
};

export default Header;
