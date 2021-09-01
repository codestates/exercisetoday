import React, { useState, useEffect } from "react";
import "./App.css";
import { Route, Switch, useHistory } from "react-router-dom";
import axios from "axios";
import MainPage from "./components/MainPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Mypage from "./components/mypage/Mypage";
import SignUpPage from "./components/SignUpPage";
import ChallengePage from "./components/ChallengePage";
import useLocalStorage from "./UseLocalStorage";

function App() {
  const userInfoReset = {
    user_id: null,
    user_kakaoId: null,
    user_email: null,
    user_name: null,
    user_nickname: null,
    user_exp: null,
    user_photo: null,
    created_at: null,
    updated_at: null,
  };
  const [isLogin, setIsLogin] = useLocalStorage("isLogin", false);
  const [token, setToken] = useLocalStorage("token", null);
  const [userData, setUserData] = useLocalStorage("userData", userInfoReset);
  const [challengeInfo, setChallengeInfo] = useState({
    progress_id: null,
    user_id: null,
    challenge_id: null,
    challenge_name: null,
    challenge_desc: null,
    progress_rate: null,
    progress_buttons: null,
    progress_likes: null,
    created_at: null,
    updated_at: null,
  });
  const history = useHistory();
  const handleLogout = () => {
    axios({
      method: "POST",
      url: "http://ec2-3-36-51-146.ap-northeast-2.compute.amazonaws.com/user/signout",
      headers: { authorization: token },
    })
      .then(res => {
        if (res.data.message) {
          setIsLogin(false);
          history.push("/");
          setUserData(userInfoReset);
          setToken(null);
          localStorage.clear();
        }
      })
      .catch(err => console.log("logout err", err));
  };

  const handleJwtToken = token => {
    setToken(`jwt ${token}`);
  };

  const handleKakaoToken = token => {
    setToken(`kakao ${token}`);
  };

  const handleUserInfo = data => {
    setUserData({ ...userData, ...data });
  };

  const deleteUserInfo = () => {
    setUserData(userInfoReset);
    setIsLogin(false);
    setToken(null);
  };

  const handleLoginTrue = () => {
    setIsLogin(true);
  };

  const handleChallengeInfo = data => {
    setChallengeInfo({ ...challengeInfo, ...data });
  };

  const componentDidMount = async () => {
    const url = new URL(window.location.href);
    const authorizationCode = url.searchParams.get("code");
    if (authorizationCode) {
      await axios({
        method: "POST",
        url: "http://ec2-3-36-51-146.ap-northeast-2.compute.amazonaws.com/user/kakao",
        data: { authorizationCode },
      })
        .then(res => {
          handleKakaoToken(res.data.token);
          const { user_email, user_exp, user_id, user_kakaoId, user_nickname } =
            res.data.data;
          setUserData({
            ...userData,
            user_email,
            user_exp,
            user_id,
            user_kakaoId,
            user_nickname,
          });
          handleLoginTrue();
        })
        .catch(err => console.log("social login err", err));
    }
  };

  useEffect(() => {
    componentDidMount();
    axios({
      method: "GET",
      url: "http://ec2-3-36-51-146.ap-northeast-2.compute.amazonaws.com/auth",
      headers: { authorization: token },
    }).then(res => {
      console.log(res.data);
      if (res.data.message === "ok") {
        setUserData({ ...userData, ...res.data.data });
        handleLoginTrue();
      }
      console.log(token);
    });
  }, []);

  return (
    <div className="App">
      <Header
        isLogin={isLogin}
        handleLogout={handleLogout}
        handleLoginTrue={handleLoginTrue}
        handleUserInfo={handleUserInfo}
        handleJwtToken={handleJwtToken}
        token={token}
        userData={userData}
      />
      <Switch>
        <Route exact path="/">
          <MainPage
            isLogin={isLogin}
            userData={userData}
            handleChallengeInfo={handleChallengeInfo}
          />
        </Route>
        <Route path="/signup">
          <SignUpPage handleLoginTrue={handleLoginTrue} />
        </Route>
        {isLogin ? (
          <>
            <Route path="/challenge">
              <ChallengePage challengeInfo={challengeInfo} token={token} />
            </Route>
            <Route path="/mypage">
              <Mypage
                userData={userData}
                deleteUserInfo={deleteUserInfo}
                token={token}
              />
            </Route>
          </>
        ) : null}
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
