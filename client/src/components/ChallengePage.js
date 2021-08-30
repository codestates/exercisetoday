import React, { useState } from "react";
import styled from "styled-components";
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
  const [join, setJoin] = useState(true);

  const handleJoin = () => {
    setJoin(!join);
  };

  return (
    <>
      <Main>
        <Article>
          <ChallengeButtons join={join} handleJoin={handleJoin} />
        </Article>
        <Article>
          <ChallengeComment />
        </Article>
      </Main>
    </>
  );
};

export default ChallengePage;
