import React, { useState } from "react";
import styled from "styled-components";
import SocialLogin from "./SignUpComponent/SocialLogIn";

const Main = styled.main`
  font-family: Dotum, "돋움", Helvetica, sans-serif;
  font-size: 12px;
  margin-top: 11vh;
  height: 100%;
  width: 100%;
  text-align: center;
`;

const Article = styled.article`
  width: 40%;
  margin: 0px auto;
`;

const Slogan = styled.div`
  color: #002744;
  font-size: 23px;
`;

const Section = styled.section`
  margin: 20px;
`;

const LabelText = styled.h2`
  text-align: left;
`;

const InputBox = styled.input`
  padding: 0 10px;
  width: 100%;
  height: 50px;
  margin: 5px 0;
  font-size: 20px;
  font-family: Georgia;
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const GenderSelect = styled.select`
  padding: 0 10px;
  width: 103.3%;
  height: 50px;
  margin: 5px 0;
  font-size: 20px;
  font-family: Georgia;
`;

const SignUpButton = styled.button`
  width: 103.3%;
  height: 40px;
  font-size: 20px;
  font-family: "Lucida" Grande, sans-serif;
  text-align: center;
  border-radius: 10px;
  background: white;
`;

const ErrMessage = styled.div`
  width: 103.3%;
  color: white;
  font-family: system-ui;
  font-size: 20px;
  background: red;
  margin: 10px 0;
`;

const SignUpPage = () => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    passwordCheck: "",
    full_name: "",
    nick_name: "",
    gender: "",
    mobile: "",
  });

  const [errMessage, setErrMessage] = useState("");

  const handleInputValue = key => e => {
    setUserInfo({ ...userInfo, [key]: e.target.value });
  };

  const handleSignUp = () => {
    const {
      email,
      password,
      passwordCheck,
      full_name,
      nick_name,
      gender,
      mobile,
    } = userInfo;

    if (password !== passwordCheck) {
      setErrMessage("비밀번호와 비밀번호 확인이 일치하지 않습니다");
      return;
    }

    if (
      !email ||
      !password ||
      passwordCheck ||
      !full_name ||
      !nick_name ||
      !gender ||
      !mobile
    ) {
      setErrMessage("모든 항목을 기입해 주세요");
      return;
    }
  };

  return (
    <>
      <Main>
        <Article>
          <Slogan>건강하고 즐거운 일상 속 운동 라이프 디자이너</Slogan>
          <Section>
            <LabelText>소셜 로그인</LabelText>
            <SocialLogin />
          </Section>
          <Slogan>모든 항목은 필수 입니다.</Slogan>
          <form onSubmit={e => e.preventDefault()}>
            <Section>
              <LabelText>이메일</LabelText>
              <InputBox
                type="email"
                placeholder="email을 입력하세요"
                onChange={handleInputValue("email")}
              />
            </Section>
            <Section>
              <LabelText>비밀번호</LabelText>
              <InputBox
                placeholder="비밀번호"
                type="password"
                onChange={handleInputValue("password")}
              />
              <LabelText>비밀번호 확인</LabelText>
              <InputBox
                placeholder="비밀번호 확인"
                type="password"
                onChange={handleInputValue("passwordCheck")}
              />
            </Section>
            <Section>
              <LabelText>이름</LabelText>
              <InputBox
                placeholder="이름을 입력하세요"
                onChange={handleInputValue("full_name")}
              />
            </Section>
            <Section>
              <LabelText>닉네임</LabelText>
              <InputBox
                placeholder="닉네임을 입력하세요"
                onChange={handleInputValue("nick_name")}
              />
            </Section>
            <Section>
              <LabelText>성별</LabelText>
              <GenderSelect onChange={handleInputValue("gender")}>
                <option>선택안함</option>
                <option>남</option>
                <option>여</option>
              </GenderSelect>
            </Section>
            <Section>
              <LabelText onChange={handleInputValue("mobile")}>
                휴대폰 번호 (숫자만 입력하세오)
              </LabelText>
              <InputBox
                placeholder="'-' 제외 숫자만 입력하세요"
                type="number"
                onChange={handleInputValue("mobile")}
              />
            </Section>
            <Section>
              <SignUpButton type="submit" onClick={handleSignUp}>
                가입하기
              </SignUpButton>
              {errMessage ? <ErrMessage>{errMessage}</ErrMessage> : null}
            </Section>
          </form>
        </Article>
      </Main>
    </>
  );
};

export default SignUpPage;
