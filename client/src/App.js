import React from "react";
import "./App.css";
import Main from "./components/Main";
import Challenge from "./components/Challenge";
import Header from "./components/Header";
function App() {
  return (
    <div className="App">
      <Header />
      <Main></Main>
      <Challenge></Challenge>
    </div>
  );
}

export default App;
