import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { ReactComponent as kakaotalk } from "../svgs/kakaotalk.svg";
import { useHistory } from "react-router-dom";

const Main = styled.main`
  box-sizing: border-box;
  font-family: Dotum, "돋움", Helvetica, sans-serif;
  font-size: 12px;
  margin-top: 5rem;
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
  margin: 30px;
`;

const LabelText = styled.h2`
  text-align: left;
`;

const InputBox = styled.input`
  width: 100%;
  height: 50px;
  padding: 0 2px;
  margin: 10px 0;
  font-size: 20px;
  font-family: Georgia;
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
  }
`;

const GenderSelect = styled.select`
  padding: 0 10px;
  width: 100%;
  height: 50px;
  margin: 5px 3.5px;
  font-size: 20px;
  font-family: Georgia;
`;

const SignUpButton = styled.button`
  width: 40%;
  height: 40px;
  font-size: 20px;
  font-family: "Lucida" Grande, sans-serif;
  text-align: center;
  border-radius: 10px;
  :hover {
    background: rgba(104, 177, 237, 0.5);
    cursor: pointer;
  }
`;

const ErrMessage = styled.div`
  color: white;
  vertical-align: middle;
  font-weight: bold;
  height: 43px;
  font-family: system-ui;
  font-size: 26px;
  background: red;
  margin: 10px 0;
`;

const SocialLoginButton = styled.button`
  width: 55%;
  margin: 10px 30px;
  font-size: 25px;
  border-radius: 10px;
  background: rgba(255, 220, 3, 1);
  :hover {
    cursor: pointer;
    background: rgba(235, 200, 3, 1);
  }
`;

const KakaoIcon = styled(kakaotalk)`
  width: 30px;
`;

const SignUpPage = () => {
  const history = useHistory();

  const [userInfo, setUserInfo] = useState({
    user_email: "",
    user_password: "",
    user_passwordCheck: "",
    user_name: "",
    nick_name: "",
    user_gender: "성별",
    user_mobile: "",
  });

  const [errMessage, setErrMessage] = useState("");

  const handleInputValue = (key) => (e) => {
    setUserInfo({ ...userInfo, [key]: e.target.value });
  };

  const handleSignUp = () => {
    const {
      user_email,
      user_password,
      user_passwordCheck,
      user_name,
      user_nickname,
      user_gender,
      user_mobile,
    } = userInfo;

    if (user_password !== user_passwordCheck) {
      setErrMessage("비밀번호가 일치하지 않습니다");
      return;
    }

    if (user_gender === "성별") {
      setErrMessage("성별을 선택해 주세요");
      return;
    }

    if (
      !user_email ||
      !user_password ||
      !user_passwordCheck ||
      !user_name ||
      !user_nickname ||
      !user_gender ||
      !user_mobile
    ) {
      setErrMessage("모든 항목을 기입해 주세요");
      return;
    }

    setErrMessage("");

    axios({
      method: "POST",
      url: "http://ec2-3-36-51-146.ap-northeast-2.compute.amazonaws.com/user/signup",
      data: {
        user_id: null,
        user_email,
        user_password,
        user_name,
        user_nickname,
        user_gender,
        user_mobile,
      },
    })
      .then((res) => {
        if (res.data.message === "ok") {
          setUserInfo(null);
          history.push("/");
          return;
        } else if (res.data.message) {
          setErrMessage(res.data.message);
        }
      })
      .catch((err) => console.log("signup err", err));
  };

  const handleSocialLogin = () => {
    window.location.assign(
      "https://kauth.kakao.com/oauth/authorize?client_id=ce4c941a6f16b0b73737edf331c2adaf&redirect_uri=http://localhost:3000&response_type=code "
    );
  };

  return (
    <>
      <Main>
        <Article>
          <Slogan>건강하고 즐거운 일상 속 운동 라이프 디자이너</Slogan>
          <Section>
            <LabelText>소셜 로그인</LabelText>
            <SocialLoginButton onClick={handleSocialLogin}>
              카카오로 3초만에 시작하기
              <KakaoIcon />
            </SocialLoginButton>
          </Section>
          <Slogan>모든 항목은 필수 입니다.</Slogan>
          <form onSubmit={(e) => e.preventDefault()}>
            <Section>
              <LabelText>이메일</LabelText>
              <InputBox
                type="email"
                placeholder="email을 입력하세요"
                onChange={handleInputValue("user_email")}
              />
            </Section>
            <Section>
              <LabelText>비밀번호</LabelText>
              <InputBox
                placeholder="비밀번호"
                type="password"
                onChange={handleInputValue("user_password")}
              />
              <LabelText>비밀번호 확인</LabelText>
              <InputBox
                placeholder="비밀번호 확인"
                type="password"
                onChange={handleInputValue("user_passwordCheck")}
              />
            </Section>
            <Section>
              <LabelText>이름</LabelText>
              <InputBox
                placeholder="이름을 입력하세요"
                onChange={handleInputValue("user_name")}
              />
            </Section>
            <Section>
              <LabelText>닉네임</LabelText>
              <InputBox
                placeholder="닉네임을 입력하세요"
                onChange={handleInputValue("user_nickname")}
              />
            </Section>
            <Section>
              <LabelText>성별 선택</LabelText>
              <GenderSelect onChange={handleInputValue("user_gender")}>
                <option>성별</option>
                <option>남</option>
                <option>여</option>
              </GenderSelect>
            </Section>
            <Section>
              <LabelText onChange={handleInputValue("user_mobile")}>
                휴대폰 번호 (숫자만 입력하세오)
              </LabelText>
              <InputBox
                placeholder="' - ' 제외 숫자만 입력하세요"
                type="number"
                onChange={handleInputValue("user_mobile")}
              />
            </Section>
            {errMessage ? <ErrMessage>{errMessage}</ErrMessage> : null}
            <Section>
              <SignUpButton type="submit" onClick={handleSignUp}>
                가입하기
              </SignUpButton>
            </Section>
          </form>
        </Article>
      </Main>
    </>
  );
};

export default SignUpPage;
