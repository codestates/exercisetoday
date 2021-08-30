import MainIntro from "./MainIntro";
import Challenge from "./Challenge";

const MainPage = ({ isLogin }) => {
  return (
    <>
      <MainIntro />
      <Challenge isLogin={isLogin} />
    </>
  );
};

export default MainPage;
