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

function App() {
  const [isLogin, setIsLogin] = useState(false); // URI로 페이지를 움직일수있다.
  const [userData, setUserData] = useState({
    user_id: null,
    user_kakaoId: null,
    user_email: null,
    user_name: null,
    user_nickname: null,
    user_exp: null,
    user_photo: null,
    created_at: null,
    updated_at: null,
  });
  const history = useHistory();
  const handleLogout = () => {
    axios({
      method: "post",
      url: "http://ec2-3-36-51-146.ap-northeast-2.compute.amazonaws.com/user/signout",
    })
      .then(res => {
        if (res.message) {
          setIsLogin(false);
          history.push("/");
        }
      })
      .catch(err => console.log("logout err", err));
  };

  const handleUserInfo = (data) => {
    setUserData({ ...userData, ...data });
  };

  const deleteUserInfo = () => {
    setUserData({
      user_id: null,
      user_kakaoId: null,
      user_email: null,
      user_name: null,
      user_nickname: null,
      user_exp: null,
      user_photo: null,
      created_at: null,
      updated_at: null,
    });
  };

  const handleLoginTrue = () => {
    setIsLogin(true);
  };

  useEffect(() => {
    componentDidMount();
  }, []);

  const componentDidMount = async () => {
    const url = new URL(window.location.href);
    const authorizationCode = url.searchParams.get("code");
    if (authorizationCode) {
      await axios({
        method: "post",
        url: "http://ec2-3-36-51-146.ap-northeast-2.compute.amazonaws.com/user/kakao",
        data: { authorizationCode },
      })
        .then(resp => {
          const { user_email, user_exp, user_id, user_kakaoId, user_nickname } =
            resp.data.data;
          setUserData({
            ...userData,
            user_email,
            user_exp,
            user_id,
            user_kakaoId,
            user_nickname,
          });
        })
        .catch(err => console.log("social login err", err));
      handleLoginTrue();
    }
  };

  return (
    <div className="App">
      <Header
        isLogin={isLogin}
        handleLogout={handleLogout}
        handleLoginTrue={handleLoginTrue}
        handleUserInfo={handleUserInfo}
      />
      <Switch>
        <Route exact path="/">
          <MainPage isLogin={isLogin} />
        </Route>
        <Route path="/signup">
          <SignUpPage handleLoginTrue={handleLoginTrue} />
        </Route>
        {isLogin ? (
          <>
            <Route path="/challenge">
              <ChallengePage />
            </Route>
            <Route path="/mypage">
              <Mypage userData={userData} deleteUserInfo={deleteUserInfo} />
            </Route>
          </>
        ) : null}
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
