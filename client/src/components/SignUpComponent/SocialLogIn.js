import React, { useState } from "react";
import styled from "styled-components";

const SocialLoginButton = styled.button`
  width: 40%;
  margin: 10px 30px;
  font-size: 20px;
`;

const LoginWithGoogle = styled(SocialLoginButton)`
  color: white;
  border-radius: 50px;
  background: #322e3f;
`;

const LoginWithNaver = styled(SocialLoginButton)`
  color: white;
  border-radius: 50px;
  background: #155218;
`;

const SocialLogIn = () => {
  return (
    <>
      <LoginWithGoogle>GOOGLE로 회원가입</LoginWithGoogle>
      <LoginWithNaver>NAVER로 회원가입</LoginWithNaver>
    </>
  );
};

export default SocialLogIn;
