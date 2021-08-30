import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import MainPage from "./components/MainPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Mypage from "./components/mypage/Mypage";
import SignUpPage from "./components/SignUpPage";
import ChallengePage from "./components/ChallengePage";

function App() {
  const [isLogin, setIsLogin] = useState(false); // URI로 페이지를 움직일수있다.
  const handleLogout = () => {
    setIsLogin(false);
  };
  return (
    <BrowserRouter>
      <div className="App">
        <Header isLogin={isLogin} handleLogout={handleLogout} />
        <Switch>
          <Route exact path="/">
            <MainPage isLogin={isLogin} />
          </Route>
          <Route path="/signup">
            <SignUpPage />
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
    </BrowserRouter>
  );
}

export default App;
