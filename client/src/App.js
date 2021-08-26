import React from "react";
import "./App.css";
import MainPage from "./components/MainPage";
import Header from "./components/Header";
function App() {
  return (
    <div className="App">
      <Header />
      <MainPage></MainPage>
    </div>
  );
}

export default App;
