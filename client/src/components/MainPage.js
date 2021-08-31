import MainIntro from "./MainIntro";
import Challenge from "./Challenge";

const MainPage = ({ isLogin, handleChallengeInfo, userData }) => {
  return (
    <>
      <MainIntro />
      <Challenge
        isLogin={isLogin}
        handleChallengeInfo={handleChallengeInfo}
        userData={userData}
      />
    </>
  );
};

export default MainPage;
