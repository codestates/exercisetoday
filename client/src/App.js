import React from "react";
import "./App.css";
import MainPage from "./components/MainPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
function App() {
  return (
    <div className="App">
      <Header />
      <MainPage></MainPage>
      <Footer />
    </div>
  );
}

export default App;
