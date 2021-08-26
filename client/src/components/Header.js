import React from "react";
import styled from "styled-components";
import { ReactComponent as UserSvg } from "../svgs/user-solid.svg";
import { ReactComponent as Biking } from "../svgs/biking-solid.svg";

const Header = () => {
  const HeaderContainer = styled.div`
    width: 100%;
    display: block;
    text-align: center;
    margin: 0px auto;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 80px;
    background-color: beige;
    justify-content: space-between;
    z-index: 1000;
  `;

  const Logo = styled.img`
    width: 12em;
    padding-left: 14rem;
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

  return (
    <>
      <HeaderContainer>
        <Logo src={"/logo.png"} />
        <NavigationContainer>
          <BikingIcon />
          <UserIcon />
        </NavigationContainer>
      </HeaderContainer>
    </>
  );
};

export default Header;
