import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import MainPage from "./components/MainPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Mypage from "./components/mypage/Mypage";
import SignUpPage from "./components/SignUpPage";
import ChallengePage from "./components/ChallengePage";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/">
            <MainPage />
          </Route>
          <Route path="/signup">
            <SignUpPage />
          </Route>
          <Route path="/challenge">
            <ChallengePage />
          </Route>
          <Route path="/mypage">
            <Mypage />
          </Route>
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
