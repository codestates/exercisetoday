import styled from "styled-components";
import { useState } from "react";

const CompletedChallTitle = styled.div`
  margin-left: 100px;
  width: 100%;
  color: rgba(0, 49, 80, 0.3);
  font-size: 4.3rem;
`;
const CompletedListTitle = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  color: rgba(0, 0, 0, 0.5);
  margin-top: 3rem;
  font-size: 1.5rem;
  width: 30%;
  height: 10vh;
  border-bottom: 1px solid;
  border-color: rgba(0, 49, 80, 0.3);
  transition: all 0.3s ease;
  :hover {
    color: rgba(0, 0, 0, 0.9);
  }
`;
const ListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const NoDataText = styled.div`
  margin-top: 1rem;
  height: 15rem;
  font-size: 2rem;
  color: rgba(0, 0, 0, 0.6);
  text-align: center;
`;

const CompletedChall = ({ completedList }) => {
  const [challList, setChallList] = useState(completedList);
  //key는 challenge_id로
  const list = [
    "30일 바른 자세를 위한 플랭크 챌린지",
    "한강크로스스위밍챌린지",
    "헌드레드 스쿼트 챌린지",
  ];
  return (
    <>
      <ListContainer>
        <CompletedChallTitle>완료한 챌린지</CompletedChallTitle>
        {challList !== null ? (
          challList.map((el) => {
            return (
              <CompletedListTitle key={el.challenge_id}>
                {el.challenge_name}
              </CompletedListTitle>
            );
          })
        ) : (
          <NoDataText>{"완료한 챌린지가 없습니다.."}</NoDataText>
        )}
      </ListContainer>
    </>
  );
};
export default CompletedChall;
