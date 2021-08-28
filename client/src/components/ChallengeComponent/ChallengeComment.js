import React, { useState } from "react";
import styled from "styled-components";
import { ReactComponent as Thumb } from "../../svgs/thumbs-up-regular.svg";

const CommentsContainer = styled.article`
  border: 1px solid;
  padding: 3px;
  background: #d0dafa;
`;

const SingleCommentContainer = styled.section`
  font-family: system-ui;
  display: flex;
  border: 1px solid;
  padding: 3px;
  cursor: default;
  font-size: 15px;
`;

const ChallengeOnGoing = styled.div`
  display: inline-block;
  margin-left: 0.5%;
  padding: 3px;
  height: 23px;
  font-weight: bold;
  text-align: center;
`;

const CommentNickName = styled.div`
  margin: 0 3px;
  padding: 3px;
  font-weight: bold;
  border-right-style: solid;
  border-left-style: solid;
`;

const Comment = styled.div`
  padding: 3px;
  font-weight: bold;
`;

const LikeButton = styled.button`
  margin-left: auto;
`;

const ThumbIcon = styled(Thumb)`
  border: 0;
  outline: 0;
  color: blue;
  :hover {
    color: darkblue;
    cursor: pointer;
  }
  width: 25px;
`;

const LikeCount = styled.div`
  font-weight: bold;
`;

// 댓글 쓰기
const UserCommentContainer = styled.div`
  border: 1px solid;
  height: 4rem;
  display: flex;
`;

const UserComment = styled.textarea`
  order: 1;
  flex: 95;
  padding: 0.5em;
  vertical-align: top;
  resize: none;
  font-weight: bold;
  ::placeholder {
    font-weight: bold;
  }
`;
const CommentSubmit = styled.button`
  order: 2;
  flex: 5;
  font-size: 15px;
`;

const ChallengeComment = () => {
  const [likeCount, setLikeCount] = useState("0");

  const clickLikeButton = () => {
    setLikeCount(Number(likeCount) + 1);
  };

  return (
    <>
      <CommentsContainer>
        <SingleCommentContainer>
          <ChallengeOnGoing>진행도: 50%</ChallengeOnGoing>
          <CommentNickName>
            김코딩<sup>LV. 5</sup>
          </CommentNickName>
          <Comment>안녕</Comment>
          <LikeButton>
            <ThumbIcon onClick={clickLikeButton} />
          </LikeButton>
          <LikeCount>좋아요:{likeCount}개</LikeCount>
        </SingleCommentContainer>
        <form onSubmit={e => e.preventDefault()}>
          <UserCommentContainer>
            <UserComment
              minLength="1"
              maxLength="80"
              placeholder="최대 80글자 까지 입력가능 / 공백 포함"
            ></UserComment>
            <CommentSubmit type="submit">등록</CommentSubmit>
          </UserCommentContainer>
        </form>
      </CommentsContainer>
    </>
  );
};

export default ChallengeComment;
