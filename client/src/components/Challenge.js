import { useState } from "react";
import styled from "styled-components";

import "./Challenge.css";
const Challenge = () => {
  const ChallengeContainer = styled.div`
    display: flex;
    align-items: center;
    margin-top: 5rem;
    border: 2px solid black;
    height: 50vh;
  `;

  return <ChallengeContainer></ChallengeContainer>;
};

export default Challenge;
