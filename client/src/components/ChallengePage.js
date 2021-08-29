import React, { useState } from "react";
import styled from "styled-components";
import ChallengeContent from "./ChallengeComponent/ChallengeContent";
import ChallengeButtons from "./ChallengeComponent/ChallengeButtons";
import ChallengeComment from "./ChallengeComponent/ChallengeComment";

const Main = styled.main`
  box-sizing: border-box;
  font-family: Dotum, "돋움", Helvetica, sans-serif;
  font-size: 12px;
  margin-top: 5rem;
  height: 100%;
  width: 100%;
`;

const Article = styled.article`
  width: 100%;
  margin: 2% 0;
`;

const ChallengePage = () => {
  const [join, setJoin] = useState("챌린지 도전 하기");
  const handleJoin = () => {
    if (join === "챌린지 도전 하기") {
      setJoin("챌린지 도전 취소");
    } else {
      setJoin("챌린지 도전 하기");
    }
  };

  return (
    <>
      <Main>
        <Article>
          <ChallengeContent join={join} handleJoin={handleJoin} />
        </Article>
        <Article>
          <ChallengeButtons join={join} />
        </Article>
        <Article>
          <ChallengeComment />
        </Article>
      </Main>
    </>
  );
};

export default ChallengePage;
