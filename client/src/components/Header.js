import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { ReactComponent as UserSvg } from "../svgs/user-solid.svg";
import Modal from "./Modal";
import LoginModal from "./LoginModal";

const HeaderContainer = styled.div`
  display: flex;
  width: 100%;
  text-align: center;
  margin: 0px auto;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  background-color: rgba(255, 255, 255, 0.6);
  z-index: 1000;
`;

const Logo = styled.img`
  width: 10em;
  padding-right: 10px;
`;

const NavigationContainer = styled.nav`
  flex: 1;
  text-align: right;
  float: right;
  position: relative;
  top: 10px;
`;

const UserIcon = styled(UserSvg)`
  flex: 1;
  padding: 2px 10px;
  border: 0;
  outline: 0;
  :hover {
    color: darkblue;
    cursor: pointer;
  }
  width: 40px;
`;

const WelcomeUser = styled.div`
  align-items: center;
  vertical-align: middle;
  padding-left: 10px;
  margin-top: 1.75rem;
  text-align: left;
  font-family: system-ui;
  flex: 1;
  font-size: 15px;
`;

const Header = ({
  isLogin,
  handleLogout,
  handleLoginTrue,
  handleUserInfo,
  handleJwtToken,
  token,
  userData,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [loginModalVisible, setLoginModalVisible] = useState(false);

  const loginClicked = () => {
    setModalOpen(false);
    setLoginModalVisible(true);
  };

  return (
    <>
      <HeaderContainer>
        {userData.user_nickname ? (
          <WelcomeUser>어서오세요 {userData.user_nickname}님</WelcomeUser>
        ) : (
          <WelcomeUser>오늘 하루 운동 어떠세요?</WelcomeUser>
        )}
        <Link to="/">
          <Logo src={"/logo.png"} onClick={() => setModalOpen(false)} />
        </Link>
        <NavigationContainer>
          <UserIcon onClick={() => setModalOpen(!modalOpen)} />
        </NavigationContainer>
      </HeaderContainer>
      <Modal
        handleLogout={handleLogout}
        isLogin={isLogin}
        visible={modalOpen}
        setVisible={setModalOpen}
        loginFunc={loginClicked}
        token={token}
      />
      <LoginModal
        visible={loginModalVisible}
        setVisible={setLoginModalVisible}
        handleLoginTrue={handleLoginTrue}
        handleUserInfo={handleUserInfo}
        handleJwtToken={handleJwtToken}
      />
    </>
  );
};

export default Header;
