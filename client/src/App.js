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
  const [isLogin, setIsLogin] = useState(true); // URI로 페이지를 움직일수있다.
  const history = useHistory();
  const handleLogout = () => {
    axios({
      method: "post",
      url: "http://ec2-3-36-51-146.ap-northeast-2.compute.amazonaws.com/user/signout",
    })
      .then((res) => {
        if (res.message) {
          setIsLogin(false);
          history.push("/");
        }
      })
      .catch((err) => console.log("logout err", err));
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
      }).then((resp) => console.log(resp.data.data));
      handleLoginTrue();
    }
  };

  return (
    <div className="App">
      <Header
        isLogin={isLogin}
        handleLogout={handleLogout}
        handleLoginTrue={handleLoginTrue}
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
              <Mypage />
            </Route>
          </>
        ) : null}
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
