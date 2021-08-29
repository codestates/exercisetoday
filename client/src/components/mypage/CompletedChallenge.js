import styled from "styled-components";
import { useState } from "react";
const CompletedTitle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 2% 0% 1% 0%;
  font-size: 1.5rem;
  text-align: center;
  width: 100%;
`;

const CompletedListTitle = styled.div`
  text-align: center;
  color: rgba(0, 0, 0, 0.5);
  margin-top: 3rem;
  font-size: 1.2rem;
  width: 30%;
  height: 5rem;
  border-bottom: 1px solid black;
  cursor: grab;
  transition: all 0.3s ease;
  :hover {
    color: rgba(0, 0, 0, 0.9);
    width: 35%;
  }
`;
const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const CompletedChall = () => {
  const [challList, setChallList] = useState([
    "30분 데일리 러닝 챌린지",
    "위캔드 클라이밍 챌린지",
    "하드코어 홈트레이닝 챌린지",
    "자전거 출·퇴근 챌린지",
  ]);
  return (
    <>
      <CompletedTitle>완료된 챌린지</CompletedTitle>
      <ListContainer>
        {challList.map((el, i) => {
          return <CompletedListTitle key={i}>{el}</CompletedListTitle>;
        })}
      </ListContainer>
    </>
  );
};
export default CompletedChall;
