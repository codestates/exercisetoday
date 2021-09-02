import MainIntro from "./MainIntro";
import Challenge from "./Challenge";

const MainPage = ({
  isLogin,
  handleChallengeInfo,
  userData,
  handleResetChallengeInfo,
}) => {
  return (
    <>
      <MainIntro />
      <Challenge
        isLogin={isLogin}
        handleChallengeInfo={handleChallengeInfo}
        userData={userData}
        handleResetChallengeInfo={handleResetChallengeInfo}
      />
    </>
  );
};

export default MainPage;
